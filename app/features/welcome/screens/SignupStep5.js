import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { Text } from "react-native";
import { backgroundStyle } from "../../../utils/backgroundStyle";
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
    experience,
    city,
    university,
    career,
  } = route.params;

  const handleContinue = () => {
    navigation.navigate("SignupStep6", {
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
      instagram: instagram || "",
      linkedin: linkedin || "",
    });
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View style={uiStyle.container}>
        <Text>Step 5: Social Links (Instagram/LinkedIn)</Text>
        <TextInput
          value={instagram}
          onChangeText={setInstagram}
          placeholder="Instagram (optional)"
        />
        <TextInput
          value={linkedin}
          onChangeText={setLinkedin}
          placeholder="LinkedIn (optional)"
        />
        <Button title="Continue" onPress={handleContinue} />
      </View>
    </ImageBackground>
  );
};

export default SignupStep5;
