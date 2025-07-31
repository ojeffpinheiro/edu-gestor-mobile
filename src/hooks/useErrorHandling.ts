import { Alert, Linking, Platform } from 'react-native';
import { useUserFeedback } from './useUserFeedback';
import { useState } from 'react';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerConfig {
  level: LogLevel;
  debug: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
}
type ErrorAction = {
  text: string;
  onPress: () => void;
};

interface ErrorConfig {
  title: string;
  message: string;
  actions?: ErrorAction[];
  troubleshooting?: string[];
  logLevel?: LogLevel
}

interface ErrorMapping {
  [key: string]: ErrorConfig;
}

export type ErrorCode =
  | 'default'
  | 'camera_permission_denied'
  | 'gallery_permission_denied'
  | 'camera_not_available'
  | 'image_processing_failed'
  | 'point_analysis_failed'
  | 'gallery_access_failed'
  | 'capture_failed'
  | 'image_validation'
  | 'invalid_question_count'
  | 'invalid_input'
  | 'no_pending_exams'
  | 'network_error'
  | string; // Permite códigos customizados

interface ShowErrorOptions {
  useToast?: boolean;
  useFeedback?: boolean;
  retry?: () => Promise<void> | void;
  retryCount?: number;
  currentRetry?: number;
  logLevel?: LogLevel;
  forceFeedbackMethod?: 'toast' | 'alert' | 'feedback';
}

