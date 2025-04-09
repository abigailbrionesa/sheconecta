import React, { useState } from "react";
import { View, TextInput, Alert, Text, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { ImageBackground } from "react-native";
import NextButton from "../components/NextButton";
import GoBackButton from "../components/GoBackButton";
import { ScrollView } from "react-native";

const SignupStep2 = ({ navigation }) => {
  const route = useRoute();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const { email, password } = route.params;

  const validatePersonalInfo = () => {
    if (!firstName || !lastName || !birthDate) {
      Alert.alert("Error", "Please enter all personal information.");
      return false;
    }
    return true;
  };

  const goToStep3 = () => {
    if (validatePersonalInfo()) {
      navigation.navigate("SignupStep3", {
        email,
        password,
        firstName,
        lastName,
        birthDate,
      });
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <Image 
          source={require("../../../../assets/orchid.png")} 
          style={styles.orchidImage} 
        />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={[
          uiStyle.container,
          { gap: 40, flex: 1, justifyContent: "space-between" },
        ]}
      >
        <View style={{ gap: 15,marginTop: -10 }}>
          <Text style={[fontStyle.h2, fontStyle.light]}>Completa tu perfil</Text>
          
          <Text style={[fontStyle.h3, fontStyle.light]}>Nombre</Text>
          <TextInput
            style={uiStyle.input}
            value={firstName}
            placeholder="Escribe aquí..."
            onChangeText={setFirstName}
          />

          <Text style={[fontStyle.h3, fontStyle.light]}>Apellido</Text>
          <TextInput
            style={uiStyle.input}
            value={lastName}
            placeholder="Escribe aquí..."
            onChangeText={setLastName}
          />
          
          <Text style={[fontStyle.h3, fontStyle.light]}>Edad</Text>
          <TextInput
            style={uiStyle.input}
            value={birthDate}
            placeholder="Escribe aquí..."
            keyboardType="number-pad"
            onChangeText={setBirthDate}
          />
        </View>
        
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <GoBackButton onPress={() => navigation.goBack()} />
          <NextButton onPress={goToStep3} />
        </View>
      </View>
      </ScrollView>
    </ImageBackground>
  );
};
export const styles = StyleSheet.create({
  orchidImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center', // Centrar horizontalmente
    marginTop: 120,
  },
});

export default SignupStep2;