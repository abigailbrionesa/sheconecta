import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import GoBackButton from "../components/GoBackButton";

const SignupStep3 = ({ navigation }) => {
  const route = useRoute();
  const [role, setRole] = useState("");

  const { email, password, firstName, lastName, birthDate } = route.params;

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
      style={backgroundStyle.background}
    >
      <View style={styles.container}>
        <Image 
          source={require("../../../../assets/orchid.png")} 
          style={styles.orchidImage} 
        />
        
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

        <View style={styles.navigationContainer}>
            <GoBackButton onPress={() => navigation.goBack()} />
        </View>
      </View>
    </ImageBackground>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  orchidImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  headerText: {
    textAlign: 'center',
    marginBottom: 40,
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedButton: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 3,
    borderColor: "#007AFF",
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  buttonSubtitle: {
    fontSize: 14,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 30,
    paddingHorizontal: 20,
  },
});

export default SignupStep3;