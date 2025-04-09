import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { ImageBackground } from "react-native";

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

  const handleContinue = () => {
    if (validateCityUniversityCareer()) {
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
      });
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View style={uiStyle.container}>
        <Text>Step 4: City, University, Career, and Experience</Text>

        <Text>City:</Text>
        <TextInput
          value={city}
          onChangeText={setCity}
          placeholder="Enter city"
          style={uiStyle.input}
        />

        <Text>University:</Text>
        <TextInput
          value={university}
          onChangeText={setUniversity}
          placeholder="Enter university"
          style={uiStyle.input}
        />

        <Text>Career:</Text>
        <TextInput
          value={career}
          onChangeText={setCareer}
          placeholder="Enter career"
          style={uiStyle.input}
        />

        <Text>Experience (in years):</Text>
        <TextInput
          value={experience}
          onChangeText={setExperience}
          placeholder="Enter years of experience"
          keyboardType="numeric"
          style={uiStyle.input}
        />

        <Button title="Continue" onPress={handleContinue} />
      </View>
    </ImageBackground>
  );
};

export default SignupStep4;
