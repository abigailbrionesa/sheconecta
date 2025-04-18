import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { fontStyle } from '../../../utils/fontStyle';
const NextButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#6391d0',
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
          color: '#f0f7fd',
          fontSize: 16,
          fontWeight: '600',
        }]}
      >
        Continuar
      </Text>
    </TouchableOpacity>
  );
};

export default NextButton;
