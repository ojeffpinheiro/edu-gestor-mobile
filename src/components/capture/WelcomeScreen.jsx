import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ArrowRight, CheckCircle, ScanLine, TrendingUp } from 'lucide-react-native';
import { createMainStyles } from '../../styles/mainStyles';
import { useTheme } from '../../context/ThemeContext';
import { Spacing, BorderRadius } from '../../styles/designTokens';

const WelcomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createMainStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={localStyles.content}>
          <Image
            source={{ uri: 'https://placehold.co/300x200/3b82f6/FFF?text=AutoCorreção' }}
            style={localStyles.heroImage}
          />
          
          <Text style={styles.title}>Bem-vindo ao Sistema de Correção Automatizada</Text>
          <Text style={[styles.subtitle, { marginTop: Spacing.sm }]}>
            Simplifique o processo de correção de provas com nossa tecnologia de escaneamento inteligente
          </Text>
          
          <View style={localStyles.features}>
            <View style={localStyles.featureItem}>
              <View style={[localStyles.featureIcon, { backgroundColor: colors.primary + '20' }]}>
                <ScanLine size={20} color={colors.primary} />
              </View>
              <Text style={[localStyles.featureText, { color: colors.textPrimary } ]}>
                Escaneamento rápido e preciso
              </Text>
            </View>
            
            <View style={localStyles.featureItem}>
              <View style={[localStyles.featureIcon, { backgroundColor: colors.primary + '20' }]}>
                <CheckCircle size={20} color={colors.primary} />
              </View>
              <Text style={[localStyles.featureText, { color: colors.textPrimary } ]}>
                Resultados instantâneos
              </Text>
            </View>
            
            <View style={localStyles.featureItem}>
              <View style={[localStyles.featureIcon, { backgroundColor: colors.primary + '20' }]}>
                <TrendingUp size={20} color={colors.primary} />
              </View>
              <Text style={[localStyles.featureText, { color: colors.textPrimary } ]}>
                Relatórios detalhados
              </Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Auth')}
        >
          <Text style={styles.buttonText}>Começar Agora</Text>
          <ArrowRight size={20} color={colors.card} style={{ marginLeft: Spacing.sm }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: Spacing.xl
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xl
  },
  features: {
    width: '100%',
    marginTop: Spacing.xl
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm
  },
  featureText: {
    fontSize: 16,
    flex: 1
  }
});

export default WelcomeScreen;
