import { Dimensions } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

/**
 * Converts an image URI to a canvas element
 * @param {string} imageUri - URI of the image to convert
 * @returns {Promise<HTMLCanvasElement>} Promise resolving to canvas element
 */
export const convertToCanvas = async (imageUri: string): Promise<HTMLCanvasElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                resolve(canvas);
            } else {
                reject(new Error('Could not get 2D context'));
            }
        };
        img.onerror = reject;
        img.src = imageUri;
    });
};

/**
 * Applies adaptive binarization to an image
 * @param {ImageData} imageData - The image data to binarize
 * @param {number} [blockSize=15] - Size of the pixel neighborhood for threshold calculation
 * @param {number} [C=2] - Constant subtracted from the mean
 * @returns {ImageData} Binarized image data
 */
export const applyBinarization = (imageData, blockSize = 15, C = 2) => {
    const { width, height, data } = imageData;
    const output = new ImageData(width, height);
    const outputData = output.data;

    // Convert to grayscale first
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        outputData[i] = outputData[i + 1] = outputData[i + 2] = gray;
        outputData[i + 3] = 255; // alpha
    }

    // Adaptive thresholding
    const halfBlock = Math.floor(blockSize / 2);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let sum = 0;
            let count = 0;

            // Calculate mean in the neighborhood
            for (let dy = -halfBlock; dy <= halfBlock; dy++) {
                for (let dx = -halfBlock; dx <= halfBlock; dx++) {
                    const nx = x + dx;
                    const ny = y + dy;

                    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                        const idx = (ny * width + nx) * 4;
                        sum += outputData[idx];
                        count++;
                    }
                }
            }

            const mean = sum / count;
            const idx = (y * width + x) * 4;
            const pixelValue = outputData[idx];

            // Apply threshold
            outputData[idx] = outputData[idx + 1] = outputData[idx + 2] =
                (pixelValue > (mean - C)) ? 255 : 0;
        }
    }

    return output;
};

/**
 * Detects corners of the answer sheet grid using Harris corner detection
 * @param {ImageData} binaryImage - Binarized image data
 * @returns {Promise<{x: number, y: number}[]>} Array of detected corner points
 */
export const detectCorners = async (binaryImage: ImageData): Promise<{ x: number, y: number }[]> => {
    const { width, height, data } = binaryImage;

    // 1. Converter para tensor com tipo explícito
    const tensor = tf.tensor3d(new Uint8Array(data), [height, width, 4]) as tf.Tensor3D;

    // 2. Converter para escala de cinza
    const gray = tensor.slice([0, 0, 0], [height, width, 1]) as tf.Tensor3D;
    const grayReshaped = gray.reshape([1, height, width, 1]) as tf.Tensor4D;

    // 3. Definir kernels de Sobel com tipagem explícita
    const sobelKernel = tf.tensor2d([[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]]) as tf.Tensor2D;
    const kernelReshaped = sobelKernel.reshape([3, 3, 1, 1]) as tf.Tensor4D;
    const kernelTransposed = sobelKernel.transpose().reshape([3, 3, 1, 1]) as tf.Tensor4D;

    // 4. Aplicar convolução com tipagem explícita
    const Ix = tf.conv2d(
        grayReshaped as tf.Tensor4D,
        kernelReshaped as tf.Tensor4D,
        1,
        'same'
    ) as tf.Tensor4D;

    const Iy = tf.conv2d(
        grayReshaped as tf.Tensor4D,
        kernelTransposed as tf.Tensor4D,
        1,
        'same'
    ) as tf.Tensor4D;

    // 5. Operações elementares com tipagem
    const Ix2 = Ix.mul(Ix) as tf.Tensor4D;
    const Iy2 = Iy.mul(Iy) as tf.Tensor4D;
    const IxIy = Ix.mul(Iy) as tf.Tensor4D;

    // Gaussian blur
    const gaussKernel = tf.tensor2d([
        [1, 4, 7, 4, 1],
        [4, 16, 26, 16, 4],
        [7, 26, 41, 26, 7],
        [4, 16, 26, 16, 4],
        [1, 4, 7, 4, 1]
    ]).div(273);

    const gaussKernelReshaped = gaussKernel.reshape([5, 5, 1, 1]) as tf.Tensor4D;
    const Sx2 = tf.conv2d(Ix2 as tf.Tensor4D, gaussKernelReshaped, 1, 'same') as tf.Tensor4D;
    const Sy2 = tf.conv2d(Iy2 as tf.Tensor4D, gaussKernelReshaped, 1, 'same') as tf.Tensor4D;
    const Sxy = tf.conv2d(IxIy as tf.Tensor4D, gaussKernelReshaped, 1, 'same') as tf.Tensor4D;

    // Calculate corner response
    const k = 0.04;
    const det = Sx2.mul(Sy2).sub(Sxy.mul(Sxy));
    const trace = Sx2.add(Sy2);

    const kValue = tf.scalar(0.04); // ou usar 0.04 diretamente se não for tensor
    const R = det.sub(trace.mul(trace).mul(kValue)) as tf.Tensor4D;

    // Non-maximum suppression
    const maxTensor = R.max(); // Tensor com o valor máximo
    const maxArray = await maxTensor.array(); // Converter para array JavaScript
    const threshold = 0.01 * (maxArray as number); // Type assertion para número
    const corners = [];

    const RData = await R.data();

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const idx = y * width + x;
            const val = RData[idx];

            if (val > threshold) {
                // Check if it's a local maximum
                let isMax = true;
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        if (dx === 0 && dy === 0) continue;
                        const nIdx = (y + dy) * width + (x + dx);
                        if (RData[nIdx] > val) {
                            isMax = false;
                            break;
                        }
                    }
                    if (!isMax) break;
                }

                if (isMax) {
                    corners.push({ x, y, score: val });
                }
            }
        }
    }

    // Sort by score and take top 4
    corners.sort((a, b) => b.score - a.score);
    const topCorners = corners.slice(0, 4);

    // Order corners: top-left, top-right, bottom-right, bottom-left
    topCorners.sort((a, b) => a.x + a.y - (b.x + b.y)); // top-left has smallest x+y
    const tl = topCorners[0];
    const rest = topCorners.slice(1);
    rest.sort((a, b) => a.x - b.x); // sort remaining by x

    const orderedCorners = [tl, rest[0], rest[2], rest[1]];

    // Clean up tensors
    tf.dispose([tensor, gray, Ix, Iy, Ix2, Iy2, IxIy, Sx2, Sy2, Sxy, det, trace, R]);

    return orderedCorners.map(c => ({ x: c.x, y: c.y }));
};

