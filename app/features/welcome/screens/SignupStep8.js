import React, { useState } from "react";
import { View, TextInput, Button, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { Text } from "react-native";
import { uiStyle } from "../../../utils/uiStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { ImageBackground } from "react-native";

const SignupStep8 = ({ navigation }) => {
  const route = useRoute();

  const [loading, setLoading] = useState(false);

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
    instagram,
    linkedin,
    image,
    selectedAreas,
  } = route.params || {};

  const signUp = async () => {
    setLoading(true);
    const auth = FIREBASE_AUTH;
    const db = getFirestore();

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = response.user;

      const userData = {
        type: role,
        email,
        firstName,
        lastName,
        birthDate,
        city,
        career,
        university,
        interestAreas: selectedAreas,
        yearsExperience: experience,
        socialLinks: {
          instagram: instagram || null,
          linkedin: linkedin || null,
        },
        profilePictureUrl: image,
        carnetPictureUrl: null,
        score: 0,
        savedContacts: [],
      };

      await setDoc(doc(db, "users", user.uid), userData);
      console.log("Signup successful");
    } catch (error) {
      console.error("Signup error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View style={uiStyle.container}>
        <Text>Ready! Create your account</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Create Account" onPress={signUp} />
        )}
      </View>
    </ImageBackground>
  );
};

export default SignupStep8;
