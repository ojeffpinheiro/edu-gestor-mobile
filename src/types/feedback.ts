
export type FeedbackType = 'success' | 'error' | 'info' | 'warning';
export type FeedbackPosition = 'top' | 'bottom' | 'center';

export interface FeedbackOptions {
  duration?: number;
  useToast?: boolean;
  useFeedback?: boolean;
  actions?: Array<{
    text: string;
    onPress: () => void;
  }>;
}

export interface FeedbackOptions {
  type: FeedbackType;
  position?: FeedbackPosition;
  duration?: number;
  title?: string;
  message: string;
}