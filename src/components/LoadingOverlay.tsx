import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Spacing } from "../styles/designTokens";
import { ColorScheme } from "../styles/colors";

const LoadingOverlay = () => {
  const { colors } = useTheme();
  const styles = createLoadingOverlayStyles(colors);
  return (
    <View style={styles.loadingOverlay}>
      <ActivityIndicator size="large" color={colors.primary.main} />
      <Text style={styles.loadingText}>Processando...</Text>
    </View>
  );
};

const createLoadingOverlayStyles = (colors: ColorScheme) => StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: Spacing.md,
    color: colors.text.onPrimary,
  },
});

export default LoadingOverlay;