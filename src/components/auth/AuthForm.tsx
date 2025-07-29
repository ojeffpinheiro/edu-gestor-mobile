import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

import createAuthStyles from './stylesAuth';
import { usePressAnimation } from '../../hooks/usePressAnimation';
import StatusMessage from '../common/StatusMessage';
import { useAuthForm } from '../../hooks/useAuthForm';
import useAuth from '../../hooks/useAuth';

const AuthScreen = ({ setCurrentView }) => {
  const { colors } = useTheme();
  const styles = createAuthStyles(colors);
  const { scaleValue, animatePress } = usePressAnimation();

  const {
    email, password, isLogin, showPassword,
    setEmail, setPassword, setShowPassword,
    toggleAuthMode
  } = useAuth();

  const {
    formErrors,
    isLoading,
    feedback,
    submit,
    validateField,
    handleBlur,
    touchedFields
  } = useAuthForm(setCurrentView, email, password);

  const handleSubmit = () => {
    animatePress();
    submit(email, password, isLogin);
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
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Email
              <Text style={styles.requiredIndicator}>*</Text>
            </Text>
            <View style={[
              styles.inputWrapper,
              (touchedFields.email && formErrors.email) && styles.inputWrapperError
            ]}>
              <TextInput
                style={[
                  styles.input,
                  (touchedFields.email && formErrors.email) && styles.errorInput
                ]}
                placeholder="seu@email.com"
                placeholderTextColor={colors.text.secondary}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (touchedFields.email) {
                    validateField('email', text, isLogin);
                  }
                }}
                onBlur={() => handleBlur('email', email, isLogin)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              {email.length > 0 && (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => {
                    setEmail('');
                    validateField('email', '', isLogin);
                  }}
                >
                  <Text style={styles.clearIcon}>×</Text>
                </TouchableOpacity>
              )}

              {touchedFields.email && formErrors.email && (
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
              <Text style={styles.label}>
                Senha
                <Text style={styles.requiredIndicator}>*</Text>
              </Text>
              <View style={[
                styles.inputWrapper,
                (touchedFields.password && formErrors.password) && styles.inputWrapperError
              ]}>
                <TextInput
                  style={[
                    styles.input,
                    (touchedFields.password && formErrors.password) && styles.errorInput
                  ]}
                  placeholder="••••••••"
                  placeholderTextColor={colors.text.secondary}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (touchedFields.password) {
                      validateField('password', text, isLogin);
                    }
                  }}
                  onBlur={() => handleBlur('password', password, isLogin)}
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
              {touchedFields.password && formErrors.password && (
                <Text style={styles.errorText}>
                  <MaterialIcons
                    name="error-outline"
                    size={14}
                    style={styles.errorIcon}
                  />
                  {formErrors.password}
                </Text>
              )}
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.linkText}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            disabled={isLoading}
            activeOpacity={0.8}
            style={[styles.submitButton, isLoading && styles.disabledButton]}
            onPress={handleSubmit}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.text.onPrimary} />
            ) : (
              <Text style={styles.submitButtonText}>
                {isLogin ? 'Entrar' : 'Cadastrar'}
              </Text>
            )}
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


          {feedback.visible && (
            <StatusMessage
              variant={feedback.type}
              message={feedback.message}
              style={styles.feedbackMessage}
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