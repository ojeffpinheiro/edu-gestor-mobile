import React from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { createSelectableListItemStyles } from './auth/styles';

interface SelectableListItemProps {
  primaryText: string;
  secondaryTexts: string[];
  isSelected: boolean;
  onPress: () => void;
  selectedIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const SelectableListItem = ({
  primaryText,
  secondaryTexts,
  isSelected,
  onPress,
  selectedIcon,
  style
}: SelectableListItemProps) => {
  const { colors } = useTheme();
  const styles = createSelectableListItemStyles(colors);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.listItem,
        isSelected && styles.selectedListItem,
        style
      ]}
    >
      <View style={styles.listItemContent}>
        <Text style={styles.listItemPrimaryText}>{primaryText}</Text>
        {secondaryTexts.map((text, index) => (
          <Text key={index} style={styles.listItemSecondaryText}>
            {text}
          </Text>
        ))}
      </View>
      {isSelected && selectedIcon}
    </TouchableOpacity>
  );
};

export default SelectableListItem;