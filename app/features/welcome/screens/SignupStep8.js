import React, { useState } from "react";
import { View, Button, Image, Text, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { ImageBackground } from "react-native";
import { fontStyle } from "../../../utils/fontStyle";
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
      languages: selectedLanguages,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  orchidImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 120,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 50,
  },
  createButton: {
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '48%',
    alignItems: 'center',
    marginBottom: 20,
    shadowOffset: {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderWidth: 3,
      borderColor: "#007AFF",
        },
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
  },
  buttonTitle: {
    fontSize: 14,
  },

  loadingContainer: {
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    marginTop: 15,
    fontSize: 16,
  },
  successContainer: {
    alignItems: "center",
  },
  checkIcon: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 20,
  },
  successText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  navigationContainer: {
    marginBottom: 20,
  },
});

export default SignupStep8;