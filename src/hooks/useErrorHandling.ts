import { Alert, Linking, Platform } from 'react-native';
import { useUserFeedback } from './useUserFeedback';

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

interface ShowErrorOptions {
  useToast?: boolean;
  useFeedback?: boolean;
  retry?: () => Promise<void> | void;
  retryCount?: number;
}

const useErrorHandling = () => {
  const { showFeedback, showToast } = useUserFeedback();

  const openAppSettings = () => {
    Linking.openSettings().catch(() => {
      Alert.alert(
        'Não foi possível abrir as configurações',
        'Por favor, acesse as configurações do aplicativo manualmente.'
      );
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
      ]
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
      ]
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

  const getErrorConfig = (errorCode: string) => {
    return errorMappings[errorCode] || errorMappings.default;
  };

  const showError = (errorCode: string, error?: Error, options?: {
    useToast?: boolean;
    useFeedback?: boolean;
  }) => {
    const config = getErrorConfig(errorCode);
    const errorMessage = typeof error === 'string' ? error : error?.message;

    // Log detalhado para desenvolvedores
    console.error(`[${errorCode}] ${errorMessage || config.message}`, {
      error,
      troubleshooting: config.troubleshooting
    });

    // Monta os botões de ação
    const buttons = [
      ...(config.actions || []),
      { text: 'Entendi', onPress: () => { } }
    ];

    if (options?.useToast) {
      showToast(config.message, 'error', 3000);
    } else if (options?.useFeedback) {
      showFeedback({
        type: 'error',
        message: 'Ocorreu um erro durante o processamento',
        useAlert: true
      });
    } else {
      // Mostrar alerta padrão
    }

    Alert.alert(
      config.title,
      errorMessage || config.message,
      buttons
    );

    // Para erros mais complexos, mostra um segundo alerta com dicas
    if (config.troubleshooting && config.troubleshooting.length > 0) {
      setTimeout(() => {
        Alert.alert(
          'Como resolver?',
          config.troubleshooting!.join('\n\n• '),
          [{ text: 'OK', onPress: () => { } }]
        );
      }, 500);
    }
  };

  const showCustomError = (title: string, message: string, action?: () => void) => {
    console.error(`[custom_error] ${title}: ${message}`);

    Alert.alert(
      title,
      message,
      [
        {
          text: 'OK',
          onPress: action || (() => { })
        }
      ]
    );
  };

  return {
    showError,
    showCustomError,
    errorMappings,
    getErrorConfig
  };
};

export default useErrorHandling;