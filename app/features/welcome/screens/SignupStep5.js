import React, { useState } from "react";
import { View, TextInput, StyleSheet, Image, ScrollView, ImageBackground, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import NextButton from "../components/NextButton";
import GoBackButton from "../components/GoBackButton";
import { fontStyle } from "../../../utils/fontStyle";

const SignupStep5 = ({ navigation }) => {
  const route = useRoute();
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const {
    email,
    password,
    firstName,
    lastName,
    birthDate,
    role,
    city,
    university,
    career,
    experience,
    selectedAreas,
    image,
  } = route.params;

  const handleContinue = () => {
    navigation.navigate("SignupStep8", {
      email,
      password,
      firstName,
      lastName,
      birthDate,
      role,
      city,
      university,
      career,
      experience,
      selectedAreas,
      instagram: instagram || "",
      linkedin: linkedin || "",
      image,
    });
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
          { gap: 15, flex: 1, justifyContent: "space-between" },
        ]}
      >
        <View style={{ gap: 15, marginTop: -10 }}>
          <Text style={[fontStyle.h2, fontStyle.light]}>Añade tus redes sociales (opcional)</Text>
          
          <Text style={[fontStyle.h3, fontStyle.light]}>Instagram</Text>
          <TextInput
            style={uiStyle.input}
            value={instagram}
            placeholder="Escribe aquí..."
            onChangeText={setInstagram}
          />

          <Text style={[fontStyle.h3, fontStyle.light]}>LinkedIn</Text>
          <TextInput
            style={uiStyle.input}
            value={linkedin}
            placeholder="Escribe aquí..."
            onChangeText={setLinkedin}
          />
        </View>
        
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <GoBackButton onPress={() => navigation.goBack()} />
          <NextButton onPress={handleContinue} />
        </View>
      </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  orchidImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center', 
    marginTop: 120,
  },
});

export default SignupStep5;