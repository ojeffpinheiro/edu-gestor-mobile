import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Animated
} from 'react-native';
import { Lock, Eye, EyeOff, X, Shield } from 'lucide-react-native';
import { styles } from './styles';
import Button from '../common/Button';
import InputField from '../common/InputField';

const AuthForm = ({ setCurrentView, setIsAuthenticated }) => {
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));
  const passwordInputRef = useRef(null);

  const validatePassword = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setCurrentView('scanner');
    } else {
      Alert.alert('Erro', 'Senha incorreta!');
    }
    Keyboard.dismiss();
  };

  useEffect(() => {
    // Animação de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();

    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => passwordInputRef.current?.focus()}
          >
            <Animated.View
              style={[
                styles.card,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              {/* Header com gradiente visual */}
              <View style={styles.header}>
                <View style={styles.iconContainer}>
                  <View style={styles.iconGradient}>
                    <Shield size={28} color="#ffffff" />
                  </View>
                </View>
                <Text style={styles.title}>Bem-vindo de volta</Text>
                <Text style={styles.subtitle}>Digite sua senha para acessar o sistema</Text>
              </View>

              <InputField label='Senha' 
                      placeholder="Digite sua senha" 
                      value={password}
                      onChange={(text) => {
                        setPassword(text);
                        if (passwordInputRef.current) {
                          passwordInputRef.current.focus();
                        }
                      }}
                      secureTextEntry={!showPassword}
                     onToggleVisibility={() => setShowPassword(!showPassword)} />

              {/* Botões com novo design */}
              <View style={styles.buttonSection}>
                <Button
                  title="Entrar"
                  onPress={validatePassword}
                  variant="primary"
                  disabled={password.length === 0}
                  style={[styles.primaryButton, password.length === 0 && styles.disabledButton]}
                  textStyle={styles.buttonText}
                />

                <Button
                  title="Voltar ao início"
                  onPress={() => {
                    setCurrentView('home');
                    Keyboard.dismiss();
                  }}
                  variant="outline"
                  textStyle={styles.secondaryButtonText}
                  style={styles.secondaryButton}
                />
              </View>

              {/* Demo box redesenhada */}
              <View style={styles.demoBox}>
                <View style={styles.demoHeader}>
                  <View style={styles.demoBadge}>
                    <Text style={styles.demoBadgeText}>DEMO</Text>
                  </View>
                </View>
                <Text style={styles.demoText}>
                  Use a senha <Text style={styles.demoPassword}>'admin123'</Text> para testar o sistema
                </Text>
              </View>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AuthForm;