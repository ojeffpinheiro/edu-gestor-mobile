import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Animated
} from 'react-native';
import { Shield } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { createAuthFormStyles as createStyles } from './styles';
import InputField from '../common/InputField';
import Button from '../common/Button';
import { Spacing } from '../../styles/designTokens';

const AuthForm = ({ setCurrentView, setIsAuthenticated }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
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
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => passwordInputRef.current?.focus()}
          style={styles.container}
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
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <LinearGradient
                  colors={[colors.primary.main, colors.primary.dark]}
                  style={styles.iconGradient}
                >
                  <Shield size={28} color={colors.text.onPrimary} />
                </LinearGradient>
              </View>
              <Text style={styles.title}>Bem-vindo de volta</Text>
              <Text style={styles.subtitle}>Digite sua senha para acessar o sistema</Text>
            </View>

            <View style={{ marginBottom: Spacing.xxl }}>
              <InputField
                label='Senha'
                placeholder="Digite sua senha"
                value={password}
                onChange={(text) => {
                  setPassword(text);
                  if (passwordInputRef.current) {
                    passwordInputRef.current.focus();
                  }
                }}
                secureTextEntry={!showPassword}
                onToggleVisibility={() => setShowPassword(!showPassword)}
                colors={colors}
              />
            </View>

            <View style={styles.buttonSection}>
              <Button
                title="Entrar"
                onPress={validatePassword}
                variant="primary"
                size="lg"
                disabled={password.length === 0}
                style={{ marginBottom: Spacing.md }}
                fullWidth
              />


              <Button
                title="Voltar ao início"
                onPress={() => {
                  setCurrentView('home');
                  Keyboard.dismiss();
                }}
                variant="outline"
                size="lg"
                fullWidth
              />
            </View>

            <View style={{ marginTop: Spacing.xxl }}>
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
            </View>
          </Animated.View>
        </TouchableOpacity>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AuthForm;