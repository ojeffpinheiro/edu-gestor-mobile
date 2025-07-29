import { useState, useCallback } from 'react';

export const usePasswordValidation = () => {
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [passwordValid, setPasswordValid] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const validatePassword = useCallback((password: string) => {
    const criteria = [
      { test: (pwd: string) => pwd.length >= 6, message: "Mínimo 6 caracteres" },
      { test: (pwd: string) => /[A-Z]/.test(pwd), message: "Uma letra maiúscula" },
      { test: (pwd: string) => /[0-9]/.test(pwd), message: "Um número" }
    ];

    const errors = criteria
      .filter(rule => !rule.test(password))
      .map(rule => rule.message);

    setPasswordErrors(errors);
    setPasswordValid(errors.length === 0);
    return errors.length === 0;
  }, []);

  const handlePasswordChange = useCallback((password: string) => {
    setIsPasswordTouched(true);
    validatePassword(password);
  }, [validatePassword]);

  return {
    passwordErrors,
    passwordValid,
    isPasswordTouched,
    validatePassword,
    handlePasswordChange
  };
};