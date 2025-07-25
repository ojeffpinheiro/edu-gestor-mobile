import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from '../styles/commun';
import Button from '../components/common/Button';
import SectionHeader from '../components/common/SectionHeader';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <SectionHeader
        title="Bem-vindo ao App"
        subtitle="Aqui estão suas opções"
        onBack={() => console.log('Voltar')}
      />

      <ScrollView contentContainerStyle={styles.buttonContainer}>
        <Button
          title="Autenticação"
          onPress={() => navigation.navigate('Auth')}
          variant="primary"
          style={{ marginBottom: 10 }}
        />

        <Button
          title="Identificação"
          onPress={() => navigation.navigate('Identification')}
          variant="primary"
          style={{ marginBottom: 10 }}
        />

        <Button
          title="Captura"
          onPress={() => navigation.navigate('Capture')}
          variant="primary"
          style={{ marginBottom: 10 }}
        />

        <Button
          title="Processamento"
          onPress={() => navigation.navigate('Processing')}
          variant="primary"
          style={{ marginBottom: 10 }}
        />

        <Button
          title="Relatórios"
          onPress={() => navigation.navigate('Report')}
          variant="primary"
          style={{ marginBottom: 10 }}
        />

        <Button
          title="Correção"
          onPress={() => navigation.navigate('Correction')}
          variant="primary"
        />
      </ScrollView>
    </View>
  );
}