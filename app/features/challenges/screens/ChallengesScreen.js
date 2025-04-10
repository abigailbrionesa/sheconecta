import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { challenges } from '../../../utils/challenges';
import { ImageBackground } from 'react-native';
import { backgroundStyle } from '../../../utils/backgroundStyle';
import { fontStyle } from '../../../utils/fontStyle';

export const ChallengesScreen = ({ navigation }) => {

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ChallengeDetails', { challenge: item })}>
      <View style={{ padding: 10, borderBottomWidth: 1, backgroundColor: '#ffff', borderBottomColor: '#ccc', borderRadius: 10, marginBottom: 10 }}>
        <Text style={[fontStyle.h4, fontStyle.dark]}>{item.nombre}</Text>
        <Text style={[fontStyle.p, fontStyle.pink]}>{item.puntos} puntos</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <ScrollView contentContainerStyle={{ padding: 20, marginTop: 100 }}>
        <Text style={[fontStyle.h2, fontStyle.light]}>Retos Semanales</Text>
        <FlatList
          data={challenges}
          renderItem={renderItem}
          keyExtractor={(item) => item.nombre}
        />
      </ScrollView>
    </ImageBackground>
  );
};
