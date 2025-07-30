import { useMemo } from 'react';

type ValidationResult = {
  isValid: boolean;
  message?: string;
};

export const useValidation = () => {
  const validateISBN = useMemo(() => (code: string): ValidationResult => {
    if (!code.trim()) {
      return { isValid: false, message: 'Please enter a code' };
    }

    // Validação básica de ISBN
    const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    if (!isbnRegex.test(code)) {
      return { 
        isValid: false, 
        message: 'Invalid ISBN format. Expected format: XXX-X-XX-XXXXXX-X' 
      };
    }

    return { isValid: true };
  }, []);

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