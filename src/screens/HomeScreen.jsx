import React from 'react';
import { View, ScrollView } from 'react-native';
import Button from '../components/common/Button';
import SectionHeader from '../components/common/SectionHeader';
import { styles } from '../styles/commun';
import { createDesignSystem } from '../styles/mainStyles';

export default function HomeScreen({ navigation }) {
  
  const menuItems = [
    { title: 'Autenticação', screen: 'Auth' },
    { title: 'Identificação', screen: 'Identification' },
    { title: 'Captura', screen: 'Capture' },
    { title: 'Processamento', screen: 'Processing' },
    { title: 'Relatórios', screen: 'Report' },
    { title: 'Correção', screen: 'Correction' }
  ];

  return (
    <View style={styles.container}>
      <SectionHeader
        title="Bem-vindo ao App"
        subtitle="Aqui estão suas opções"
        onBack={() => console.log('Voltar')}
      />

      <ScrollView contentContainerStyle={styles.buttonContainer}>
        {menuItems.map((item, index) => (
          <Button
            key={index}
            title={item.title}
            onPress={() => navigation.navigate(item.screen)}
            variant="primary"
          />
        ))}
      </ScrollView>
    </View>
  );
}