import React from 'react';
import { View, ActivityIndicator, Text, Image } from 'react-native';
import { fontStyle } from '../../../utils/fontStyle';

const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap:15 }}>
      <Image source={require("../../../../assets/orchid.png")} style={{ width: 100, height: 100}} />
      <ActivityIndicator size="large" color="#fff" />
      <Text style={[fontStyle.h3,fontStyle.light]}>Cargando...</Text>
    </View>
  );
};

export default Loading;