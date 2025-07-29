import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Spacing } from "../styles/designTokens";
import { ColorScheme } from "../styles/colors";

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible, message }) => {
  const { colors } = useTheme();
  const styles = createLoadingOverlayStyles(colors);

  if (!visible) return null;

  return (
    <View style={[styles.loadingOverlay, { backgroundColor: colors.background.overlay.main }]}>
      <ActivityIndicator size="large" color={colors.primary.main} />
      {message && <Text style={[styles.message, { color: colors.text.onPrimary }]}>{message}</Text>}
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
  message: {
    marginTop: 16,
    fontSize: 16,
  },
  loadingText: {
    marginTop: Spacing.md,
    color: colors.text.onPrimary,
  },
});

export default LoadingOverlay;