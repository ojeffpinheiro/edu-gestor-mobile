import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);
  
  return (
    <View>
      <TouchableOpacity 
        onLongPress={() => setVisible(true)}
        onPressOut={() => setVisible(false)}
      >
        {children}
      </TouchableOpacity>
      {visible && (
        <View>
          <Text>{text}</Text>
        </View>
      )}
    </View>
  );
};