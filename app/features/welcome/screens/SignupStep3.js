import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import GoBackButton from "../components/GoBackButton";

const SignupStep3 = ({ navigation }) => {
  const route = useRoute();
  const [role, setRole] = useState("");

  const { email, password, firstName, lastName, birthDate } = route.params;

  const goToStep4 = (role) => {
    navigation.navigate("SignupStep4", {
      email,
      password,
      firstName,
      lastName,
      birthDate,
      role,
    });
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 60,
      }}
    >
      <View style={{ width: "100%", alignItems: "center" }}>
        <Image
          source={require("../../../../assets/orchid.png")}
          style={{
            width: 80,
            height: 80,
            resizeMode: "contain",
            marginBottom: 20,
          }}
        />

        <Text
          style={{
            fontSize: 28,
            fontWeight: "300",
            textAlign: "center",
            color: "white",
            marginBottom: 40,
          }}
        >
          ¿Cómo quieres participar?
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: role === "estudiante" ? "rgba(255, 255, 255, 0.8)" : "white",
            borderRadius: 30,
            paddingVertical: 15,
            paddingHorizontal: 20,
            width: "100%",
            alignItems: "center",
            marginBottom: 20,
            borderWidth: role === "estudiante" ? 3 : 0,
            borderColor: "#007AFF",
          }}
          onPress={() => {
            setRole("estudiante");
            goToStep4("estudiante");
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "500" }}>Soy estudiante</Text>
          <Text style={{ fontSize: 14 }}>Quiero aprender</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: role === "mentor" ? "rgba(255, 255, 255, 0.8)" : "white",
            borderRadius: 30,
            paddingVertical: 15,
            paddingHorizontal: 20,
            width: "100%",
            alignItems: "center",
            marginBottom: 20,
            borderWidth: role === "mentor" ? 3 : 0,
            borderColor: "#007AFF",
          }}
          onPress={() => {
            setRole("mentor");
            goToStep4("mentor");
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "500" }}>Soy mentor</Text>
          <Text style={{ fontSize: 14 }}>Quiero guiar</Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            position: "absolute",
            bottom: 30,
            paddingHorizontal: 20,
          }}
        >
          <GoBackButton onPress={() => navigation.goBack()} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignupStep3;
