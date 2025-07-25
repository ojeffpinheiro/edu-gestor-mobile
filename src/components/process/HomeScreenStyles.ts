import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { Spacing, BorderRadius, Typography } from "../../styles/designTokens";

export const createHomeScreenStyles = (colors: ColorScheme) => StyleSheet.create({
  container: {
    padding: Spacing.lg,
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    color: colors.textPrimary,
  },
  examInfo: {
    backgroundColor: colors.gray[100],
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
  },
  examTitle: {
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.xs,
    color: colors.textPrimary,
  },
  captureArea: {
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: BorderRadius.md,
    padding: Spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  selectButton: {
    backgroundColor: colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  selectButtonText: {
    color: colors.card,
    fontWeight: Typography.fontWeight.medium,
  },
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  examInfo: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  examTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  captureArea: {
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  selectButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  selectButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  imageContainer: {
    alignItems: 'center',
    gap: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  processingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  processingText: {
    color: '#2563eb',
  },
  successIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resultsCard: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  resultsTitle: {
    fontWeight: '600',
    color: '#2563eb',
  },
  resultsContent: {
    gap: 12,
    marginBottom: 16,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultValue: {
    fontWeight: '500',
  },
  successText: {
    color: '#16a34a',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#dc2626',
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  saveButton: {
    backgroundColor: '#16a34a',
  },
  detailsButton: {
    backgroundColor: '#4b5563',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  examText: {
    color: '#6b7280',
    fontSize: 14,
  },
  emptyCapture: {
    alignItems: 'center',
    gap: 16,
  },
  captureText: {
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default styles;