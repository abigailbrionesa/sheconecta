import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, ScrollView, Button } from "react-native";
import { useRoute } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { ImageBackground } from "react-native";
import { fontStyle } from "../../../utils/fontStyle";
import NextButton from "../components/NextButton";
import GoBackButton from "../components/GoBackButton";
import DropDownPicker from "react-native-dropdown-picker";
import { public_universities } from "../../../utils/universitiesList";
import { private_universities } from "../../../utils/universitiesList";
import { careers } from "../../../utils/careersList";

const SignupStep5 = ({ navigation }) => {
  const route = useRoute();
  const [university, setUniversity] = useState("");
  const [career, setCareer] = useState("");
  const [experience, setExperience] = useState("");
  const [universityType, setUniversityType] = useState(null);

  const { email, password, firstName, lastName, birthDate, role, departamento, provincia } = route.params;

  const validateCityUniversityCareer = () => {
    if (!city || !university || !career) {
      Alert.alert("Error", "Please complete the university, and career fields.");
      return false;
    }
    return true;
  };

  const goToStep6 = () => {
    console.log(university)
    if (validateCityUniversityCareer()) {
      navigation.navigate("SignupStep6", {
        email,
        password,
        firstName,
        lastName,
        birthDate,
        role,
        departamento,
        provincia,
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
            <Text style={[fontStyle.h2, fontStyle.light]}>Cuéntanos un poco más sobre ti</Text>

            <View style={{ flexDirection: "row", gap: 15 }}>
              <Button
                title="Universidad Privada"
                onPress={() => setUniversityType("privada")}
              />
              <Button
                title="Universidad Pública"
                onPress={() => setUniversityType("publica")}
              />
            </View>

            {universityType && (
              <>
                <Text style={[fontStyle.h3, fontStyle.light]}>Universidad</Text>
                <DropDownPicker
                  open={true}
                  value={university}
                  items={
                    universityType === "privada"
                      ? private_universities
                      : public_universities
                  }
                  setValue={setUniversity}
                  style={uiStyle.input}
                  placeholder="Selecciona tu universidad"
                />
              </>
            )}

            <Text style={[fontStyle.h3, fontStyle.light]}>Carrera</Text>
            <DropDownPicker
              open={true}
              value={career}
              items={careers}
              setValue={setCareer}
              style={uiStyle.input}
              placeholder="Selecciona tu carrera"
            />

            <Text style={[fontStyle.h3, fontStyle.light]}>Años de experiencia</Text>
            <TextInput
              style={uiStyle.input}
              value={experience}
              placeholder="Años de experiencia"
              keyboardType="numeric"
              onChangeText={setExperience}
            />

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <GoBackButton onPress={() => navigation.goBack()} />
              <NextButton onPress={goToStep6} />
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default SignupStep5;
