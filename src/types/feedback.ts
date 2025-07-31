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
  message?: string;
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

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type LogEntry = {
  level: LogLevel
  message: string;
  metadata?: any;
};

export interface ErrorMapping {
    [key: string]: ErrorConfig;
}

export interface LoggerConfig {
    level: LogLevel;
    debug: (...args: any[]) => void;
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
}

export interface ErrorAction {
  alertStyle?: 'default' | 'cancel' | 'destructive';
  feedbackStyle?: 'primary' | 'secondary';
  text: string;
  onPress: () => void;
}

export interface ErrorConfig {
  title: string;
  message: string;
  actions?: ErrorAction[];
  troubleshooting?: string[];
  logLevel?: LogLevel;
  feedbackType?: FeedbackType;
  haptic?: boolean;
}

export interface ShowErrorOptions {
  method?: 'auto' | 'toast' | 'alert' | 'feedback';
  retry?: () => Promise<void> | void;
  retryCount?: number;
  currentRetry?: number;
  logLevel?: LogLevel;
  haptic?: boolean;
  duration?: number;
  persistent?: boolean;
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
  | 'settings_open_failed'
  | string;

