export type AuthMode = 'login' | 'register';

export interface AuthFormState {
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  tempShowPassword: boolean;
}

export interface AuthFormErrors {
  email: string;
  password: string;
  confirmPassword: string;
  general: string;
}

export type AuthFormFields = keyof AuthFormState;