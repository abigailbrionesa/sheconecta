import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { fontStyle } from '../../../utils/fontStyle';

const Button1 = ({
  onPress,
  children,
  icon,
  color = '#6391d0',
  iconColor = 'white',
  textColor = '#f0f7fd',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: color,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {icon && (
          <View style={{ marginRight: 8 }}>
            {icon}
          </View>
        )}
        <Text
          style={[
            fontStyle.button,
            {
              color: textColor,
              fontSize: 16,
              fontWeight: '600',
            },
          ]}
        >
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button1;
