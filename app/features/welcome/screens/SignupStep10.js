import React, { useState } from "react";
import { View, TextInput, Button, ActivityIndicator, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { ImageBackground } from "react-native";
import { uiStyle } from "../../../utils/uiStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { fontStyle } from "../../../utils/fontStyle";
import Button1 from "../components/Button1";

const SignupStep9 = ({ navigation }) => {
  const route = useRoute();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;
      const userData = {
        type: role,
        email,
        firstName,
        lastName,
        age,
        location: {
          departamento,
          provincia,
        },
        career,
        university,
        interestAreas: selectedAreas,
        yearsExperience: experience,
        socialLinks: {
          instagram: instagram || "",
          linkedin: linkedin || "",
        },
        profilePictureUrl: image,
        carnetPictureUrl: "",
        score: 0,
        savedContacts: [],
      };
      console.log(userData)
      
      await setDoc(doc(db, "users", user.uid), userData);
      console.log("Signup successful");
    } catch (error) {
      console.error("Signup error:", error.message);
      setErrorMessage(error.message); 
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
        <Text style={[fontStyle.h2, fontStyle.light]}>Listo! Registra tu Cuenta</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button1 onPress={signUp}>Crear Cuenta</Button1>
        )}

        {errorMessage ? (
          <Text style={[fontStyle.p]}>{errorMessage}</Text>
        ) : null}
      </View>
    </ImageBackground>
  );
};

export default SignupStep9;
