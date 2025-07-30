import { ActivityIndicator, Text, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { createContainerStyles } from "../../../styles/globalStyles";

const LoadingView = () => {
  const { colors } = useTheme();
  const containers = createContainerStyles(colors);

  return (
    <View style={containers.fullScreenOverlay}>
      <ActivityIndicator size="large" color={colors.primary.main} />
      <Text>Solicitando permissão...</Text>
    </View>
  );
};