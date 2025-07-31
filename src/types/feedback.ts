
export type FeedbackType = 'success' | 'error' | 'info' | 'warning';
export type FeedbackPosition = 'top' | 'bottom' | 'center';

export interface FeedbackOptions {
  type: FeedbackType;
  position?: FeedbackPosition;
  duration?: number;
  message: string;
  title?: string;
  useToast?: boolean;
  useFeedback?: boolean;
  persistent: boolean;
  actions?: Array<{
    text: string;
    onPress: () => void;
  }>;
}