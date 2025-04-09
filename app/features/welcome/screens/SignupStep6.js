import React, { useState } from "react";
import { View, Button, Image, Text, Alert, ImageBackground } from "react-native";
import { useRoute } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { fontStyle } from "../../../utils/fontStyle";
import NextButton from "../components/NextButton";
import GoBackButton from "../components/GoBackButton";

const SignupStep6 = ({ navigation }) => {
  const route = useRoute();
  const [profilePicture, setProfilePicture] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

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
  } = route.params;

  const handleContinue = () => {
    const image = profilePicture;

    navigation.navigate("SignupStep5", {
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
    });
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View style={[uiStyle.container, { gap: 45, marginTop: 120 }]}>
        <Text style={[fontStyle.h2, fontStyle.light]}>Añade una foto de perfil (opcional)</Text>

        {profilePicture ? (
          <Image
            source={{ uri: profilePicture }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        ) : (
          <Text>No Profile Picture</Text>
        )}

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <GoBackButton onPress={() => navigation.goBack()} />
          <NextButton onPress={handleContinue} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignupStep6;