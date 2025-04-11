import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button1 from "../components/Button1";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { ImageBackground } from "react-native";
import { uiStyle } from "../../../utils/uiStyle";
import { plans } from "../../../utils/plans";

const SubscriptionScreen = ({ userData, navigation }) => {
  console.log(userData, "user data in subscriptionscreen");
  const navigateToDetails = (plan) => {
    navigation.navigate("PlanDetails", { plan });
  };

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
    languages,
    instagram,
    linkedin,
    image,
    selectedAreas,
  } = userData;

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
        age,
        location: {
          departamento,
          provincia,
        },
        languages,
        career,
        university,
        interestAreas: selectedAreas,
        yearsExperience: experience,
        socialLinks: {
          instagram,
          linkedin,
        },
        profilePictureUrl: image,
        carnetPictureUrl: "",
        score: 0,
        savedContacts: [],
      };

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
      style={{ flex: 1, resizeMode: "cover" }}
    >
      <View style={[uiStyle.container, { gap: 15, flex:1, justifyContent: "space-between" }]}>
        <Text style={[fontStyle.h2, fontStyle.light]}>
          Planes de Suscripción
        </Text>

        <FlatList
          data={plans}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#eeefff",
                padding: 20,
                borderRadius: 16,
                marginBottom: 20,
                elevation: 3,
                gap:15
              }}
            >

              <View style={{flexDirection: "row", justifyContent: "space-between"}}>
              <Text
                style={[fontStyle.h3, fontStyle.dark]}
              >
                {item.name}
              </Text>
              <Text
                style={[fontStyle.h4, fontStyle.pink]}
              >
                {item.price}
              </Text>
              </View>

              <Button1 color="#e8ddf4" textColor="#757fb2"
                onPress={() => navigateToDetails(item)}
              >{`Ver detalles`}</Button1>
            </View>
          )}
        />

        <View style={{ marginTop: 30 }}>
          <Button1 onPress={signUp}>Crear Cuenta</Button1>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SubscriptionScreen;
