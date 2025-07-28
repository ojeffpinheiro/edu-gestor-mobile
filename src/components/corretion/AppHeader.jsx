import React from 'react';
import { View, Text } from 'react-native';
import { User } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';
import { createHeaderStyles } from './AppHeaderStyles';

const AppHeader = () => {
  const { colors } = useTheme();
  const styles = createHeaderStyles(colors);

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Correção de Provas</Text>
      <View style={styles.headerRight}>
        <Button
          variant="text"
          onPress={() => {}}
          style={styles.headerButton}
          icon={<User size={24} color={colors.text.secondary} />}
        />
      </View>
    </View>
  );
};

export default AppHeader;