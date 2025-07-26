import React from 'react';
import { View, ScrollView } from 'react-native';
import Button from '../components/common/Button';
import SectionHeader from '../components/common/SectionHeader';
import { useTheme } from '../context/ThemeContext';
import { createDesignSystem } from '../styles/mainStyles';

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const { buttons, containers } = createDesignSystem(colors);
  const menuItems = [
    { title: 'Autenticação', screen: 'Auth' },
    { title: 'Identificação', screen: 'Identification' },
    { title: 'Captura', screen: 'Capture' },
    { title: 'Processamento', screen: 'Processing' },
    { title: 'Relatórios', screen: 'Report' },
    { title: 'Correção', screen: 'Correction' }
  ];

  return (
    <View style={containers.centered}>
      <SectionHeader
        title="Bem-vindo ao App"
        subtitle="Aqui estão suas opções"
        onBack={() => console.log('Voltar')}
      />

      <ScrollView contentContainerStyle={containers.screen}>
        {menuItems.map((item, index) => (
          <Button
            key={index}
            title={item.title}
            onPress={() => navigation.navigate(item.screen)}
            variant="primary"
            style={buttons.primary}
            textStyle={buttons.text}
          />
        ))}
      </ScrollView>
    </View>
  );
}