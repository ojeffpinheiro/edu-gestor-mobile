import { StyleSheet } from 'react-native';
import { ColorScheme } from './colors';

export const createMainStyles = (colors: ColorScheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: colors.background, // Usando a cor do tema
            justifyContent: 'center',
        },
        card: {
            backgroundColor: colors.card, // Usando a cor do tema
            borderRadius: 20,
            padding: 24,
            shadowColor: colors.shadow, // Usando a cor do tema
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.textPrimary, // Usando a cor do tema
            marginBottom: 8,
            textAlign: 'center',
        },
        subtitle: {
            fontSize: 16,
            color: colors.textSecondary, // Usando a cor do tema
            textAlign: 'center',
        },
        primaryButton: {
            backgroundColor: colors.primary,
            paddingVertical: 14,
            paddingHorizontal: 20,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: 12,
        },
        buttonText: {
            color: colors.card, // Cor do texto do botão primário
            fontSize: 16,
            fontWeight: '600',
        },
        // ... outros estilos
    }
);