import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { ImageBackground } from "react-native";
import NextButton from "../components/NextButton";
import GoBackButton from "../components/GoBackButton";
const SignupStep1 = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordFeedback, setPasswordFeedback] = useState("");

  const validateEmailPassword = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return false;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordPattern.test(password)) {
      Alert.alert(
        "Weak Password",
        "Your password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return false;
    }

    return true;
  };

  const checkPasswordStrength = (input) => {
    setPassword(input);
    const length = input.length >= 8;
    const upper = /[A-Z]/.test(input);
    const lower = /[a-z]/.test(input);
    const number = /\d/.test(input);
    const special = /[\W_]/.test(input);

    if (!input) {
      setPasswordFeedback("");
    } else if (length && upper && lower && number && special) {
      setPasswordFeedback("✅ Contraseña segura!");
    } else {
      setPasswordFeedback(
        "❌ Usa 8 o más caracteres, combinando mayúsculas, minúsculas, números y caracteres especiales."
      );
    }
  };

  const goToStep2 = () => {
    if (validateEmailPassword()) {
      navigation.navigate("SignupStep2", { email, password });
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View
        style={[
          uiStyle.container,
          { gap: 15, flex: 1, justifyContent: "space-between" },
        ]}
      >
        <View style={{ gap: 15 }}>
          <Text style={[fontStyle.h2, fontStyle.light]}>Completa tu perfil</Text>
          <Text style={[fontStyle.h3, fontStyle.light]}>Correo electrónico</Text>
          <TextInput
            style={uiStyle.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email (ej: usuario@gmail.com)"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={[fontStyle.h3, fontStyle.light]}>Contraseña</Text>

          <TextInput
            style={uiStyle.input}
            value={password}
            onChangeText={checkPasswordStrength}
            secureTextEntry
            placeholder="Contraseña (mínimo 8 caracteres)"
            autoCapitalize="none"
          />

          {passwordFeedback ? (
            <Text
              style={[ fontStyle.p, fontStyle.light]}
            >
              {passwordFeedback}
            </Text>
          ) : null}
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <GoBackButton onPress={() => navigation.goBack()} />
          <NextButton onPress={goToStep2} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignupStep1;
