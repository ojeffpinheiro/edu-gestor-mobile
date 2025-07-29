import { useState } from 'react';

export const useFeedback = () => {
  const [feedback, setFeedback] = useState<{
    visible: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({ visible: false, message: '', type: 'info' });
  
  const showFeedback = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setFeedback({ visible: true, message, type });
    setTimeout(() => setFeedback({ ...feedback, visible: false }), 3000);
  };
  
  return { feedback, showFeedback };
};