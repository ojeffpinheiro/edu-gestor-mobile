import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import Button from "./Button";
import { ColorScheme } from "../../styles/colors";

interface EmptyStateProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    action?: {
        label: string;
        onPress: () => void;
    };
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => {
    const { colors } = useTheme();
    const styles = createEmptyStateStyles( colors )

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>{icon}</View>
            <Text style={[styles.title, { color: colors.text.primary }]}>{title}</Text>
            <Text style={[styles.description, { color: colors.text.secondary }]}>{description}</Text>
            {action && (
                <Button
                    title={action.label}
                    onPress={action.onPress}
                    variant="primary"
                />
            )}
        </View>
    );
};

const createEmptyStateStyles = (colors: ColorScheme) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    iconContainer: {
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 24,
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 24,
    },
});

export default EmptyState;