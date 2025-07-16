import { StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useResponsiveStyles } from "../../hooks/useResponsiveStyles";
import { Spacing } from "../../styles/designTokens";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  questionContainer: {
    marginBottom: 10
  },
  questionText: {
    fontSize: 16
  },
  warningText: {
    color: 'orange'
  },
  errorContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ffeeee'
  },
  errorTitle: {
    fontWeight: 'bold',
    color: 'red'
  },
  errorText: {
    color: 'red'
  }
});

export default styles;

export const useResultsScreenStyles = () => {
  const { colors } = useTheme();
  const { isTablet } = useResponsiveStyles();

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: isTablet ? Spacing.xl : Spacing.md,
    },
    title: {
      fontWeight: 'bold',
      color: colors.textPrimary,
      marginBottom: Spacing.lg,
    },
    gridContainer: {
      flexDirection: isTablet ? 'row' : 'column',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    card: {
      width: isTablet ? '48%' : '100%',
      marginBottom: Spacing.md,
    },
  });
};