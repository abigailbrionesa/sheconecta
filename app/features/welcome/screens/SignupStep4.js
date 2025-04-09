import React, { useState } from "react";
import { View, Text, TextInput, Alert, ScrollView, ImageBackground } from "react-native";
import { useRoute } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { fontStyle } from "../../../utils/fontStyle";
import NextButton from "../components/NextButton";
import GoBackButton from "../components/GoBackButton";

const SignupStep4 = ({ navigation }) => {
  const route = useRoute();
  const [city, setCity] = useState("");
  const [university, setUniversity] = useState("");
  const [career, setCareer] = useState("");
  const [experience, setExperience] = useState("");

  const { email, password, firstName, lastName, birthDate, role } = route.params;

  // const validateExperience = (exp) => {
  //   const numExp = Number(exp);
  //   return /^\d+$/.test(exp) && numExp >= 1 && numExp <= 60;
  // };
  

  // const validateTextFields = () => {
  //   if (firstName.length < 2 || lastName.length < 2) {
  //     Alert.alert("Datos incompletos", "Los nombres y apellidos deben tener al menos 2 caracteres.");
  //     return false;
  //   }
    
  //   if (university && university.length < 3) {
  //     Alert.alert("Datos incompletos", "El nombre de la universidad debe tener al menos 3 caracteres.");
  //     return false;
  //   }
    
  //   if (career && career.length < 3) {
  //     Alert.alert("Datos incompletos", "El nombre de la carrera debe tener al menos 3 caracteres.");
  //     return false;
  //   }
    
  //   return true;
  // };
  const validateTextFields = () => {
        const numExp = parseInt(experience);
      
        if (city.length < 3 || university.length < 3 || career.length < 3 ) {
          Alert.alert("Datos incompletos", "Los datos deben tener al menos 3 caracteres.");
          return false;
        }
      
        if (!/^\d+$/.test(experience) || isNaN(numExp) || numExp < 10 || numExp > 60) {
          Alert.alert("No válida", "Por favor, ingresa experiencia entre 10 y 60 años.");
          return false;
        }
      
        return true;
      };

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

  const goToStep7 = () => {
    if (validateCityUniversityCareer() && validateTextFields() ) {
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
            { gap: 40, flex: 1, justifyContent: "space-between" },
          ]}
        >
          <View style={{ gap: 15, marginTop: 140 }}>
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
              placeholder="Años de experiencia"
              keyboardType="numeric"
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9]/g, '');
                setExperience(numericText);
              }}
              
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

export default SignupStep4;