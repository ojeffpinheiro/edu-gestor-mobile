import { View } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

const IconButton = ({ icon, onPress, tooltip, accessibilityLabel }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        onLongPress={() => setShowTooltip(true)}
        onPressOut={() => setShowTooltip(false)}
        accessibilityLabel={accessibilityLabel}
      >
        {icon}
      </TouchableOpacity>
      
      {showTooltip && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>{tooltip}</Text>
        </View>
      )}
    </View>
  );
};