import { useState, useCallback } from 'react';

export const useEmailValidation = () => {
  const [emailError, setEmailError] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);

  const validateEmail = useCallback((email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      setEmailError('E-mail é obrigatório');
      setEmailValid(false);
      return false;
    }
    
    if (!emailRegex.test(email)) {
      setEmailError('Formato de e-mail inválido (exemplo: nome@dominio.com)');
      setEmailValid(false);
      return false;
    }
    
    setEmailError('');
    setEmailValid(true);
    return true;
  }, []);

  const handleEmailChange = useCallback((email: string) => {
    setIsEmailTouched(true);
    validateEmail(email);
  }, [validateEmail]);

  return {
    emailError,
    emailValid,
    isEmailTouched,
    validateEmail,
    handleEmailChange
  };
};