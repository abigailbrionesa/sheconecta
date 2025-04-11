import React, { useState } from "react";
import { View, Text, ScrollView, ImageBackground } from "react-native";
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

  const languagesoptions = [
    "Español",
    "Quechua",
    "Aymara",
    "Awajún",
    "Shipibo",
    "Ashaninka",
    "Matsigenka",
    "Kandozi-Chapra",
  ];

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
    departamento,
    provincia,
    university,
    career,
    experience,
  } = route.params;

  const goToStep7 = () => {
    navigation.navigate("SignupStep7", {
      email,
      password,
      firstName,
      lastName,
      age,
      role,
      departamento,
      provincia,
      university,
      career,
      experience,
      languages: selectedLanguages,
    });
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View
          style={[
            uiStyle.container,
            { gap: 15, flex: 1, justifyContent: "space-between", alignItems: "center" },
          ]}
        >
          <View style={{gap:15}}>
            <Text style={[fontStyle.h2, fontStyle.light]}>
              ¿Qué idiomas hablas?
            </Text>

            <TagSelector
              tags={languagesoptions}
              selectedTags={selectedLanguages}
              toggleTag={toggleLanguage}
            />
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}
          >
            <GoBackButton onPress={() => navigation.goBack()} />
            <NextButton onPress={goToStep7} />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default SignupStep6;
