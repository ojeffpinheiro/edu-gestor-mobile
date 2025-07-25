import { Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import Button from "./Button";
import { ChevronLeft } from "lucide-react-native";

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
    <View style={[styles.headerContainer, { backgroundColor: backgroundColor || colors.primary }]}>
      {onBack && (
        <Button
          onPress={onBack}
          variant="ghost"
          icon={<ChevronLeft size={24} color={colors.card} />}
          style={styles.backButton}
        />
      )}
      <View style={styles.headerContent}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={[styles.headerTitle, { color: colors.card }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.headerSubtitle, { color: colors.card + 'CC' }]}>
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
};