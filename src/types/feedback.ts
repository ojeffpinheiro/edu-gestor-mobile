
export type FeedbackType = 'success' | 'error' | 'info' | 'warning';

export interface FeedbackOptions {
  duration?: number;
  useToast?: boolean;
  useFeedback?: boolean;
  actions?: Array<{
    text: string;
    onPress: () => void;
  }>;
}