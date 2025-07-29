import React from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle, Animated } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Student } from '../types/newTypes';
import { CheckCircle } from 'lucide-react-native';
import { Shadow } from '../styles/designTokens';

interface SelectableListItemProps {
  student: Student;
  isSelected: boolean;
  onPress: () => void;
  index: number;
}

const SelectableListItem: React.FC<SelectableListItemProps> = ({
  student,
  isSelected,
  onPress,
  index
}) => {
  const { colors } = useTheme();
  
  const containerStyle: Animated.WithAnimatedValue<StyleProp<ViewStyle>> = {
    backgroundColor: isSelected 
      ? `${colors.primary.main}10` 
      : colors.component.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: isSelected ? 2 : 1,
    borderColor: isSelected 
      ? colors.primary.main 
      : colors.border.light,
    ...Shadow(colors).md
  };

  const statusBadgeStyle: ViewStyle = {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View style={containerStyle}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            {/* Avatar Placeholder */}
            <View style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: `${colors.primary.main}20`,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 12
            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: colors.primary.main
              }}>
                {student.name.charAt(0)}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: colors.text.primary,
                marginBottom: 4
              }}>
                {student.name}
              </Text>
              
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{
                  fontSize: 14,
                  color: colors.text.secondary,
                  marginRight: 12
                }}>
                  Turma {student.class}
                </Text>
              </View>
            </View>
          </View>

          {isSelected && (
            <CheckCircle size={24} color={colors.primary.main} />
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default SelectableListItem;