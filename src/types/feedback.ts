
export type FeedbackType = 'success' | 'error' | 'info' | 'warning' |  'light' | 'medium' | 'heavy';
export type FeedbackPosition = 'top' | 'bottom' | 'center';

export interface FeedbackOptions {
  type: FeedbackType;
  message: string;
  duration?: number;
  position?: FeedbackPosition;
  useToast?: boolean;
  useAlert?: boolean;
  haptic?: boolean;
  title?: string;
  actions?: {
    text: string;
    onPress: () => void;
    style?: 'primary' | 'secondary';
  }[];
  useFeedback?: boolean;
  persistent: boolean;
}