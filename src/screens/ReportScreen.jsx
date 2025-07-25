import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/commun';
import Button from '../components/common/Button';

const ReportScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório</Text>
      <Text style={styles.subtitle}>Resultados da correção</Text>
      
      <Button
        title="Voltar ao Início"
        onPress={() => navigation.navigate('Home')}
        variant="primary"
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

export default ReportScreen;