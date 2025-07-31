import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null,
      componentStack: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Captura informações detalhadas do erro
    this.setState({ 
      errorInfo,
      componentStack: errorInfo.componentStack 
    });
    
    // Você pode também registrar o erro em um serviço de monitoramento aqui
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null,
      componentStack: null
    });
    
    // Chama o callback de reset se fornecido
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleReportError = async () => {
    const { error, errorInfo } = this.state;
    const { appName = 'App' } = this.props;
    
    try {
      const isAvailable = await MailComposer.isAvailableAsync();
      
      if (isAvailable) {
        await MailComposer.composeAsync({
          recipients: ['suporte@empresa.com'],
          subject: `[${appName}] Erro reportado`,
          body: `Descreva o que você estava fazendo quando o erro ocorreu:\n\n` +
                `---\n` +
                `Detalhes técnicos:\n` +
                `Error: ${error?.toString()}\n` +
                `Stack: ${errorInfo?.componentStack}\n` +
                `Platform: ${Platform.OS} ${Platform.Version}\n` +
                `---`
        });
      } else {
        Linking.openURL(`mailto:suporte@empresa.com?subject=[${appName}] Erro reportado&body=${encodeURIComponent(
          `Descreva o problema:\n\n` +
          `Error: ${error?.toString()}\n` +
          `Platform: ${Platform.OS} ${Platform.Version}`
        )}`);
      }
    } catch (mailError) {
      console.error('Failed to send error report:', mailError);
      Alert.alert(
        'Não foi possível abrir o cliente de e-mail',
        'Por favor, envie um e-mail para suporte@empresa.com com os detalhes do erro.'
      );
    }
  };

  renderErrorDetails() {
    if (!__DEV__) return null;
    
    return (
      <View style={styles.errorDetails}>
        <Text style={styles.errorText}>
          {this.state.error?.toString()}
        </Text>
        <Text style={styles.stackText}>
          {this.state.componentStack}
        </Text>
      </View>
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <View style={styles.errorContainer}>
            <Ionicons name="warning" size={50} color="#d9534f" />
            <Text style={styles.title}>Algo deu errado</Text>
            <Text style={styles.message}>
              {this.props.fallbackText || 'Ocorreu um erro inesperado. Por favor, tente novamente.'}
            </Text>
            
            {this.renderErrorDetails()}
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.primaryButton]}
                onPress={this.handleReset}
              >
                <Text style={styles.buttonText}>Tentar novamente</Text>
              </TouchableOpacity>
              
              {this.props.showReportButton && (
                <TouchableOpacity 
                  style={[styles.button, styles.secondaryButton]}
                  onPress={this.handleReportError}
                >
                  <Text style={styles.buttonText}>Reportar erro</Text>
                </TouchableOpacity>
              )}
              
              {this.props.customActions?.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.button, action.primary ? styles.primaryButton : styles.secondaryButton]}
                  onPress={action.onPress}
                >
                  <Text style={styles.buttonText}>{action.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa'
  },
  errorContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333'
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666'
  },
  buttonContainer: {
    width: '100%',
    marginTop: 15
  },
  button: {
    padding: 12,
    borderRadius: 6,
    marginVertical: 5,
    alignItems: 'center'
  },
  primaryButton: {
    backgroundColor: '#5bc0de'
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600'
  },
  errorDetails: {
    width: '100%',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f8d7da',
    borderRadius: 5,
    maxHeight: 200
  },
  errorText: {
    color: '#721c24',
    fontSize: 14,
    marginBottom: 5
  },
  stackText: {
    color: '#721c24',
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace'
  }
});

export default ErrorBoundary;