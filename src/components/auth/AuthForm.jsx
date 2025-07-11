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
  Keyboard
} from 'react-native';
import { Lock, Eye, EyeOff, X } from 'lucide-react-native';
import { styles } from './styles';

const AuthForm = ({ setCurrentView, setIsAuthenticated }) => {
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const passwordInputRef = useRef(null);

  const validatePassword = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setCurrentView('scanner');
    } else {
      Alert.alert('Erro', 'Senha incorreta!');
    }
    Keyboard.dismiss(); // Esconde o teclado após validação
  };

  useEffect(() => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [password]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <Lock size={24} color="#2563eb" />
              </View>
              <Text style={styles.title}>Autenticação</Text>
              <Text style={styles.subtitle}>Digite sua senha para acessar o sistem</Text>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Digite sua senha"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  // Força o foco a permanecer no input após cada alteração
                  if (passwordInputRef.current) {
                    passwordInputRef.current.focus();
                  }
                }}
                ref={passwordInputRef}
                autoFocus={true}

                onFocus={() => setIsTyping(true)}
                onBlur={() => {
                  setIsTyping(false);
                  if (passwordInputRef.current) {
                    passwordInputRef.current.focus();
                  }
                }}
                style={[
                  styles.input,
                  isTyping && { borderColor: '#2563eb' }
                ]}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => {
                  setShowPassword(!showPassword);
                  passwordInputRef.current.focus();
                }}
              >
                {showPassword ? <EyeOff size={20} color="#6b7280" /> : <Eye size={20} color="#6b7280" />}
              </TouchableOpacity>
              {password.length > 0 && (
                <TouchableOpacity
                  style={[styles.eyeIcon, { right: 48 }]}
                  onPress={() => {
                    setPassword('');
                    passwordInputRef.current.focus();
                  }}
                >
                  <X size={20} color="#6b7280" />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={validatePassword}
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
              <Text style={styles.secondaryButtonText}>Voltar</Text>
            </TouchableOpacity>

            <View style={styles.demoBox}>
              <Text style={styles.demoText}>
                <Text style={{ fontWeight: 'bold' }}>Demo:</Text> Use a senha "admin123" para testar
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AuthForm;