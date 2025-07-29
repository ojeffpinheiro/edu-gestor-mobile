import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";

const createAuthStyles = (colors: ColorScheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    logoText: {
        color: colors.text.primary,
        fontSize: 24,
        fontWeight: 'bold',
    },
    welcomeText: {
        color: colors.text.primary,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    brandText: {
        color: colors.primary.main,
    },
    subtitle: {
        color: colors.text.secondary,
        fontSize: 16,
        fontWeight: '600',
    },
    formContainer: {
        backgroundColor: colors.background.secondary,
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: colors.border.light,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.7,
        shadowRadius: 30,
        elevation: 10,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        color: colors.text.primary,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    inputWrapper: {
        position: 'relative',
    },
    input: {
        backgroundColor: colors.component.input,
        borderWidth: 1,
        borderColor: colors.border.medium,
        borderRadius: 10,
        padding: 15,
        paddingRight: 40,
        color: colors.text.primary,
        fontSize: 16,
    },
    clearButton: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -12 }],
        padding: 5,
    },
    clearIcon: {
        color: colors.text.secondary,
        fontSize: 20,
        fontWeight: 'bold',
    },
    eyeButton: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -12 }],
        padding: 0,
    },
    eyeIcon: {
        fontSize: 20,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: 5,
    },
    termsText: {
        color: colors.text.secondary,
        fontSize: 12,
        marginBottom: 15,
    },
    linkText: {
        color: colors.primary.light,
        fontWeight: '500',
    },
    submitButton: {
        backgroundColor: colors.primary.main,
        borderRadius: 12,
        padding: 15,
        alignItems: 'center',
        marginBottom: 15,
    },
    submitButtonText: {
        color: colors.text.onPrimary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    switchAuth: {
        alignItems: 'center',
        marginBottom: 20,
    },
    switchAuthText: {
        color: colors.text.secondary,
    },
    separator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.border.medium,
    },
    separatorText: {
        color: colors.text.secondary,
        fontSize: 14,
        marginHorizontal: 10,
    },
    socialButtonsContainer: {
        gap: 10,
    },
    socialButton: {
        borderWidth: 1,
        borderColor: colors.border.medium,
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
    },
    socialButtonText: {
        color: colors.text.primary,
    },
    footer: {
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: {
        color: colors.text.secondary,
        fontSize: 12,
    },
    footerLinks: {
        flexDirection: 'row',
        marginTop: 5,
        gap: 10,
    },
    footerLink: {
        color: colors.text.secondary,
        fontSize: 12,
    },
    footerSeparator: {
        color: colors.text.secondary,
        fontSize: 12,
    },
    errorInput: {
        borderColor: colors.feedback.error,
        backgroundColor: `${colors.feedback.error}10`, // 10% de opacidade
    },

    errorText: {
        color: colors.feedback.error,
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },

    generalError: {
        marginTop: 16,
        marginBottom: 8,
    },

    // Para o container de input com erro
    inputWrapperError: {
        position: 'relative',
        marginBottom: 4, // Espaço extra para a mensagem de erro
    },
    requiredIndicator: {
        color: colors.feedback.error,
    },
    disabledButton: {
        opacity: 0.7,
    }, feedbackMessage: {
        marginTop: 16,
        marginBottom: 8,
        padding: 12,
        borderRadius: 8,
    },
    errorIcon: {
        marginRight: 8,
        color: colors.feedback.error // Use a cor do seu tema
    },
});

export default createAuthStyles;