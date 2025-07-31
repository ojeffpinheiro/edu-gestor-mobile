
export type FeedbackType = 'success' | 'error' | 'info' | 'warning' | 'light' | 'medium' | 'heavy';
export type FeedbackPosition = 'top' | 'bottom' | 'center';

export interface FeedbackAction {
  text: string;
  onPress: () => void;
  style?: 'primary' | 'secondary';
  accessibilityHint?: string;
}

interface FeedbackIconProps {
  color: string;
  size: number;
  style?: any;
}

interface FeedbackContentProps {
  type: FeedbackType;
  title?: string;
  message?: string;
  color: string;
}

export interface FeedbackOptions {
  type: FeedbackType;
  position?: FeedbackPosition;
  duration?: number;
  title?: string;
  message?: string; // Tornado opcional para permitir conteúdo customizado
  actions?: FeedbackAction[];
  accessibilityLabel?: string;
  // Customização de ícones
  icon?: React.ComponentType<FeedbackIconProps> | null;
  iconProps?: Omit<FeedbackIconProps, 'color' | 'size'>;
  // Conteúdo customizado
  content?: React.ComponentType<FeedbackContentProps>;
  contentProps?: Record<string, any>;
  // Posicionamento customizado
  offset?: number;
  horizontalOffset?: number;
  avoidKeyboard?: boolean;
  keyboardOffset?: number;
  useToast?: boolean;
  useAlert?: boolean;
  haptic?: boolean;
  useFeedback?: boolean;
  persistent: boolean;
}