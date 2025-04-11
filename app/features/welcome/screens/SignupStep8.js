import React, { useState } from "react";
import { View, Button, Image, Text, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { ImageBackground } from "react-native";
import NextButton from "../components/NextButton";
import GoBackButton from "../components/GoBackButton";

const SignupStep8 = ({ navigation }) => {
  const route = useRoute();
  const [profilePicture, setProfilePicture] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

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
    languages,
    instagram,
    linkedin,
  } = route.params || {};

  const handleContinue = () => {
    const image =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    navigation.navigate("SignupStep9", {
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
      languages,
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
      <View
        style={[
          uiStyle.container,
          { gap: 40, flex: 1, justifyContent: "space-between" },
        ]}
      >
        <View
          style={{ gap: 15, alignItems: "center" }}
        >
          <Text style={[fontStyle.h2, fontStyle.light]}>
            Añade una foto de perfil
          </Text>
          <Text style={[fontStyle.h3, fontStyle.light]}>
            (OPCIONAL)
          </Text>
          {profilePicture ? (
            <Image
              source={{ uri: profilePicture }}
              style={{ width: 200, height: 200, borderRadius: 100 }}
            />
          ) : (
            <Text>No Profile Picture</Text>
          )}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <GoBackButton onPress={() => navigation.goBack()} />
          <NextButton onPress={handleContinue} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignupStep8;
