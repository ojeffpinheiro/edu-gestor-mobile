export type AuthMode = 'login' | 'register';

export interface AuthFormState {
  email: string;
  password: string;
  showPassword: boolean;
}

export interface AuthFormErrors {
  email: string;
  password: string;
  general: string;
}

export type AuthFormFields = keyof AuthFormState;