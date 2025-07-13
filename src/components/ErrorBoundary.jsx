import { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Componente melhor para tratamento de erros
const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    return hasError ? (
        <View style={styles.errorContainer}>
            <Text>Algo deu errado. Tente novamente.</Text>
            <TouchableOpacity onPress={() => setHasError(false)}>
                <Text>Tentar Novamente</Text>
            </TouchableOpacity>
        </View>
    ) : children;
};

const styles = StyleSheet.create({
  errorContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ffeeee'
  },
})

// Hook para tratamento de erros
export const useErrorHandler = () => {
    const [erro, setErro] = useState(null);

    const tratarErro = useCallback((error) => {
        let mensagem = 'Erro desconhecido';

        if (error.message.includes('camera')) {
            mensagem = 'Erro na câmera. Verifique as permissões.';
        } else if (error.message.includes('storage')) {
            mensagem = 'Espaço insuficiente no dispositivo.';
        } else if (error.message.includes('network')) {
            mensagem = 'Sem conexão com a internet.';
        }

        setErro({ tipo: error.type, mensagem });
    }, []);

    return { erro, tratarErro, limparErro: () => setErro(null) };
};

export default ErrorBoundary;