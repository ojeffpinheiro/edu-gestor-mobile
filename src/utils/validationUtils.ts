import { Image } from "react-native";
import * as tf from '@tensorflow/tfjs';
import * as yup from 'yup';

interface ValidationResult {
  isValid: boolean;
  message?: string;
  details?: { field: string; message: string }[];
  errorCode?: string;
}

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

export const validateCapturedImage = async (imageUri: string) => {
  const [fileValidation, qualityValidation] = await Promise.all([
    validateImageFile({ uri: imageUri }),
    validateImageQuality(imageUri)
  ]);

  return {
    isValid: fileValidation.isValid && qualityValidation.isValid,
    errors: [
      ...(fileValidation.message ? [fileValidation.message] : []),
      ...(qualityValidation.message ? [qualityValidation.message] : [])
    ]
  };
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

// Mensagens customizadas
const messages = {
  required: (field: string) => `🔹 ${field} é obrigatório`,
  min: (field: string, min: number) => `🔹 ${field} precisa ter no mínimo ${min} caracteres`,
  max: (field: string, max: number) => `🔹 ${field} não pode ter mais que ${max} caracteres`,
  matches: (field: string, pattern: string) => `🔹 ${field} contém caracteres inválidos`,
  email: "🔹 Email inválido",
  invalid: (field: string) => `🔹 ${field} está incorreto`
};

// Schema de Aluno Aprimorado
export const studentSchema = yup.object().shape({
  id: yup.string()
    .required(messages.required("ID do aluno")),

  name: yup.string()
    .required(messages.required("Nome completo"))
    .min(3, messages.min("Nome", 3))
    .max(100, messages.max("Nome", 100))
    .matches(
      /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]+$/,
      messages.matches("Nome", "apenas letras e espaços")
    )
    .test(
      "full-name",
      "🔹 Informe nome e sobrenome",
      value => (value?.trim().split(" ")?.length || 0) >= 2
    ),

  class: yup.string()
    .required(messages.required("Turma"))
    .max(10, messages.max("Turma", 10))
    .matches(
      /^[A-Za-z0-9]+$/,
      messages.matches("Turma", "apenas letras e números")
    )
});

// Schema de Busca Aprimorado
export const searchInputSchema = yup.string()
  .max(50, messages.max("Termo de busca", 50))
  .matches(
    /^[A-Za-z0-9\sáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]*$/,
    "🔹 Busca deve conter:\n- Apenas letras, números e espaços\n- Mínimo 3 caracteres"
  )
  .test(
    "min-length",
    "🔹 Digite pelo menos 3 caracteres para buscar",
    value => !value || value.length >= 3
  );

// Validação com tratamento detalhado de erros
export const validateStudent = async (student: any): Promise<ValidationResult> => {
  try {
    await studentSchema.validate(student, { abortEarly: false });
    return { isValid: true };
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const errorDetails = err.inner.map(e => ({
        field: e.path,
        message: e.message
      }));

      return {
        isValid: false,
        message: "Corrija os seguintes campos:",
        details: errorDetails,
        errorCode: "student_invalid_data"
      };
    }
    return {
      isValid: false,
      message: "Erro desconhecido na validação",
      errorCode: "validation_error"
    };
  }
};

// Validação de busca com tratamento amigável
export const validateSearch = (term: string): ValidationResult => {
  try {
    searchInputSchema.validateSync(term);
    return { isValid: true };
  } catch (err) {
    return {
      isValid: false,
      message: err.message,
      errorCode: "search_invalid_term"
    };
  }
};