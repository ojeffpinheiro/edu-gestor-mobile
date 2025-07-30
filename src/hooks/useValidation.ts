import { useMemo } from 'react';

type ValidationResult = {
  isValid: boolean;
  message?: string;
};

export const useValidation = () => {
  const validateISBN = (code: string) => {
    // Remover caracteres não numéricos
    const cleanCode = code.replace(/[^\dX]/gi, '');

    // Verificar comprimento
    if (cleanCode.length !== 13) {
      return { isValid: false, message: 'ISBN deve ter 13 dígitos' };
    }

    // Cálculo do dígito verificador
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const digit = parseInt(cleanCode[i]);
      sum += (i % 2 === 0) ? digit : digit * 3;
    }

    const checkDigit = (10 - (sum % 10)) % 10;
    if (parseInt(cleanCode[12]) !== checkDigit) {
      return { isValid: false, message: 'Dígito verificador inválido' };
    }

    return { isValid: true };
  };

  const validateQRCode = useMemo(() => (code: string): ValidationResult => {
    if (!code.trim()) {
      return { isValid: false, message: 'QR Code cannot be empty' };
    }

    // Validação básica de URL se for um QR code de URL
    if (code.startsWith('http')) {
      try {
        new URL(code);
      } catch {
        return { isValid: false, message: 'Invalid URL in QR Code' };
      }
    }

    return { isValid: true };
  }, []);

  return {
    validateISBN,
    validateQRCode,
    validateBarcode: validateISBN
  };
};