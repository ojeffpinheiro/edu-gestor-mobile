import { Image } from "react-native";
import * as tf from '@tensorflow/tfjs';
import * as yup from 'yup';

interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateQuestionCount = (count: number): ValidationResult => {
  if (isNaN(count) || !Number.isInteger(count)) {
    return { isValid: false, message: 'O número de questões deve ser um valor inteiro' };
  }
  if (count < 1 || count > 100) {
    return { isValid: false, message: 'O número de questões deve estar entre 1 e 100' };
  }
  return { isValid: true };
};

export const validateImageFile = (fileInfo: { uri: string; size?: number }): ValidationResult => {
  // Verificar extensão do arquivo
  const validExtensions = ['.jpg', '.jpeg', '.png'];
  const fileExtension = fileInfo.uri.split('.').pop()?.toLowerCase();
  
  if (!fileExtension || !validExtensions.includes(`.${fileExtension}`)) {
    return { 
      isValid: false, 
      message: 'Formato de imagem inválido. Use JPG, JPEG ou PNG.' 
    };
  }

  // Verificar tamanho do arquivo (max 10MB)
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  if (fileInfo.size && fileInfo.size > MAX_SIZE) {
    return { 
      isValid: false, 
      message: 'Imagem muito grande. Tamanho máximo permitido: 10MB.' 
    };
  }

  return { isValid: true };
};

export const validateImageQuality = async (imageUri: string): Promise<ValidationResult> => {
  try {
    // Implementar análise básica de qualidade
    const { width, height } = await getImageDimensions(imageUri);
    if (width < 500 || height < 500) {
      return { 
        isValid: false, 
        message: 'Imagem de baixa resolução. Use imagens com pelo menos 500x500 pixels.' 
      };
    }
    return { isValid: true };
  } catch (error) {
    return { 
      isValid: false, 
      message: 'Não foi possível analisar a qualidade da imagem.' 
    };
  }
};

export const validateLightingConditions = (imageTensor: tf.Tensor3D): ValidationResult => {
  // Implementar análise de iluminação usando tensor
  const meanBrightness = tf.mean(imageTensor).dataSync()[0];
  
  if (meanBrightness < 50) {
    return { isValid: false, message: 'Imagem muito escura. Melhore a iluminação.' };
  }
  if (meanBrightness > 200) {
    return { isValid: false, message: 'Imagem muito clara. Reduza o brilho.' };
  }
  
  return { isValid: true };
};

// Helper para obter dimensões da imagem
const getImageDimensions = (uri: string): Promise<{width: number, height: number}> => {
  return new Promise((resolve, reject) => {
    Image.getSize(uri, (width, height) => {
      resolve({ width, height });
    }, reject);
  });
};


export const studentSchema = yup.object().shape({
  id: yup.string().required('ID é obrigatório'),
  name: yup.string()
    .required('Nome é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome não pode exceder 100 caracteres'),
  registrationNumber: yup.string()
    .required('Matrícula é obrigatória')
    .matches(/^[A-Za-z0-9]+$/, 'Matrícula deve conter apenas letras e números'),
  class: yup.string()
    .required('Turma é obrigatória')
    .max(10, 'Turma não pode exceder 10 caracteres')
});

export const searchInputSchema = yup.string()
  .max(50, 'Busca muito longa (máx. 50 caracteres)')
  .matches(/^[A-Za-z0-9\sáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]*$/, 'Busca contém caracteres inválidos');