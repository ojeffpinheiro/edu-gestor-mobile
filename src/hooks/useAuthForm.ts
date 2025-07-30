import { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import { AuthFormErrors, AuthFormState, AuthMode } from '../types/authTypes';
import { authService } from '../services/authService';
import { useUserFeedback } from './useUserFeedback';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ErrorAction = {
  text: string;
  onPress: () => void;
  style?: 'primary' | 'secondary';
};

interface ErrorMappingItem {
  title: string;
  message: string;
  actions?: ErrorAction[];
  troubleshooting?: string[];
  severity?: 'low' | 'medium' | 'high';
  autoHide?: boolean;
}

interface ErrorMapping {
  [key: string]: ErrorMappingItem;
}

const ERROR_MAPPINGS: ErrorMapping = {
  default: {
    title: 'Ocorreu um erro',
    message: 'Algo inesperado aconteceu. Por favor, tente novamente.',
    severity: 'medium',
    troubleshooting: [
      'Verifique sua conexão com a internet',
      'Reinicie o aplicativo',
      'Atualize para a versão mais recente'
    ]
  },
  invalid_credentials: {
    title: 'Credenciais inválidas',
    message: 'E-mail ou senha incorretos. Verifique seus dados e tente novamente.',
    severity: 'high',
    actions: [
      {
        text: 'Recuperar senha',
        onPress: () => { }, // Será sobrescrito no uso
        style: 'secondary'
      }
    ]
  },
  email_already_in_use: {
    title: 'E-mail já cadastrado',
    message: 'Este e-mail já está sendo usado. Deseja fazer login?',
    severity: 'medium',
    actions: [
      {
        text: 'Fazer login',
        onPress: () => { }, // Será sobrescrito
        style: 'primary'
      }
    ]
  },
  weak_password: {
    title: 'Senha fraca',
    message: 'Sua senha não atende aos requisitos mínimos de segurança:',
    severity: 'medium',
    autoHide: false
  },
  network_error: {
    title: 'Sem conexão',
    message: 'Não foi possível conectar ao servidor. Verifique sua internet.',
    severity: 'high',
    troubleshooting: [
      'Verifique seu Wi-Fi ou dados móveis',
      'Tente novamente quando tiver conexão'
    ]
  },
  too_many_requests: {
    title: 'Muitas tentativas',
    message: 'Você tentou muitas vezes. Espere alguns minutos ou reset sua senha.',
    severity: 'high',
    actions: [
      {
        text: 'Resetar senha',
        onPress: () => { },
        style: 'primary'
      }
    ]
  },
  user_not_found: {
    title: 'Conta não encontrada',
    message: 'Nenhuma conta encontrada com este e-mail. Deseja se cadastrar?',
    severity: 'medium',
    actions: [
      {
        text: 'Cadastrar',
        onPress: () => { },
        style: 'primary'
      }
    ]
  }
};

export const useAuthForm = (initialMode: AuthMode = 'login') => {
  // Estado do formulário
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [formState, setFormState] = useState<AuthFormState>({
    email: '',
    password: '',
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
  const [rememberUser, setRememberUser] = useState(false);

  const { showFeedback } = useUserFeedback();

  useEffect(() => {
    const loadSavedCredentials = async () => {
      try {
        const savedCredentials = await AsyncStorage.getItem('userCredentials');
        if (savedCredentials) {
          const { email, remember } = JSON.parse(savedCredentials);
          setFormState(prev => ({ ...prev, email }));
          setRememberUser(remember);

          showFeedback({
            type: 'info',
            message: `Bem-vindo de volta, ${email}`,
            duration: 2000,
            position: 'top'
          });
        }
      } catch (error) {
        console.error('Failed to load credentials', error);
      }
    };

    loadSavedCredentials();
  }, []);

  // Função para salvar credenciais
  const saveCredentials = async (email: string, remember: boolean) => {
    try {
      if (remember) {
        await AsyncStorage.setItem('userCredentials', JSON.stringify({ email, remember }));
      } else {
        await AsyncStorage.removeItem('userCredentials');
      }
    } catch (error) {
      console.error('Failed to save credentials', error);
    }
  };

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
  const validatePassword = useCallback((password: string): boolean => {
    const criteria = [
      { test: (pwd: string) => pwd.length >= 6, message: "Mínimo 6 caracteres" },
      { test: (pwd: string) => /[A-Z]/.test(pwd), message: "Uma letra maiúscula" },
      { test: (pwd: string) => /[0-9]/.test(pwd), message: "Um número" }
    ];
    const errorMessages = criteria
      .filter(rule => !rule.test(password))
      .map(rule => rule.message);


    // Mostra apenas o primeiro erro para o usuário
    const firstError = errorMessages[0] || '';
    setErrors(prev => ({ ...prev, password: firstError }));

    return errorMessages.length === 0;
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
  }, [touched, validateEmail, validatePassword]);

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
  const showError = useCallback((errorCode: string = 'default', error?: Error, context?: any) => {
    const mapping = ERROR_MAPPINGS[errorCode] || ERROR_MAPPINGS.default;
    let finalMessage = mapping.message;

    // Adiciona detalhes específicos para alguns erros
    if (errorCode === 'weak_password' && context?.passwordErrors) {
      finalMessage += `\n\n• ${context.passwordErrors.join('\n• ')}`;
    }
    // Prepara ações com contexto
    const actionsWithContext = mapping.actions?.map(action => {
      if (action.text === 'Fazer login') {
        return { ...action, onPress: () => setMode('login') };
      }
      if (action.text === 'Cadastrar') {
        return { ...action, onPress: () => setMode('register') };
      }
      return action;
    });
    // Mostra feedback visual
    showFeedback({
      type: mapping.severity === 'high' ? 'error' :
        mapping.severity === 'medium' ? 'warning' : 'info',
      title: mapping.title,
      message: finalMessage,
      actions: actionsWithContext,
      persistent: !mapping.autoHide,
      haptic: true
    });


    // Atualiza estado de erros
    setErrors(prev => ({
      ...prev,
      general: finalMessage.split('\n')[0] // Pega apenas a primeira linha para o formulário
    }));
    console.error(`[${errorCode}] ${error?.message || mapping.message}`, {
      error,
      context,
      troubleshooting: mapping.troubleshooting
    });
  }, [showFeedback]);

  // Submeter formulário
  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      showError('validation_failed');
      return false;
    }

    setIsLoading(true);
    try {
      if (mode === 'login') {
        await authService.login(formState.email, formState.password);
        await saveCredentials(formState.email, rememberUser);

        showFeedback({
          type: 'success',
          title: 'Login realizado!',
          message: `Bem-vindo de volta, ${formState.email}`,
          duration: 2000
        });
        return true;
      } else {
        await authService.register(formState.email, formState.password);

        showFeedback({
          type: 'success',
          title: 'Cadastro concluído!',
          message: 'Sua conta foi criada com sucesso',
          actions: [
            {
              text: 'Fazer login agora',
              onPress: () => setMode('login'),
              style: 'primary'
            }
          ],
          persistent: true
        });
        return true;
      }
    } catch (error) {
      let errorCode = 'default';
      let context = {};

      if (error instanceof Error) {
        if (error.message.includes('invalid-credential') ||
          error.message.includes('wrong-password')) {
          errorCode = 'invalid_credentials';
        } else if (error.message.includes('weak-password')) {
          errorCode = 'weak_password';
          context = { passwordErrors: getPasswordErrors(formState.password) };
        } else if (error.message.includes('email-already-in-use')) {
          errorCode = 'email_already_in_use';
        } else if (error.message.includes('user-not-found')) {
          errorCode = 'user_not_found';
        } else if (error.message.includes('network-request-failed')) {
          errorCode = 'network_error';
        } else if (error.message.includes('too-many-requests')) {
          errorCode = 'too_many_requests';
        }
      }

      showError(errorCode, error, context);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [formState, mode, rememberUser, validateForm, showError]);

  const toggleRememberUser = useCallback(() => {
    setRememberUser(prev => !prev);
    if (!rememberUser && formState.email) {
      showFeedback({
        type: 'info',
        message: 'Seu e-mail será lembrado',
        duration: 1500,
        position: 'top'
      });
    }
  }, [rememberUser, formState.email]);

  // Toggle visibilidade da senha
  const toggleShowPassword = useCallback(() => {
    setFormState(prev => ({ ...prev, showPassword: !prev.showPassword }));
  }, []);

  const getPasswordErrors = useCallback((password: string): string[] => {
    const criteria = [
      { test: (pwd: string) => pwd.length >= 6, message: "Mínimo 6 caracteres" },
      { test: (pwd: string) => /[A-Z]/.test(pwd), message: "Uma letra maiúscula" },
      { test: (pwd: string) => /[0-9]/.test(pwd), message: "Um número" }
    ];

    return criteria
      .filter(rule => !rule.test(password))
      .map(rule => rule.message);
  }, []);

  return {
    mode,
    formState,
    errors,
    touched,
    isLoading,
    rememberUser,
    passwordErrors: mode === 'register' ? getPasswordErrors(formState.password) : [],
    showError,
    toggleAuthMode,
    handleChange,
    handleBlur,
    handleSubmit,
    toggleShowPassword,
    toggleRememberUser,
    validateField,
    validateEmail,
  };
};