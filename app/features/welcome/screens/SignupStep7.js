import React, { useState } from "react";
import { View, Button, Text, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { ImageBackground } from "react-native";

const SignupStep7 = ({ navigation }) => {
  const route = useRoute();
  const areas = ["Ciencia", "Tecnología", "Ingeniería", "Matemáticas"];

  const [selectedAreas, setSelectedAreas] = useState([]);

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
    instagram,
    linkedin,
    image,
  } = route.params;

  const handleAreaSelect = (area) => {
    setSelectedAreas((prevAreas) => {
      if (prevAreas.includes(area)) {
        return prevAreas.filter((item) => item !== area);
      } else {
        return [...prevAreas, area];
      }
    });
  };

  const handleContinue = () => {
    if (selectedAreas.length === 0) {
      Alert.alert("Please select at least one area.");
      return;
    }

    navigation.navigate("SignupStep8", {
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
      image,
      selectedAreas,
    });
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View style={uiStyle.container}>
        <Text>
          Step 7: Select your favorite areas (Science, Technology, Engineering,
          Math)
        </Text>

        {areas.map((area) => (
          <Button
            key={area}
            title={
              selectedAreas.includes(area)
                ? `Selected: ${area}`
                : `Select ${area}`
            }
            onPress={() => handleAreaSelect(area)}
          />
        ))}

        <Button title="Continue" onPress={handleContinue} />
      </View>
    </ImageBackground>
  );
};

export default SignupStep7;
