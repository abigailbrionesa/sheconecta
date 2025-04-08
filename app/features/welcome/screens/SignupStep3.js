import React, { useState } from "react";
import { View, Button, Text, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
const SignupStep3 = ({ navigation }) => {
  const route = useRoute();
  const [role, setRole] = useState("");

  const { email, password, firstName, lastName, birthDate } = route.params;

  const validateRole = () => {
    if (!role) {
      Alert.alert("Error", "Please select a role.");
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (validateRole()) {
      navigation.navigate("SignupStep4", {
        email,
        password,
        firstName,
        lastName,
        birthDate,
        role,
      });
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View style={uiStyle.container}>
        <Text>Step 3: Role (Estudiante/Mentor)</Text>
        <Button title="Estudiante" onPress={() => setRole("estudiante")} />
        <Button title="Mentor" onPress={() => setRole("mentor")} />
        <Button title="Continue" onPress={handleContinue} />
      </View>
    </ImageBackground>
  );
};

export default SignupStep3;
