import React, { useState } from "react";
import { View, Button, Image, Text, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { ImageBackground } from "react-native";

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
    experience,
    city,
    university,
    career,
    instagram,
    linkedin,
  } = route.params || {};

  const handleContinue = () => {
    const image =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    console.log(
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
      "lol"
    );
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
      instagram: instagram || "",
      linkedin: linkedin || "",
      image,
    });
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View style={uiStyle.container}>
        <Text>Step 6: Profile Picture (Optional)</Text>

        {profilePicture ? (
          <Image
            source={{ uri: profilePicture }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        ) : (
          <Text>No Profile Picture</Text>
        )}

        <Button title="Continue" onPress={handleContinue} />
      </View>
    </ImageBackground>
  );
};

export default SignupStep6;
