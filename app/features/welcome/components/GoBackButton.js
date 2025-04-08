import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { fontStyle } from '../../../utils/fontStyle';
const GoBackButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#f0f7fd',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
      }}
    >
      <Text
        style={ [fontStyle.button, {
          color: '#6391d0',
          fontSize: 16,
          fontWeight: '600',
        }]}
      >
        Regresar
      </Text>
    </TouchableOpacity>
  );
};

export default GoBackButton;