/**
 * Extracts the grid region using perspective transform
 * @param {HTMLCanvasElement} image - Source image
 * @param {{x: number, y: number}[]} corners - Array of 4 corner points
 * @returns {HTMLCanvasElement} Canvas with the extracted grid
 */
export const extractGridRegion = (image: HTMLCanvasElement, corners: { x: number, y: number }[]) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Calculate width and height of the output grid
    const width = Math.max(
        Math.hypot(corners[1].x - corners[0].x, corners[1].y - corners[0].y),
        Math.hypot(corners[2].x - corners[3].x, corners[2].y - corners[3].y)
    );

    const height = Math.max(
        Math.hypot(corners[3].x - corners[0].x, corners[3].y - corners[0].y),
        Math.hypot(corners[2].x - corners[1].x, corners[2].y - corners[1].y)
    );

    canvas.width = width;
    canvas.height = height;

    // Perspective transform
    const srcTri = tf.tensor2d([
        [corners[0].x, corners[0].y],
        [corners[1].x, corners[1].y],
        [corners[3].x, corners[3].y],
        [corners[2].x, corners[2].y]
    ], [4, 2]) as tf.Tensor2D;

    const dstTri = tf.tensor2d([
        [0, 0],
        [width, 0],
        [0, height],
        [width, height]
    ], [4, 2]) as tf.Tensor2D;

    // Calculate homography matrix
    const A = [];
    for (let i = 0; i < 4; i++) {
        const x = srcTri.arraySync()[i][0];
        const y = srcTri.arraySync()[i][1];
        const u = dstTri.arraySync()[i][0];
        const v = dstTri.arraySync()[i][1];

        A.push([x, y, 1, 0, 0, 0, -u * x, -u * y, -u]);
        A.push([0, 0, 0, x, y, 1, -v * x, -v * y, -v]);
    }

    const A_tensor = tf.tensor2d(A, [8, 9]) as tf.Tensor2D;
    const [Q, R] = tf.linalg.qr(A_tensor); // Corrigido aqui
    const H = R.slice([0, 8], [8, 1]).reshape([8, 1]) as tf.Tensor2D;
    const h = tf.concat([H, tf.tensor1d([1])]).reshape([3, 3]) as tf.Tensor2D;

    // Apply transformation
    ctx.save();
    ctx.transform(
        h.arraySync()[0][0], h.arraySync()[1][0],
        h.arraySync()[0][1], h.arraySync()[1][1],
        h.arraySync()[0][2], h.arraySync()[1][2]
    );
    ctx.drawImage(image, 0, 0);
    ctx.restore();

    tf.dispose([srcTri, dstTri, A_tensor, Q, R, H, h]);

    return canvas;
};

/**
 * Calculates cell coordinates within the grid
 * @param {HTMLCanvasElement} gridRegion - The extracted grid region
 * @param {number} rows - Number of rows in the grid
 * @param {number} cols - Number of columns in the grid
 * @returns {{x: number, y: number, width: number, height: number}[][]} 2D array of cell coordinates
 */
export const calculateCellCoordinates = (gridRegion, rows, cols) => {
    const cellWidth = gridRegion.width / cols;
    const cellHeight = gridRegion.height / rows;

    const cells = [];

    for (let row = 0; row < rows; row++) {
        const rowCells = [];
        for (let col = 0; col < cols; col++) {
            rowCells.push({
                x: col * cellWidth,
                y: row * cellHeight,
                width: cellWidth,
                height: cellHeight
            });
        }
        cells.push(rowCells);
    }

    return cells;
};

// Helper function to get image data from canvas
export const getImageData = (canvas) => {
    const ctx = canvas.getContext('2d');
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
};