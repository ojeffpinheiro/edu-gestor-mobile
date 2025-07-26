import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import Button from "./Button";
import { ChevronLeft } from "lucide-react-native";
import { Spacing, Typography } from "../../styles/designTokens";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  backgroundColor?: string;
  onBack?: () => void;
}

const PageHeader = ({ title, subtitle, icon, backgroundColor, onBack }: PageHeaderProps) => {
  const { colors } = useTheme();
  
  return (
    <View style={[
      styles.headerContainer, 
      { 
        backgroundColor: backgroundColor || colors.primary.main,
        padding: Spacing.lg,
        paddingTop: Spacing.xl,
      }
    ]}>
      {onBack && (
        <Button
          onPress={onBack}
          variant="ghost"
          icon={<ChevronLeft size={24} color={colors.text.onPrimary} />}
          style={styles.backButton}
        />
      )}
      <View style={styles.headerContent}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={[styles.headerTitle, { color: colors.text.onPrimary }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[
            styles.headerSubtitle, 
            { color: colors.text.onPrimary + 'CC' }
          ]}>
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    left: Spacing.md,
    top: Spacing.xl,
    zIndex: 1,
  },
  headerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: Spacing.sm,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.md,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
});

export default PageHeader;