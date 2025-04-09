import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { ImageBackground } from "react-native";
import { fontStyle } from "../../../utils/fontStyle";
import NextButton from "../components/NextButton";
import GoBackButton from "../components/GoBackButton";
import { ScrollView } from "react-native";

const SignupStep4 = ({ navigation }) => {
  const route = useRoute();
  const [city, setCity] = useState("");
  const [university, setUniversity] = useState("");
  const [career, setCareer] = useState("");
  const [experience, setExperience] = useState("");

  const { email, password, firstName, lastName, birthDate, role } =
    route.params;

  const validateCityUniversityCareer = () => {
    if (!city || !university || !career) {
      Alert.alert(
        "Error",
        "Please complete the city, university, and career fields."
      );
      return false;
    }
    return true;
  };

  const goToStep5 = () => {
    if (validateCityUniversityCareer()) {
      navigation.navigate("SignupStep7", {
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
      });
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={[
          uiStyle.container,
          { gap: 15, flex: 1, justifyContent: "space-between" },
        ]}
      >
        <View style={{ gap: 15 }}>
          <Text style={[fontStyle.h2, fontStyle.light]}>Cuentanos un poco más sobre ti</Text>
          
          <Text style={[fontStyle.h3, fontStyle.light]}>Ciudad</Text>
          <TextInput
            style={uiStyle.input}
            value={city}
            placeholder="Escribe aquí..."
            onChangeText={setCity}
          />

          <Text style={[fontStyle.h3, fontStyle.light]}>Universidad</Text>
          <TextInput
            style={uiStyle.input}
            value={university}
            placeholder="Escribe aquí..."
            onChangeText={setUniversity}
          />
          
          <Text style={[fontStyle.h3, fontStyle.light]}>Carrera</Text>
          <TextInput
            style={uiStyle.input}
            value={career}
            placeholder="Escribe aquí..."
            onChangeText={setCareer}
          />

          <Text style={[fontStyle.h3, fontStyle.light]}>Años de experiencia</Text>
          <TextInput
            style={uiStyle.input}
            value={experience}
            placeholder="Enter years of experience"
            keyboardType="numeric"
            onChangeText={setExperience}
          />

        </View>
        
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <GoBackButton onPress={() => navigation.goBack()} />
          <NextButton onPress={goToStep5} />
        </View>
      </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default SignupStep4;
