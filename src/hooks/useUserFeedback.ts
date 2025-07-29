// useUserFeedback.ts
import { FeedbackType, FeedbackOptions } from '../types/feedback';
import useErrorHandling from './useErrorHandling';
import { useFeedback } from './useFeedback';
import { useToast } from './useToast';

export const useUserFeedback = () => {
  const errorHandling = useErrorHandling();
  const { showFeedback } = useFeedback();
  const { showToast } = useToast();

  const showMessage = (
    type: FeedbackType,
    message: string,
    options?: FeedbackOptions
  ) => {
    // Lógica para decidir qual mecanismo usar
    if (options?.useToast) {
      showToast({ type, message, duration: options?.duration });
    } else if (options?.useFeedback) {
      showFeedback(message, type);
    } else {
      // Default behavior
      if (type === 'error') {
        errorHandling.showCustomError('Atenção', message);
      } else {
        showToast({ type, message, duration: options?.duration });
      }
    }
  };

  return {
    ...errorHandling,
    showFeedback,
    showToast,
    showMessage,
  };
};