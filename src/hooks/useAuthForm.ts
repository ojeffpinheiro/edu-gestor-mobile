import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { AuthFormErrors, AuthFormState, AuthMode } from '../types/authTypes';
import { useFeedback } from './useFeedback';
import { authService } from '../services/authService';

type ErrorAction = {
  text: string;
  onPress: () => void;
};

interface ErrorMapping {
  [key: string]: {
    title: string;
    message: string;
    actions?: ErrorAction[];
    troubleshooting?: string[];
  };
}

export const useAuthForm = (initialMode: AuthMode = 'login') => {
  // Estado do formulário
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [formState, setFormState] = useState<AuthFormState>({
    email: 'test@mail.com',
    password: '123456',
    showPassword: false
  });
  const [errors, setErrors] = useState<AuthFormErrors>({
    email: '',
    password: '',
    general: ''
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const { showFeedback } = useFeedback();

  // Mapeamento de erros
  const errorMappings: ErrorMapping = {
    default: {
      title: 'Ocorreu um erro',
      message: 'Algo inesperado aconteceu. Por favor, tente novamente.',
      troubleshooting: [
        'Verifique sua conexão com a internet',
        'Reinicie o aplicativo',
        'Atualize para a versão mais recente do aplicativo'
      ]
    },
    invalid_credentials: {
      title: 'Credenciais inválidas',
      message: 'E-mail ou senha incorretos.',
      troubleshooting: [
        'Verifique se o e-mail está correto',
        'Confira se a senha está digitada corretamente',
        'Se esqueceu sua senha, tente recuperá-la'
      ]
    },
    email_already_in_use: {
      title: 'E-mail já cadastrado',
      message: 'Este e-mail já está sendo usado por outra conta.',
      troubleshooting: [
        'Tente fazer login em vez de cadastrar',
        'Use a opção de recuperação de senha se necessário',
        'Tente cadastrar com um e-mail diferente'
      ]
    },
    weak_password: {
      title: 'Senha fraca',
      message: 'A senha não atende aos requisitos mínimos de segurança.',
      troubleshooting: [
        'Use pelo menos 6 caracteres',
        'Inclua pelo menos uma letra maiúscula',
        'Inclua pelo menos um número'
      ]
    }
  };

  // Alternar entre login e cadastro
  const toggleAuthMode = useCallback(() => {
    setMode(prev => prev === 'login' ? 'register' : 'login');
    setErrors({ email: '', password: '', general: '' });
    setPasswordErrors([]);
    setFormState(prev => ({ ...prev, password: '' }));
  }, []);

  // Validar e-mail
  const validateEmail = useCallback((email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setErrors(prev => ({ ...prev, email: 'E-mail é obrigatório' }));
      return false;
    }

    if (!emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Formato de e-mail inválido (exemplo: nome@dominio.com)' }));
      return false;
    }

    setErrors(prev => ({ ...prev, email: '' }));
    return true;
  }, []);

  // Validar senha
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
    setErrors(prev => ({ ...prev, password: errors.length > 0 ? errors[0] : '' }));
    return errors.length === 0;
  }, []);

  // Validar campo individual
  const validateField = useCallback((field: Exclude<keyof AuthFormState, 'showPassword'>, value: string) => {
    if (field === 'email') return validateEmail(value);
    if (field === 'password') return validatePassword(value);
    return true;
  }, [validateEmail, validatePassword]);

  // Atualizar campos do formulário
  const handleChange = useCallback((field: keyof AuthFormState, value: string | boolean) => {
    setFormState(prev => ({
      ...prev,
      [field]: field === 'showPassword' ? Boolean(value) : String(value)
    }));

    // Validação em tempo real após o campo ser tocado
    if (touched[field] && field !== 'showPassword') {
      validateField(field, String(value));
    }
  }, [touched, validateField]);

  // Marcar campo como tocado
  const handleBlur = useCallback((field: Exclude<keyof AuthFormState, 'showPassword'>) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formState[field]);
  }, [formState, validateField]);

  // Validar formulário completo
  const validateForm = useCallback(() => {
    const isEmailValid = validateEmail(formState.email);
    const isPasswordValid = validatePassword(formState.password);
    return isEmailValid && isPasswordValid;
  }, [formState, validateEmail, validatePassword]);

  // Mostrar erro
  const showError = useCallback((errorCode: string, error?: Error) => {
    const config = errorMappings[errorCode] || errorMappings.default;
    const errorMessage = typeof error === 'string' ? error : error?.message;

    console.error(`[${errorCode}] ${errorMessage || config.message}`, {
      error,
      troubleshooting: config.troubleshooting
    });

    setErrors(prev => ({ ...prev, general: errorMessage || config.message }));

    Alert.alert(
      config.title,
      errorMessage || config.message,
      [{ text: 'OK', onPress: () => { } }]
    );
  }, []);

  // Submeter formulário
  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      showFeedback({
        message: 'Por favor, corrija os erros no formulário',
        type: 'error'
      });
      return false;
    }
    console.log('Tentando login com:', formState.email, formState.password);

    setIsLoading(true);
    try {
      if (mode === 'login') {
        await authService.login(formState.email, formState.password);
        showFeedback({
          message: 'Login realizado com sucesso!',
          type: 'success'
        });
        return true;
      } else {
        await authService.register(formState.email, formState.password);
        showFeedback({
          message: 'Cadastro realizado com sucesso!',
          type: 'success'
        });
        return true;
      }
    } catch (error) {
      let message = 'Credenciais inválidas';

      if (error instanceof Error) {
        if (error.message.includes('invalid-credentials')) {
          message = 'E-mail ou senha incorretos';
        } else if (error.message.includes('weak-password')) {
          message = 'Senha deve ter pelo menos 6 caracteres';
        }
      }

      showFeedback({
        message,
        type: 'error'
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [formState, mode, validateForm]);

  // Toggle visibilidade da senha
  const toggleShowPassword = useCallback(() => {
    setFormState(prev => ({ ...prev, showPassword: !prev.showPassword }));
  }, []);

  return {
    mode,
    formState,
    errors,
    passwordErrors,
    touched,
    isLoading,
    toggleAuthMode,
    handleChange,
    handleBlur,
    handleSubmit,
    toggleShowPassword,
    validateField,
    validateEmail,
  };
};