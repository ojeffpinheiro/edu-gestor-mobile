import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, ActivityIndicator } from 'react-native';
import { BookOpen } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';

import Card from '../common/Card';
import Button from '../common/Button';
import InfoBox from '../common/InfoBox';
import { createHomeScreenStyles } from '../auth/styles';

const HomeScreen = ({ setCurrentView }) => {
  const { colors } = useTheme();
  const styles = createHomeScreenStyles(colors);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  if (!colors) return <ActivityIndicator size="large" color={colors.primary.main} />

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.centeredContainer, { opacity: fadeAnim }]}>
      <Card style={styles.header}>
        <View style={styles.iconContainer}>
          <BookOpen size={32} color={colors.text.onPrimary} />
        </View>
        <Text style={styles.title}>Correção Automatizada</Text>
        <Text style={styles.subtitle}>
          Sistema para correção de provas via scanner
        </Text>
        <View style={styles.infoBox}>
        <InfoBox
          title="Como funciona:"
          items={[
            'Autentique-se com sua senha',
            'Escaneie o código da prova',
            'Identifique o aluno',
            'Capture a folha de resposta'
          ]}
          variant="primary"
        />
      </View>
      <Button
        title="Iniciar Correção"
        onPress={() => setCurrentView('auth')}
        variant="primary"
        size="xl"
        style={styles.button}
      />
      </Card>
    </Animated.View>
  );
};

export default HomeScreen;