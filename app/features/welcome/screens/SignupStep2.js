import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
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

  const handleContinue = () => {
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
      <View style={uiStyle.container}>
        <Text>Step 2: First Name, Last Name, Birthdate</Text>
        <Text>First Name:</Text>
        <TextInput
          value={firstName}
          placeholder="First Name"
          onChangeText={setFirstName}
        />
        <Text>Last Name:</Text>
        <TextInput
          value={lastName}
          placeholder="Last Name"
          onChangeText={setLastName}
        />
        <Text>Birth Date:</Text>
        <TextInput
          value={birthDate}
          placeholder="Birth Date (YYYY-MM-DD)"
          onChangeText={setBirthDate}
        />
        <Button title="Continue" onPress={handleContinue} />
      </View>
    </ImageBackground>
  );
};

export default SignupStep2;
