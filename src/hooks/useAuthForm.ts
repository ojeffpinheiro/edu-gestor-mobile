import { useState, useCallback, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthFormErrors, AuthFormState, AuthMode } from '../types/authTypes';

import { authService } from '../services/authService';
import useErrorSystem from './useErrorSystem';

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
    confirmPassword: '',
    showPassword: false,
    tempShowPassword: false
  });
  const [errors, setErrors] = useState<AuthFormErrors>({
    email: '',
    password: '',
    confirmPassword: '',
    general: ''
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [rememberUser, setRememberUser] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lastAttemptTime, setLastAttemptTime] = useState<number | null>(null);
  const tempShowTimeout = useRef<NodeJS.Timeout | null>(null);
  const errorSystem = useErrorSystem();

  useEffect(() => {
    return () => {
      if (tempShowTimeout.current) {
        clearTimeout(tempShowTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    const loadSavedCredentials = async () => {
      try {
        const savedCredentials = await AsyncStorage.getItem('userCredentials');
        if (savedCredentials) {
          const { email, remember } = JSON.parse(savedCredentials);
          setFormState(prev => ({ ...prev, email }));
          setRememberUser(remember);
          errorSystem.showCustomError({
            title: 'Login realizado!',
            message: `Bem-vindo de volta, ${formState.email}`
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

  const toggleTempShowPassword = useCallback(() => {
    if (formState.tempShowPassword) return;

    setFormState(prev => ({ ...prev, tempShowPassword: true }));

    // Configurar timeout para esconder após 3 segundos
    tempShowTimeout.current = setTimeout(() => {
      setFormState(prev => ({ ...prev, tempShowPassword: false }));
    }, 3000);
  }, [formState.tempShowPassword]);

  const validateConfirmPassword = useCallback((confirmPassword: string): boolean => {
    if (mode !== 'register') return true;

    if (!confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Confirme sua senha' }));
      return false;
    }

    if (confirmPassword !== formState.password) {
      setErrors(prev => ({ ...prev, confirmPassword: 'As senhas não coincidem' }));
      return false;
    }

    setErrors(prev => ({ ...prev, confirmPassword: '' }));
    return true;
  }, [formState.password, mode]);

  // Alternar entre login e cadastro
  const toggleAuthMode = useCallback(() => {
    setMode(prev => prev === 'login' ? 'register' : 'login');
    setErrors({ email: '', password: '', general: '', confirmPassword: '' });
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
  const validateField = useCallback((field: keyof AuthFormState, value: string) => {
    if (field === 'email') return validateEmail(value);
    if (field === 'password') return validatePassword(value);
    if (field === 'confirmPassword') return validateConfirmPassword(value);
    return true;
  }, [validateEmail, validatePassword, validateConfirmPassword]);

  // Atualizar campos do formulário
  const handleChange = useCallback((field: keyof AuthFormState, value: string | boolean) => {
    setFormState(prev => ({
      ...prev,
      [field]: field === 'showPassword' || field === 'tempShowPassword'
        ? Boolean(value)
        : String(value)
    }));

    // Se a senha principal mudar, validar novamente a confirmação
    if (field === 'password' && typeof formState.confirmPassword === 'string') {
      validateConfirmPassword(formState.confirmPassword);
    }

    // Validação em tempo real após o campo ser tocado
    if (touched[field as Exclude<keyof AuthFormState, 'showPassword' | 'tempShowPassword'>] &&
      field !== 'showPassword' &&
      field !== 'tempShowPassword') {
      validateField(field as Exclude<keyof AuthFormState, 'showPassword' | 'tempShowPassword'>, String(value));
    }
  }, [touched, validateField, formState.confirmPassword, validateConfirmPassword]);

  // Marcar campo como tocado
  const handleBlur = useCallback((field: Exclude<keyof AuthFormState, 'showPassword' | 'tempShowPassword'>) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const value = formState[field];
    if (typeof value === 'string') {
      validateField(field, value);
    }
  }, [formState, validateField]);

  // Validar formulário completo
  const validateForm = useCallback(() => {
    const isEmailValid = validateEmail(formState.email);
    const isPasswordValid = validatePassword(formState.password);
    const isConfirmValid = mode === 'login' || validateConfirmPassword(formState.confirmPassword);

    return isEmailValid && isPasswordValid && isConfirmValid;
  }, [formState, validateEmail, validatePassword, validateConfirmPassword, mode]);

  // Mostrar erro
  const showError = useCallback((errorCode: string = 'default', error?: Error, context?: any) => {
    const mapping = ERROR_MAPPINGS[errorCode] || ERROR_MAPPINGS.default;

    errorSystem.showCustomError({
      title: mapping.title,
      message: mapping.message + (context?.passwordErrors ? `\n\n• ${context.passwordErrors.join('\n• ')}` : ''),
      actions: mapping.actions?.map(action => ({
        text: action.text,
        onPress: action.onPress,
        style: action.style === 'primary' ? 'default' : 'cancel'
      }))
    });
  }, [errorSystem]);

  const checkLoginAttempts = useCallback(() => {
    const now = Date.now();
    const MAX_ATTEMPTS = 5;
    const COOLDOWN_MINUTES = 5;

    // Resetar tentativas se passou tempo suficiente
    if (lastAttemptTime && (now - lastAttemptTime) > COOLDOWN_MINUTES * 60 * 1000) {
      setLoginAttempts(0);
      setLastAttemptTime(null);
      return true;
    }

    // Bloquear se excedeu tentativas
    if (loginAttempts >= MAX_ATTEMPTS) {
      const remainingTime = COOLDOWN_MINUTES - Math.floor((now - (lastAttemptTime || now)) / (60 * 1000));
      showError('too_many_attempts', new Error(`Tente novamente em ${remainingTime} minutos`));
      return false;
    }

    return true;
  }, [loginAttempts, lastAttemptTime, showError]);

  // Submeter formulário
  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      showError('validation_failed');
      return false;
    }

    // Verificar tentativas antes de prosseguir
    if (mode === 'login' && !checkLoginAttempts()) {
      return false;
    }

    setIsLoading(true);
    try {
      if (mode === 'login') {
        await authService.login(formState.email, formState.password);
        await saveCredentials(formState.email, rememberUser);

        // Resetar contador após login bem-sucedido
        setLoginAttempts(0);
        setLastAttemptTime(null);


        errorSystem.showCustomError({
          title: 'Login realizado!',
          message: `Bem-vindo de volta, ${formState.email}`
        });
        return true;
      } else {
        // Validar força da senha no registro
        const passwordErrors = getPasswordErrors(formState.password);
        if (passwordErrors.length > 0) {
          showError('weak_password', new Error('Senha não atende aos requisitos'), {
            passwordErrors
          });
          return false;
        }

        await authService.register(formState.email, formState.password);
        
        Alert.alert(
          'Cadastro concluído!',
          'Sua conta foi criada com sucesso. Deseja fazer login agora?',
          [
            {
              text: 'Fazer login',
              onPress: () => toggleAuthMode(),
              style: 'default'
            },
            {
              text: 'Mais tarde',
              style: 'cancel'
            }
          ]
        );
        return true;
      }
    } catch (error) {
      // Incrementar tentativas fracassadas
      if (mode === 'login') {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        setLastAttemptTime(Date.now());

        if (newAttempts >= 3) {
          showError('too_many_attempts', new Error(`Tentativa ${newAttempts} de 5. Após 5 tentativas, você será bloqueado temporariamente.`));
        }
      }

      // ... (restante do tratamento de erro permanece igual)
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [formState, mode, rememberUser, validateForm, showError, checkLoginAttempts, loginAttempts]);

  const toggleRememberUser = useCallback(() => {
    setRememberUser(prev => !prev);
    if (!rememberUser && formState.email) {
      errorSystem.showCustomError({
        title: 'Cadastro concluído!',
        message: 'Sua conta foi criada com sucesso',
        actions: [
          {
            text: 'Fazer login agora',
            onPress: () => setMode('login'),
            style: 'default'
          }
        ]
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
    loginAttempts,
    passwordErrors: mode === 'register' ? getPasswordErrors(formState.password) : [],
    showError,
    toggleAuthMode,
    handleChange,
    handleBlur,
    handleSubmit,
    toggleShowPassword,
    toggleTempShowPassword,
    toggleRememberUser,
    validateField,
    validateEmail,
  };
};