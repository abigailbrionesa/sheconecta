import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { uiStyle } from '../../../utils/uiStyle';

const SignupStep1 = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmailPassword = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return false;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const goToStep2 = () => {
    if (validateEmailPassword()) {
      navigation.navigate('SignupStep2', { email, password });
    }
  };

  return (
    <View style={uiStyle.container}>
      <Text>Step 1: Email & Password</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Password"
      />
      <Button title="Continue" onPress={goToStep2} />
    </View>
  );
};

export default SignupStep1;
