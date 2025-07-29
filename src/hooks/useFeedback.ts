import { useState } from 'react';
import { FeedbackType } from '../types/feedback';

export const useFeedback = () => {
  const [feedback, setFeedback] = useState<{
    visible: boolean;
    message: string;
    type: FeedbackType;
  }>({ visible: false, message: '', type: 'info' });
  
  const showFeedback = (message: string, type: FeedbackType = 'info') => {
    setFeedback({ visible: true, message, type });
    setTimeout(() => setFeedback(prev => ({ ...prev, visible: false })), 3000);
  };
  
  return { feedback, showFeedback };
};