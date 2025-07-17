import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { CheckCircle, AlertCircle } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { Spacing, BorderRadius } from '../../styles/designTokens';
import { createMainStyles } from '../../styles/mainStyles';

const ProcessingScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createMainStyles(colors);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('processing');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setStatus('completed');
          setTimeout(() => navigation.navigate('Results'), 1500);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {status === 'processing' ? (
          <>
            <View style={localStyles.processingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={[styles.title, { marginTop: Spacing.lg }]}>Processando Scans</Text>
              <Text style={[styles.subtitle, { marginTop: Spacing.sm }]}>
                Analisando marcadores e contabilizando acertos
              </Text>

              <View style={[localStyles.progressContainer, { backgroundColor: colors.gray[200] }]}>
                <View style={[
                  localStyles.progressBar,
                  {
                    width: `${progress}%`,
                    backgroundColor: colors.primary
                  }
                ]} />
                <Text style={[localStyles.progressText, { color: colors.textSecondary }]}>{progress}%</Text>
              </View>
            </View>
          </>
        ) : (
          <View style={localStyles.completeContainer}>
            <CheckCircle size={48} color={colors.success} />
            <Text style={[styles.title, { marginTop: Spacing.lg, color: colors.success }]}>
              Análise Concluída!
            </Text>
            <Text style={[styles.subtitle, { marginTop: Spacing.sm }]}>
              Resultados disponíveis na página de visualização
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};


  const localStyles = StyleSheet.create({
    processingContainer: {
      alignItems: 'center',
      padding: Spacing.xl
    },
    completeContainer: {
      alignItems: 'center',
      padding: Spacing.xl
    },
    progressContainer: {
      width: '100%',
      height: 8,
      borderRadius: BorderRadius.sm,
      marginTop: Spacing.xl,
      overflow: 'hidden'
    },
    progressBar: {
      height: '100%',
      borderRadius: BorderRadius.sm
    },
    progressText: {
      textAlign: 'center',
      marginTop: Spacing.sm,
      fontSize: 14,
      fontWeight: 'bold'
    }
  });

export default ProcessingScreen;
