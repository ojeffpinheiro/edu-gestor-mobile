import { useState } from "react";
import * as Yup from 'yup';
import { useFeedback } from "./useFeedback";

// Esquema de validação reutilizável
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Por favor, insira um e-mail válido')
    .required('E-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('Senha é obrigatória')
});

const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Por favor, insira um e-mail válido')
    .required('E-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
      'A senha deve conter pelo menos 1 letra maiúscula, 1 minúscula e 1 número'
    )
    .required('Senha é obrigatória')
});

export const useAuthForm = (setCurrentView, email, password) => {
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    general: ''
  });
  const [touchedFields, setTouchedFields] = useState({
    email: false,
    password: false
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { showFeedback, feedback } = useFeedback();

  const validateField = async (field: string, value: string, isLogin: boolean) => {
    try {
      const schema = isLogin ? loginSchema : signupSchema;
      await schema.validateAt(field, { [field]: value });
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setFormErrors(prev => ({ ...prev, [field]: error.message }));
      }
    }
  };

  const handleBlur = (field: string, value: string, isLogin: boolean) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
    validateField(field, value, isLogin);
  };

  const validateForm = async (isLogin: boolean) => {
    try {
      const schema = isLogin ? loginSchema : signupSchema;
      await schema.validate({ email, password }, { abortEarly: false });
      return true;
    } catch (errors) {
      if (errors instanceof Yup.ValidationError) {
        const newErrors = errors.inner.reduce((acc, err) => {
          return { ...acc, [err.path]: err.message };
        }, {});
        setFormErrors(prev => ({ ...prev, ...newErrors }));
      }
      return false;
    }
  };

  const submit = async (email: string, password: string, isLogin: boolean) => {
    if (!await validateForm(isLogin)) return;
    
    try {
      setIsLoading(true);
      // Simulação de chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (isLogin) {
        showFeedback('Login realizado com sucesso!', 'success');
        setCurrentView('scanner');
      } else {
        showFeedback('Cadastro realizado com sucesso!', 'success');
      }
    } catch (error) {
      let errorMessage = 'Falha na autenticação';
      
      if (error.response) {
        switch (error.response.status) {
          case 401:
            errorMessage = 'E-mail ou senha incorretos';
            break;
          case 409:
            errorMessage = 'E-mail já cadastrado';
            break;
          // outros casos...
        }
      }
      
      showFeedback(errorMessage, 'error');
      setFormErrors(prev => ({ ...prev, general: errorMessage }));
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    formErrors, 
    isLoading, 
    feedback, 
    submit,
    validateField,
    handleBlur,
    touchedFields
  };
};