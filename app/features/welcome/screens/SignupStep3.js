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
  const { email, password, firstName, lastName, age } = route.params;

  const goToStep4 = (role) => {
    navigation.navigate("SignupStep4", {
      email,
      password,
      firstName,
      lastName,
      age,
      role,
    });
  };

  const handleRoleSelection = (selectedRole) => {
    navigation.navigate("SignupStep4", {
      email,
      password,
      firstName,
      lastName,
      birthDate,
      role: selectedRole,
    });
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
        
        <Text style={[fontStyle.h1, styles.headerText]}>¿Cómo quieres participar?</Text>
        
        <TouchableOpacity 
          style={[styles.button, role === 'estudiante' && styles.selectedButton]}
          onPress={() => {
            setRole("estudiante");
            handleRoleSelection("estudiante");
          }}
        >
          <Text style={styles.buttonTitle}>Soy estudiante</Text>
          <Text style={styles.buttonSubtitle}>Quiero aprender</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, role === 'mentor' && styles.selectedButton]}
          onPress={() => {
            setRole("mentor");
            handleRoleSelection("mentor");
          }}
        >
          <Text style={styles.buttonTitle}>Soy mentor</Text>
          <Text style={styles.buttonSubtitle}>Quiero guiar</Text>
        </TouchableOpacity>

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