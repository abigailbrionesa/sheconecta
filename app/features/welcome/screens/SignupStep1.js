import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
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
      setPasswordFeedback("✅ Strong password!");
    } else {
      setPasswordFeedback(
        "❌ Use 8+ chars, mix upper/lowercase, numbers & special chars."
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
      <View style={uiStyle.container}>
        <Text style={fontStyle.h1}>Step 1: Email & Password</Text>

        <TextInput
          style={uiStyle.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={uiStyle.input}
          value={password}
          onChangeText={checkPasswordStrength}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
        />
        {passwordFeedback ? (
          <Text
            style={{ color: passwordFeedback.includes("✅") ? "green" : "red" }}
          >
            {passwordFeedback}
          </Text>
        ) : null}

        <Button title="Continue" onPress={goToStep2} />
      </View>
    </ImageBackground>
  );
};

export default SignupStep1;
