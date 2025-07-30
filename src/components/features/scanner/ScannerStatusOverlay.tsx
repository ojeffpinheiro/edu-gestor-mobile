import { Text, View } from "react-native";
import StatusIcon from "../../StatusIcon";
import { useTheme } from "../../../context/ThemeContext";
import { createPermissionRequestCardStyles } from "../../auth/styles";
import { AlertCircle, Check } from "lucide-react-native";

const ScannerStatusOverlay = ({ status, message }) => {
  const { colors } = useTheme();
  const styles = createPermissionRequestCardStyles(colors);
  if (!status) return null;
  
  return (
    <View style={styles.contentContainer}>
      <StatusIcon icon={status === 'success' ? Check : AlertCircle } variant={status} size="lg" />
      <Text>{message}</Text>
    </View>
  );
};

export default ScannerStatusOverlay;