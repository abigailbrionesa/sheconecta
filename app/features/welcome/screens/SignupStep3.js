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
import { fontStyle } from "../../../utils/fontStyle";
import { uiStyle } from "../../../utils/uiStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";

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

  const RoleButton = ({ roleName, label, description }) => {
    const isSelected = role === roleName;
    return (
      <TouchableOpacity
        style={{
          backgroundColor: isSelected ? "rgba(255, 255, 255, 0.8)" : "white",
          borderRadius: 30,
          alignItems: "center",
          padding:15,
        }}
        onPress={() => {
          setRole(roleName);
          goToStep4(roleName);
        }}
      >
        <Text style={[fontStyle.h3, fontStyle.dark]}>{label}</Text>
        <Text style={[fontStyle.p, fontStyle.gray]}>{description}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={[backgroundStyle.background]}
    >
      <View style={[uiStyle.container, { gap: 15, flex:1, justifyContent: "space-between" }]}>
        <Image
          source={require("../../../../assets/orchid.png")}
          style={{
            width: 80,
            height: 80,
            resizeMode: "contain",
            marginBottom: 20,
          }}
        />
        <Text style={[fontStyle.h1, fontStyle.light]}>
          ¿Cómo quieres participar?
        </Text>
        
        <RoleButton
          roleName="estudiante"
          label="Soy estudiante"
          description="Quiero aprender"
        />

        <RoleButton
          roleName="mentor"
          label="Soy mentor"
          description="Quiero guiar"
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "flex-end",
          }}
        >
          <GoBackButton onPress={() => navigation.goBack()} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignupStep3;