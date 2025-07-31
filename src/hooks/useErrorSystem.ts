import { useCallback, useMemo, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { triggerHapticFeedback } from '../utils/hapticUtils';
import {
    FeedbackOptions, ErrorCode, ShowErrorOptions,
    ErrorConfig, ErrorAction, LoggerConfig, LogLevel,
    CustomErrorOptions
} from '../types/feedback';
import { defaultErrorMappings } from '../utils/error/errorMappings';
import { ValidationResults } from '../types/newTypes';

const DEFAULT_DURATIONS = {
    success: 3000,
    error: 4000,
    warning: 3500,
    info: 2500
};

interface ErrorSystemAPI {
    showError: (
        errorCode: ErrorCode,
        error?: Error | string,
        options?: ShowErrorOptions
    ) => void;
    showCustomError: (options: CustomErrorOptions) => void;
    registerError: (code: string, config: ErrorConfig) => void;
    updateError: (code: string, config: Partial<ErrorConfig>) => void;
    setLogLevel: (level: LogLevel) => void;
    getErrorConfig: (code: ErrorCode) => ErrorConfig;
}

// --- Implementação ---
const useErrorSystem = (): ErrorSystemAPI => {
    const [errorMappings, setErrorMappings] = useState(defaultErrorMappings);
    // Configuração do logger

    const [logger] = useState<LoggerConfig>({
        level: __DEV__ ? 'debug' : 'error',
        debug: (...args) => console.debug('[DEBUG]', ...args),
        info: (...args) => console.info('[INFO]', ...args),
        warn: (...args) => console.warn('[WARN]', ...args),
        error: (...args) => console.error('[ERROR]', ...args),
    });

    // Estado para retry tracking
    const retryStatesRef = useRef<Record<string, {
        count: number;
        current: number;
    }>>({});

    // Memoização do logger para evitar re-renders
    const log = useCallback((level: LogLevel, ...args: any[]) => {
        const levels: Record<LogLevel, number> = {
            debug: 0, info: 1, warn: 2, error: 3
        };
        if (levels[level] >= levels[logger.level]) {
            logger[level](...args);
        }
    }, [logger]);

    // Obter configuração de erro com fallback
    const getErrorConfig = useCallback((errorCode: ErrorCode): ErrorConfig => {
        return errorMappings[errorCode] || errorMappings.default;
    }, [errorMappings]);

    // Registrar novos códigos de erro dinamicamente
    const registerError = useCallback((code: string, config: ErrorConfig) => {
        setErrorMappings(prev => ({
            ...prev,
            [code]: { ...errorMappings.default, ...config }
        }));
    }, [errorMappings.default]);

    // Atualizar códigos de erro existentes
    const updateError = useCallback((code: string, config: Partial<ErrorConfig>) => {
        setErrorMappings(prev => {
            if (!prev[code]) return prev;
            return {
                ...prev,
                [code]: { ...prev[code], ...config }
            };
        });
    }, []);

    // Mostrar feedback visual
    const showFeedback = useCallback((options: FeedbackOptions & { alertStyle?: boolean }) => {
        const { type = 'info', message, title, actions, haptic = true, alertStyle } = options;

        if (haptic) triggerHapticFeedback(type);
        const config = getErrorConfig(type);

        if (alertStyle) {
            // Converter para AlertButton[]
            const alertButtons = actions?.map(action => ({
                text: action.text,
                onPress: action.onPress,
                style: (action.style === 'primary' || action.style === 'secondary')
                    ? 'default'
                    : action.style as 'default' | 'cancel' | 'destructive'
            })) || [];

            Alert.alert(
                title || (type === 'error' ? 'Erro' : type === 'success' ? 'Sucesso' : 'Aviso'),
                message,
                alertButtons,
                { cancelable: true }
            );
        } else {
            // Converter para FeedbackAction[]
            const feedbackActions = actions?.map(action => ({
                text: action.text,
                onPress: action.onPress,
                style: (action as any).feedbackStyle || 'primary' as 'primary' | 'secondary'
            })) || [];

            const feedbackOptions: FeedbackOptions = {
                type,
                message,
                title: title || '',
                actions: feedbackActions,
                persistent: options.persistent ?? false,
            };
            // ... implementação do feedback personalizado
        }
    }, []);

    // Implementação principal do tratamento de erros
    const showError = useCallback((
        errorCode: ErrorCode,
        error?: Error | string,
        options?: ShowErrorOptions
    ) => {
        const config = getErrorConfig(errorCode);
        const errorMessage = typeof error === 'string' ? error : error?.message;
        const retryCount = options?.retryCount ?? 0;
        const currentRetry = options?.currentRetry ?? 0;
        const logLevel = options?.logLevel || config.logLevel || 'error';
        const feedbackType = config.feedbackType || 'error';
        const haptic = options?.haptic ?? config.haptic ?? true;

        // Log detalhado
        log(logLevel, `[${errorCode}]`, {
            message: errorMessage || config.message,
            error,
            stack: error instanceof Error ? error.stack : undefined,
            troubleshooting: config.troubleshooting,
            retryInfo: options?.retry ? `${currentRetry}/${retryCount}` : undefined
        });

        // Prepara mensagem com contador de retry se aplicável
        let displayMessage = errorMessage || config.message;
        if (options?.retry && retryCount > 0) {
            displayMessage += `\n\n(Tentativa ${currentRetry + 1} de ${retryCount + 1})`;
        }

        // Monta os botões de ação
        const buttons: ErrorAction[] = [
            ...(config.actions || []),
            {
                text: 'Entendi',
                onPress: () => { },
                alertStyle: 'default',
                feedbackStyle: 'secondary'
            }
        ];

        // Adiciona ação de retry se disponível
        if (options?.retry && currentRetry < retryCount) {
            buttons.unshift({
                text: 'Tentar novamente',
                onPress: async () => {
                    try {
                        await options.retry?.();
                    } catch (err) {
                        showError(errorCode, err as Error, {
                            ...options,
                            currentRetry: currentRetry + 1
                        });
                    }
                },
                alertStyle: 'destructive',
                feedbackStyle: 'primary'
            });
        }

        // Determina o método de exibição
        const displayMethod = options?.method === 'auto' ?
            (errorCode === 'network_error' ? 'alert' : 'feedback') :
            options?.method || 'feedback';

        // Exibe o feedback
        if (displayMethod !== 'toast') {
            // Implementação simplificada de toast
            Alert.alert(config.title, displayMessage, buttons, {
                cancelable: true
            });
        } else {
            showFeedback({
                type: feedbackType,
                message: displayMessage,
                title: config.title,
                actions: buttons,
                haptic,
                persistent: false
            });

            // Mostra troubleshooting se aplicável
            if (config.troubleshooting?.length && displayMethod !== 'toast') {
                setTimeout(() => {
                    showFeedback({
                        type: 'info',
                        title: 'Como resolver?',
                        message: config.troubleshooting!.join('\n\n• '),
                        actions: [{ text: 'OK', onPress: () => { } }],
                        haptic: false,
                        persistent: false,
                        alertStyle: true
                    });
                }, 500);
            }
        }
    }, [getErrorConfig, log, showFeedback]);

    // Mostrar erro customizado
    const showCustomError = useCallback((options: CustomErrorOptions) => {
        const { title, message, actions = [], persistent = false, haptic = true } = options;
        log('error', `[custom_error] ${title}: ${message}`);

        if (haptic) triggerHapticFeedback('error');

        const alertButtons = actions.map(action => ({
            text: action.text,
            onPress: action.onPress,
            style: action.style || 'default'
        }));

        // Adiciona botão padrão se não houver ações
        if (actions.length === 0) {
            alertButtons.push({
                text: 'OK',
                onPress: () => { },
                style: 'default'
            });
        }

        Alert.alert(
            title,
            message,
            alertButtons,
            { cancelable: !persistent }
        );
    }, []);


    const showValidationError = (validationResult: ValidationResults) => {
        const config = getErrorConfig(validationResult.errorCode || "validation_error");

        showFeedback({
            type: config.feedbackType || "error",
            title: config.title,
            message: [
                validationResult.message,
                ...(validationResult.details?.map(d => `• ${d.field}: ${d.message}`) || [])
            ].join("\n"),
            actions: config.actions,
            persistent: true
        });
    };

    // Atualizar nível de log
    const setLogLevel = useCallback((level: LogLevel) => {
        logger.level = level;
    }, [logger]);

    // API exposta pelo hook
    return useMemo(() => ({
        retryStatesRef,
        showValidationError,
        showError,
        showCustomError,
        registerError,
        updateError,
        setLogLevel,
        getErrorConfig,
    }), [showError, showCustomError, registerError, updateError, setLogLevel, getErrorConfig]);
};

export default useErrorSystem;