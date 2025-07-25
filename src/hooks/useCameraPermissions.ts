import { Camera } from "expo-camera";
import { useEffect, useState } from "react";

export const useCameraPermissions = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const requestPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    return status === 'granted';
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return { hasPermission, requestPermission };
};