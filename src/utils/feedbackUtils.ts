import { Alert, AlertButton, Platform, ToastAndroid } from "react-native";
import { FeedbackOptions } from "../types/feedback";

export const getFeedbackConfig = (options: FeedbackOptions) => {
  const {
    type = 'info',
    message,
    duration = 3000,
    position = 'bottom',
    title = '',
    actions = [],
    persistent = false
  } = options;

  return {
    type,
    message,
    duration: persistent ? 0 : duration,
    position,
    title,
    actions
  };
};

export const showPlatformToast = (message: string, duration: number) => {
  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravity(message, duration, ToastAndroid.BOTTOM);
  }
};

export const showPlatformAlert = (title: string, message: string, buttons: AlertButton[] = []) => {
  Alert.alert(title, message, buttons);
};