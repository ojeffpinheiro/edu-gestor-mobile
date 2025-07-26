import React from 'react';
import { View, ScrollView } from 'react-native';
import Button from '../components/common/Button';
import SectionHeader from '../components/common/SectionHeader';
import { useTheme } from '../context/ThemeContext';
import { createContainerStyles, createButtonStyles, createTextStyles } from '../styles/globalStyles';
import { createSectionHeaderStyles } from '../styles/componentStyles';
import { Spacing } from '../styles/designTokens';

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  
  // Criar estilos usando os mixins globais
  const containers = createContainerStyles(colors);
  const buttons = createButtonStyles(colors);
  const sectionHeader = createSectionHeaderStyles(colors);

  const menuItems = [
    { title: 'Autenticação', screen: 'Auth' },
    { title: 'Identificação', screen: 'Identification' },
    { title: 'Captura', screen: 'Capture' },
    { title: 'Processamento', screen: 'Processing' },
    { title: 'Relatórios', screen: 'Report' },
    { title: 'Correção', screen: 'Correction' }
  ];

  return (
    <View style={containers.centeredContainer}>
      <SectionHeader
        title="Bem-vindo ao App"
        subtitle="Aqui estão suas opções"
        onBack={() => console.log('Voltar')}
        style={sectionHeader.header}
        titleStyle={sectionHeader.title}
        subtitleStyle={sectionHeader.subtitle}
      />

      <ScrollView 
        contentContainerStyle={[containers.screenContainer, { paddingBottom: Spacing.xxl }]}
      >
        {menuItems.map((item, index) => (
          <Button
            key={index}
            title={item.title}
            onPress={() => navigation.navigate(item.screen)}
            style={[buttons.primary, { marginBottom: Spacing.md }]}
            textStyle={buttons.text}
          />
        ))}
      </ScrollView>
    </View>
  );
}