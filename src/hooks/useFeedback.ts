import { useState, useCallback } from 'react';
import { FeedbackOptions } from '../types/feedback';

type FeedbackType = {
  visible: boolean;
  options: FeedbackOptions;
}

export const useFeedback = () => {
  const [feedback, setFeedback] = useState<FeedbackType>({ 
    visible: false, 
    options: { 
      type: 'info', 
      message: '', 
      position: 'bottom',
      duration: 3000
    } 
  });

  const showFeedback = useCallback((options: FeedbackOptions) => {
    setFeedback({
      visible: true,
      options: {
        position: 'bottom',
        duration: 3000,
        ...options
      }
    });
  }, []);

  const hideFeedback = useCallback(() => {
    setFeedback(prev => ({ ...prev, visible: false }));
  }, []);

  return { 
    feedback, 
    setFeedback,
    showFeedback, 
    hideFeedback 
  };
};