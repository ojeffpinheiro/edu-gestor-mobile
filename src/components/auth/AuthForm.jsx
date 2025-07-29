import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '../../context/ThemeContext';

import useAuth from '../../hooks/useAuth';

import createAuthStyles from './stylesAuth';

const AuthScreen = ({ setCurrentView }) => {
  const { colors } = useTheme();
  const {
    email, password, isLogin, showPassword,
    setEmail, setPassword, setShowPassword,
    toggleAuthMode
  } = useAuth();

  const styles = createAuthStyles(colors);

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    general: ''
  });

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!email) {
      errors.email = 'Email é obrigatório';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Por favor, insira um email válido';
      isValid = false;
    }

    if (isLogin && !password) {
      errors.password = 'Senha é obrigatória';
      isValid = false;
    } else if (isLogin && password.length < 6) {
      errors.password = 'Senha deve ter pelo menos 6 caracteres';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };


  const handleSubmit = async (setCurrentView) => {
    if (!validateForm()) return;

    try {
      if (isLogin) {
        // Chamada API para login
        setCurrentView('scanner');
        showSuccess('Login bem-sucedido!');
      } else {
        // Chamada API para cadastro
        showSuccess('Cadastro realizado com sucesso!');
      }
    } catch (error) {
      setFormErrors({
        ...formErrors,
        general: error.message || 'Ocorreu um erro. Tente novamente.'
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            {/* Replace with your actual logo */}
            <Text style={styles.logoText}>TECHNO</Text>
          </View>
          <Text style={styles.welcomeText}>
            Welcome to <Text style={styles.brandText}>TECHNO</Text>
          </Text>
          <Text style={styles.subtitle}>
            {isLogin ? 'Login to Techno' : 'Get started for Free'}
          </Text>
        </View>

        <View style={styles.formContainer}>
          {!isLogin && (
            <Text style={styles.termsText}>
              By clicking any of the Sign Up buttons, you agree to the{' '}
              <Text style={styles.linkText}>terms of service</Text>.
            </Text>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <View style={[styles.inputWrapper, formErrors.email && styles.inputWrapperError]}>
              <TextInput
                style={[
                  styles.input,
                  formErrors.email && styles.errorInput
                ]}
                placeholder="yourname@email.com"
                placeholderTextColor={colors.text.secondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              {email.length > 0 && (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => setEmail('')}
                >
                  <Text style={styles.clearIcon}>×</Text>
                </TouchableOpacity>
              )}

              {formErrors.email && (
                <Text style={styles.errorText}>
                  <MaterialIcons
                    name="error-outline"
                    size={14}
                    style={styles.errorIcon}
                  />
                  {formErrors.email}
                </Text>
              )}
            </View>
          </View>

          {isLogin && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={colors.text.secondary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <MaterialCommunityIcons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={24}
                    color={colors.text.secondary}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit(setCurrentView)}>
            <Text style={styles.submitButtonText}>
              {isLogin ? 'Login' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleAuthMode} style={styles.switchAuth}>
            <Text style={styles.switchAuthText}>
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <Text style={styles.linkText}>
                {isLogin ? 'Sign Up' : 'Login'}
              </Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.separator}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>or</Text>
            <View style={styles.separatorLine} />
          </View>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>
                {isLogin ? 'Login' : 'Sign Up'} with Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>
                {isLogin ? 'Login' : 'Sign Up'} with GitHub
              </Text>
            </TouchableOpacity>
            {!isLogin && (
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Sign Up with Microsoft</Text>
              </TouchableOpacity>
            )}
          </View>

          {formErrors.general && (
            <StatusMessage
              variant="error"
              message={formErrors.general}
              style={styles.generalError}
            />
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 TECHNO</Text>
          <View style={styles.footerLinks}>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Terms & Conditions</Text>
            </TouchableOpacity>
            <Text style={styles.footerSeparator}>|</Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </TouchableOpacity>
            <Text style={styles.footerSeparator}>|</Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Legal Notice</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;