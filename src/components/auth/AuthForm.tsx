import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import createAuthStyles from './authStyles';
import { useAuthForm } from '../../hooks/useAuthForm';
import Feedback from '../common/Feedback';
import { useUserFeedback } from '../../hooks/useUserFeedback';

const AuthForm = ({ setCurrentView }) => {
  const { colors } = useTheme();
  const styles = createAuthStyles(colors);

  const { showFeedback, feedbackConfig, hideFeedback } = useUserFeedback();

  const {
    mode, formState, errors, touched, isLoading, passwordErrors,
    rememberUser, toggleRememberUser, toggleAuthMode, handleChange,
    handleBlur, handleSubmit, toggleShowPassword
  } = useAuthForm();

  const handleFormSubmit = async () => {
    try {
      const success = await handleSubmit();
      if (success && mode === 'login') {
        // Feedback com título e fechamento automático
        showFeedback({
          type: 'success',
          title: 'Bem-vindo!',
          message: 'Login realizado com sucesso',
          duration: 2000,
          haptic: true
        });
        setTimeout(() => setCurrentView('scanner'), 1500);
      } else if (success && mode === 'register') {
        // Feedback persistente que requer ação do usuário
        showFeedback({
          type: 'success',
          title: 'Cadastro concluído!',
          message: 'Sua conta foi criada com sucesso. Deseja fazer login agora?',
          persistent: true,
          actions: [
            {
              text: 'Fazer login',
              onPress: () => {
                toggleAuthMode();
                hideFeedback();
              },
              style: 'primary'
            },
            {
              text: 'Mais tarde',
              onPress: hideFeedback,
              style: 'secondary'
            }
          ]
        });
      }
    } catch (error) {
      // Feedback de erro com ações
      showFeedback({
        type: 'error',
        title: 'Erro',
        message: error.message || 'Ocorreu um erro durante a autenticação',
        actions: [
          {
            text: 'Entendi',
            onPress: hideFeedback,
            style: 'primary'
          },
          {
            text: 'Ajuda',
            onPress: () => {
              // Navegar para tela de ajuda
              hideFeedback();
              setCurrentView('help');
            },
            style: 'secondary'
          }
        ]
      });
    }
  };

  const handleTestCredentials = () => {
    handleChange('email', 'usuario@teste.com');
    handleChange('password', 'Senha123');

    // Feedback informativo com toque para fechar
    showFeedback({
      type: 'info',
      message: 'Dados de teste preenchidos. Toque para fechar.',
      position: 'top',
      duration: 0, // Persistente até o usuário tocar
      haptic: true
    });
  };

  const handleForgotPassword = () => {
    // Feedback com ação única
    showFeedback({
      type: 'warning',
      title: 'Esqueceu sua senha?',
      message: 'Deseja redefinir sua senha agora?',
      actions: [
        {
          text: 'Redefinir',
          onPress: () => {
            hideFeedback();
            setCurrentView('resetPassword');
          },
          style: 'primary'
        }
      ],
      persistent: true
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Feedback
          visible={feedbackConfig.visible}
          options={feedbackConfig.options}
          onHide={hideFeedback}
        />
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
                  onPress={() => {
                    handleChange('email', '');
                    // Feedback rápido ao limpar campo
                    showFeedback({
                      type: 'info',
                      message: 'Campo limpo',
                      duration: 1000,
                      position: 'top'
                    });
                  }}
                >
                  <Ionicons name="close-circle" size={20} color={colors.text.secondary} />
                </TouchableOpacity>
              ) : null}
            </View>
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
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
            <View style={styles.rememberContainer}>
              <TouchableOpacity onPress={toggleRememberUser} style={styles.rememberCheckbox}>
                <Ionicons
                  name={rememberUser ? "checkbox-outline" : "square-outline"}
                  size={24}
                  color={colors.primary.main}
                />
                <Text style={styles.rememberText}>Lembrar do meu e-mail</Text>
              </TouchableOpacity>
            </View>

            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {/* Link para esqueci a senha */}
            {mode === 'login' && (
              <TouchableOpacity
                style={styles.forgotPassword}
                onPress={handleForgotPassword}
              >
                <Text style={styles.linkText}>Esqueceu sua senha?</Text>
              </TouchableOpacity>
            )}

            {mode === 'register' && (
              <View style={styles.passwordStrengthContainer}>
                {[1, 2, 3].map((i) => (
                  <View
                    key={i}
                    style={[
                      styles.strengthBar,
                      passwordErrors.length <= i && styles.strengthBarActive
                    ]}
                  />
                ))}
              </View>
            )}

            <TouchableOpacity
              style={styles.testButton}
              onPress={handleTestCredentials}
            >
              <Text style={styles.testButtonText}>Preencher dados de teste</Text>
            </TouchableOpacity>

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

export default AuthForm;