import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import createAuthStyles from './authStyles';
import { useAuthForm } from '../../hooks/useAuthForm';

const AuthScreen = ({ setCurrentView }) => {
  const { colors } = useTheme();
  const styles = createAuthStyles(colors);

  const {
    mode, formState, errors, passwordErrors, touched, isLoading,
    toggleAuthMode, handleChange, handleBlur, handleSubmit, toggleShowPassword
  } = useAuthForm();

  const handleFormSubmit = async () => {
    const success = await handleSubmit();
    if (success && mode === 'login') {
      setCurrentView('scanner');
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
            <Text style={styles.logoText}>TECHNO</Text>
          </View>
          <Text style={styles.welcomeText}>
            Welcome to <Text style={styles.brandText}>TECHNO</Text>
          </Text>
          <Text style={styles.subtitle}>
            {mode === 'login' ? 'Login to Techno' : 'Get started for Free'}
          </Text>
        </View>

        <View style={styles.formContainer}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  touched.email && errors.email && styles.errorInput,
                  formState.email ? styles.inputWithClear : null
                ]}
                value={formState.email}
                onChangeText={(text) => handleChange('email', text)}
                onBlur={() => handleBlur('email')}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Digite seu e-mail"
                placeholderTextColor={colors.text.secondary}
              />
              {formState.email ? (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => handleChange('email', '')}
                >
                  <Ionicons name="close-circle" size={20} color={colors.text.secondary} />
                </TouchableOpacity>
              ) : null}
            </View>
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          {/* Password Input */}<View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.passwordInput,
                  touched.password && errors.password && styles.errorInput
                ]}
                value={formState.password}
                onChangeText={(text) => handleChange('password', text)}
                onBlur={() => handleBlur('password')}
                secureTextEntry={!formState.showPassword}
                placeholder="Digite sua senha"
                placeholderTextColor={colors.text.secondary}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={toggleShowPassword}
              >
                <MaterialIcons
                  name={formState.showPassword ? 'visibility-off' : 'visibility'}
                  size={24}
                  color={colors.text.secondary}
                />
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {/* Mostrar todos os erros de senha durante o cadastro */}
            {mode === 'register' && passwordErrors.length > 0 && (
              <View style={styles.passwordRequirements}>
                {passwordErrors.map((error, index) => (
                  <Text key={index} style={styles.passwordErrorText}>
                    • {error}
                  </Text>
                ))}
              </View>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.button, (isLoading || !formState.email || !formState.password) && styles.buttonDisabled]}
            onPress={handleFormSubmit}
            disabled={isLoading || !formState.email || !formState.password}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.text.onPrimary} />
            ) : (
              <Text style={styles.buttonText}>
                {mode === 'login' ? 'Entrar' : 'Cadastrar'}
              </Text>
            )}
          </TouchableOpacity>

          {/* Toggle Auth Mode */}
          <TouchableOpacity onPress={toggleAuthMode}>
            <Text style={styles.toggleText}>
              {mode === 'login'
                ? 'Não tem uma conta? Cadastre-se'
                : 'Já tem uma conta? Faça login'}
            </Text>
          </TouchableOpacity>

          {/* Error Message */}
          {errors.general && (
            <Text style={styles.generalErrorText}>{errors.general}</Text>
          )}

          {/* Social Login Options */}
          <View style={styles.separator}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>ou</Text>
            <View style={styles.separatorLine} />
          </View>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>
                {mode === 'login' ? 'Entrar' : 'Cadastrar'} com Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>
                {mode === 'login' ? 'Entrar' : 'Cadastrar'} com GitHub
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 TECHNO</Text>
          <View style={styles.footerLinks}>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Termos</Text>
            </TouchableOpacity>
            <Text style={styles.footerSeparator}>|</Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Privacidade</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;