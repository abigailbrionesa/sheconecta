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
import { StyleSheet } from "react-native";


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
      age,
      role: selectedRole,
    });
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={[backgroundStyle.background]}
    >
      <Image
        source={require("../../../../assets/orchid.png")}
        style={styles.orchidImage}
      />

  <View
          style={[
            uiStyle.container,
            { gap: 40, flex: 1, justifyContent: "space-between" },
          ]}
        >
        <View style={{gap:15}}>
        <Text style={[fontStyle.h1, fontStyle.light]}>
          ¿Cómo quieres participar?
        </Text>
               
        <TouchableOpacity 
          style={[styles.button, role === 'estudiante' && styles.selectedButton]}
          onPress={() => {
            setRole("estudiante");
            handleRoleSelection("estudiante");
          }}
        >
          <Text style={[fontStyle.h3,fontStyle.light]}>Soy estudiante</Text>
          <Text  style={[fontStyle.h4,fontStyle.light]}>Quiero aprender</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, role === 'mentor' && styles.selectedButton]}
          onPress={() => {
            setRole("mentor");
            handleRoleSelection("mentor");
          }}
        >
          <Text style={[fontStyle.h3,fontStyle.light]}>Soy mentor</Text>
          <Text  style={[fontStyle.h4,fontStyle.light]}>Quiero guiar</Text>
        </TouchableOpacity>

        </View>
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

const styles = StyleSheet.create({

  button: {
    backgroundColor: "#4c82af",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 40,
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedButton: {
    backgroundColor: "#ae80b3",
  },
  orchidImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 120,
  },
});


export default SignupStep3;