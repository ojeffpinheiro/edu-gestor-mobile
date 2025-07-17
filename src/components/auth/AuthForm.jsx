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

              {/* Container do input com animação */}
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Senha</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                    <Lock size={20} color="#6b7280" style={styles.inputIcon} />
                    <TextInput
                      placeholder="Digite sua senha"
                      placeholderTextColor="#9ca3af"
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);
                        if (passwordInputRef.current) {
                          passwordInputRef.current.focus();
                        }
                      }}
                      ref={passwordInputRef}
                      onFocus={() => setIsTyping(true)}
                      onBlur={() => setIsTyping(false)}
                      style={[
                        styles.input,
                        isTyping && styles.inputFocused
                      ]}
                    />
                    <View style={styles.inputActions}>
                      {password.length > 0 && (
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => {
                            setPassword('');
                            passwordInputRef.current.focus();
                          }}
                        >
                          <X size={18} color="#9ca3af" />
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => {
                          setShowPassword(!showPassword);
                          passwordInputRef.current.focus();
                        }}
                      >
                        {showPassword ?
                          <EyeOff size={18} color="#9ca3af" /> :
                          <Eye size={18} color="#9ca3af" />
                        }
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              {/* Botões com novo design */}
              <View style={styles.buttonSection}>
                <TouchableOpacity
                  style={[
                    styles.primaryButton,
                    password.length === 0 && styles.disabledButton
                  ]}
                  onPress={validatePassword}
                  disabled={password.length === 0}
                >
                  <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => {
                    setCurrentView('home');
                    Keyboard.dismiss();
                  }}
                >
                  <Text style={styles.secondaryButtonText}>Voltar ao início</Text>
                </TouchableOpacity>
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