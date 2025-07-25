import React from 'react';
import { View, Text } from 'react-native';
import { BookOpen } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import Card from '../common/Card';
import Button from '../common/Button';
import InfoBox from '../common/InfoBox';
import { createHomeScreenStyles } from './styles';

const HomeScreen = ({ setCurrentView }) => {
  const { colors } = useTheme();
  const styles = createHomeScreenStyles(colors);

  if (!colors) return <Text>Carregando...</Text>;

  return (
    <View style={styles.centeredContainer}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <BookOpen size={32} color={colors.text.onPrimary} />
          </View>
          <Text style={styles.title}>Correção Automatizada</Text>
          <Text style={styles.subtitle}>
            Sistema para correção de provas via scanner
          </Text>
        </View>

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
          size="lg"
          style={styles.button}
        />
      </Card>
    </View>
  );
};

export default HomeScreen;