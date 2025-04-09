import React, { useState } from "react";
<<<<<<< HEAD
import { View, Button, Image, Text, Alert, ImageBackground } from "react-native";
=======
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
} from "react-native";
>>>>>>> main
import { useRoute } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { fontStyle } from "../../../utils/fontStyle";
import NextButton from "../components/NextButton";
import GoBackButton from "../components/GoBackButton";
import TagSelector from "../../opportunities/components/TagSelector";

const SignupStep6 = ({ navigation }) => {
  const route = useRoute();
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const languagesoptions = ["Español", "Quechua", "Aymara", "Inglés", "Francés"];

  const toggleLanguage = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const {
    email,
    password,
    firstName,
    lastName,
    age,
    role,
<<<<<<< HEAD
    city,
    university,
    career,
    experience,
    selectedAreas,
  } = route.params;

  const handleContinue = () => {
    const image = profilePicture;

    navigation.navigate("SignupStep5", {
=======
    departamento,
    provincia,
  } = route.params;

  const goToStep7 = () => {
    navigation.navigate("SignupStep7", {
>>>>>>> main
      email,
      password,
      firstName,
      lastName,
<<<<<<< HEAD
      birthDate,
      role,
      city,
      university,
      career,
      experience,
      selectedAreas,
      image, 
=======
      age,
      role,
      departamento,
      provincia,
      university,
      career,
      experience,
      languages: selectedLanguages,
>>>>>>> main
    });
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
<<<<<<< HEAD
      <View style={[uiStyle.container, { gap: 45, marginTop: 120 }]}>
        <Text style={[fontStyle.h2, fontStyle.light]}>Añade una foto de perfil (opcional)</Text>
=======
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View
          style={[uiStyle.container, { gap: 15, flex: 1, justifyContent: "space-between" }]}
        >
          <View>
            <Text style={fontStyle.h3}>¿Qué idiomas hablas?</Text>
>>>>>>> main

            <TagSelector
              tags={languagesoptions}
              selectedTags={selectedLanguages}
              toggleTag={toggleLanguage}
            />
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <GoBackButton onPress={() => navigation.goBack()} />
            <NextButton onPress={goToStep7} />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default SignupStep6;