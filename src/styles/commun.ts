import { StyleSheet } from "react-native";
import { Spacing, BorderRadius, Typography } from "./designTokens";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: Typography.fontSize.xxxl,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.sm,
    color: '#333',
  },
  subtitle: {
    fontSize: Typography.fontSize.lg,
    color: '#666',
    marginBottom: Spacing.xxl,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: Spacing.md,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xxl,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginVertical: Spacing.xs,
  },
  disabledButton: {
    opacity: 0.6,
  },
  secondaryButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },
});