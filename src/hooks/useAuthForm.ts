import { useState } from "react";
import useAuth from "./useAuth";
import { useFeedback } from "./useFeedback";

export const useAuthForm = (setCurrentView) => {
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
        general: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const {
        email, password, isLogin,
        toggleAuthMode
    } = useAuth();
      const { showFeedback, feedback } = useFeedback();

    const validateForm = () => {
        const errors = {
            email: '',
            password: '',
            general: ''
        };
        let isValid = true;

        if (!email) {
            errors.email = 'Email é obrigatório';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Por favor, insira um email válido';
            isValid = false;
        }

        if (isLogin) {
            if (!password) {
                errors.password = 'Senha é obrigatória';
                isValid = false;
            } else if (password.length < 6) {
                errors.password = 'Senha deve ter pelo menos 6 caracteres';
                isValid = false;
            }
        }

        setFormErrors(errors);
        return isValid;
    };

    const submit = async () => {
        if (!validateForm()) return;
        try {
            setIsLoading(true);
            // Simulação de chamada de API
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (isLogin) {
                // Login bem-sucedido
                showFeedback('Login realizado com sucesso!', 'success');
                setCurrentView('scanner');
            } else {
                // Cadastro bem-sucedido
                showFeedback('Cadastro realizado com sucesso!', 'success');
                toggleAuthMode();
            }
        } catch (error) {
            showFeedback(error.message || 'Falha na autenticação', 'error');
            setFormErrors({
                ...formErrors,
                general: error.message || 'Ocorreu um erro. Tente novamente.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return { 
        formErrors, isLoading, feedback, submit 
    };
};