const useErrorHandling = () => {
  const { showFeedback, showToast } = useUserFeedback();
  const [retryStates, setRetryStates] = useState<Record<string, {
    count: number;
    current: number;
  }>>({});

  // Configuração do logger
  const [logger] = useState<LoggerConfig>({
    level: __DEV__ ? 'debug' : 'error', // Nível mais verboso em desenvolvimento
    debug: (...args) => console.debug('[DEBUG]', ...args),
    info: (...args) => console.info('[INFO]', ...args),
    warn: (...args) => console.warn('[WARN]', ...args),
    error: (...args) => console.error('[ERROR]', ...args),
  });

  // Método para log que respeita o nível configurado
  const log = (level: LogLevel, ...args: any[]) => {
    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3
    };

    if (levels[level] >= levels[logger.level]) {
      logger[level](...args);
    }
  };

  const openAppSettings = () => {
    Linking.openSettings().catch(() => {
      showError('settings_open_failed', 'Não foi possível abrir as configurações', {
        forceFeedbackMethod: 'alert'
      });
    });
  };

  // Mapeamento detalhado de erros com mensagens amigáveis e ações
  const errorMappings: ErrorMapping = {
    default: {
      title: 'Ocorreu um erro',
      message: 'Algo inesperado aconteceu. Por favor, tente novamente.',
      troubleshooting: [
        'Verifique sua conexão com a internet',
        'Reinicie o aplicativo',
        'Atualize para a versão mais recente do aplicativo'
      ],
      logLevel: 'error'
    },
    camera_permission_denied: {
      title: 'Permissão da câmera negada',
      message: 'Para usar a câmera, precisamos da sua permissão.',
      actions: [
        {
          text: 'Abrir Configurações',
          onPress: openAppSettings
        }
      ],
      troubleshooting: [
        'Toque em "Abrir Configurações" para conceder permissão',
        'Na tela de configurações, ative a permissão para a câmera',
        'Reinicie o aplicativo após conceder a permissão'
      ],
      logLevel: 'warn'
    },
    gallery_permission_denied: {
      title: 'Acesso à galeria negado',
      message: 'Para selecionar imagens, precisamos acessar sua galeria.',
      actions: [
        {
          text: 'Abrir Configurações',
          onPress: openAppSettings
        }
      ],
      troubleshooting: [
        'Toque em "Abrir Configurações" para conceder permissão',
        'Na tela de configurações, ative a permissão para armazenamento',
        'Reinicie o aplicativo após conceder a permissão'
      ]
    },
    camera_not_available: {
      title: 'Câmera indisponível',
      message: 'Não foi possível acessar a câmera do dispositivo.',
      troubleshooting: [
        'Verifique se outra aplicação está usando a câmera',
        'Reinicie o dispositivo',
        'Verifique se a câmera está funcionando corretamente no modo padrão'
      ]
    },
    image_processing_failed: {
      title: 'Falha no processamento',
      message: 'Não foi possível processar a imagem capturada.',
      troubleshooting: [
        'Tente capturar a imagem novamente',
        'Verifique se a imagem não está muito escura ou desfocada',
        'Garanta que os pontos de referência estão visíveis na imagem'
      ]
    },
    point_analysis_failed: {
      title: 'Análise incompleta',
      message: 'Não foi possível identificar todos os pontos de referência na imagem.',
      troubleshooting: [
        'Posicione melhor o documento na área demarcada',
        'Verifique se todos os marcadores estão visíveis',
        'Evite reflexos e sombras na captura',
        'Tente novamente em um ambiente mais iluminado'
      ]
    },
    gallery_access_failed: {
      title: 'Galeria indisponível',
      message: 'Não foi possível acessar sua galeria de imagens.',
      troubleshooting: [
        'Verifique se o dispositivo possui fotos na galeria',
        'Reinicie o aplicativo',
        Platform.select({
          android: ['Verifique as permissões de armazenamento'],
          ios: ['Verifique o acesso às Fotos nas configurações']
        })
      ].flat()
    },
    capture_failed: {
      title: 'Captura falhou',
      message: 'Não foi possível capturar a imagem.',
      troubleshooting: [
        'Verifique se a câmera está funcionando corretamente',
        'Limpe a lente da câmera',
        'Tente novamente em um ambiente mais iluminado',
        'Reinicie o aplicativo'
      ]
    },
    image_validation: {
      title: 'Problema na imagem',
      message: 'A imagem não atende aos requisitos mínimos.',
      troubleshooting: [
        'Verifique se a imagem está nítida e bem iluminada',
        'Certifique-se de que o formato é JPG, JPEG ou PNG',
        'Reduza o tamanho da imagem se for muito grande'
      ]
    },
    invalid_question_count: {
      title: 'Número inválido',
      message: 'O número de questões deve ser entre 1 e 100.',
      troubleshooting: [
        'Digite um número inteiro',
        'Use valores entre 1 e 100',
        'Verifique se não há caracteres inválidos'
      ]
    },
    invalid_input: {
      title: 'Entrada inválida',
      message: 'Verifique os dados fornecidos:',
      troubleshooting: [
        'O gabarito deve conter apenas respostas A, B, C ou D',
        'Nenhum campo pode estar vazio',
        'Verifique se todas as provas têm respostas cadastradas'
      ]
    },

    no_pending_exams: {
      title: 'Nenhuma prova pendente',
      message: 'Todas as provas já foram corrigidas.',
      troubleshooting: [
        'Verifique se há novas provas para corrigir',
        'Se necessário, redefina o status de alguma prova'
      ]
    },

    network_error: {
      title: 'Problema de conexão',
      message: 'Não foi possível conectar ao servidor.',
      actions: [
        {
          text: 'Tentar novamente',
          onPress: () => { } // Será substituído na showError
        }
      ],
      troubleshooting: [
        'Verifique sua conexão com a internet',
        'Se estiver usando Wi-Fi, tente se aproximar do roteador',
        'Desative o modo avião se estiver ativado'
      ]
    },
  };

  const getErrorConfig = (errorCode: ErrorCode): ErrorConfig => {
    return errorMappings[errorCode] || errorMappings.default;
  };

  const showError = (
    errorCode: ErrorCode, 
    error?: Error | string, 
    options?: ShowErrorOptions
  ) => {
    const config = getErrorConfig(errorCode);
    const errorMessage = typeof error === 'string' ? error : error?.message;
    const retryCount = options?.retryCount ?? 0;
    const currentRetry = options?.currentRetry ?? 0;
    const logLevel = options?.logLevel || config.logLevel || 'error';

    // Log com nível apropriado
    log(logLevel, `[${errorCode}] ${errorMessage || config.message}`, {
      error,
      troubleshooting: config.troubleshooting,
      retryInfo: options?.retry ? `${currentRetry}/${retryCount}` : undefined
    });

    // Prepara mensagem com contador de retry se aplicável
    let displayMessage = errorMessage || config.message;
    if (options?.retry && retryCount > 0) {
      displayMessage += `\n\n(Tentativa ${currentRetry + 1} de ${retryCount + 1})`;
    }

    // Determina o método de feedback
    const feedbackMethod = options?.forceFeedbackMethod || 
      (options?.useToast ? 'toast' : 
       options?.useFeedback ? 'feedback' : 
       'alert');

    // Monta os botões de ação
    const buttons: ErrorAction[] = [
      ...(config.actions || []),
      { 
        text: 'Entendi', 
        onPress: () => {} 
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
        }
      });
    }

    // Exibe o feedback usando o método determinado
    switch (feedbackMethod) {
      case 'toast':
        showToast(displayMessage, 'error', 3000);
        break;
        
      case 'feedback':
        showFeedback({
          type: 'error',
          message: displayMessage,
          title: config.title,
          actions: buttons.map(btn => ({
            text: btn.text,
            onPress: btn.onPress,
            style: 'primary'
          })),
          persistent: true
        });
        break;
        
      case 'alert':
      default:
        Alert.alert(
          config.title,
          displayMessage,
          buttons
        );
        
        if (config.troubleshooting?.length) {
          setTimeout(() => {
            Alert.alert(
              'Como resolver?',
              config.troubleshooting!.join('\n\n• '),
              [{ text: 'OK', onPress: () => { } }]
            );
          }, 500);
        }
        break;
    }
  };

  const showCustomError = (
    title: string, 
    message: string, 
    action?: () => void,
    options?: {
      retry?: () => Promise<void> | void;
      retryCount?: number;
    }
  ) => {
    console.error(`[custom_error] ${title}: ${message}`);

    const buttons = [
      {
        text: 'OK',
        onPress: action || (() => {})
      }
    ];

    // Adiciona retry se fornecido
    if (options?.retry && options.retryCount) {
      buttons.unshift({
        text: 'Tentar novamente',
        onPress: async () => {
          try {
            await options.retry?.();
          } catch (err) {
            showCustomError(title, message, action, {
              retry: options.retry,
              retryCount: options.retryCount ? options.retryCount - 1 : 0
            });
          }
        }
      });
    }

    Alert.alert(title, message, buttons);
  };

  return {
    showError,
    showCustomError,
    errorMappings,
    getErrorConfig,
    retryStates,
    setLogLevel: (level: LogLevel) => {
      logger.level = level;
    }
  };
};

export default useErrorHandling;