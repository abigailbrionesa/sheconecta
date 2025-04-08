import React, { useState } from 'react';
import { View, Button, Text, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { uiStyle } from '../../../utils/uiStyle';

const SignupStep3 = ({ navigation }) => {
  const route = useRoute();
  const [role, setRole] = useState('');

  const { email, password, firstName, lastName, birthDate } = route.params;

  const validateRole = () => {
    if (!role) {
      Alert.alert("Error", "Please select a role.");
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (validateRole()) {
      navigation.navigate("SignupStep4", { email, password, firstName, lastName, birthDate, role });
    }
  };

  return (
    <View style={uiStyle.container}>
      <Text>Step 3: Role (Estudiante/Mentor)</Text>
      <Button title="Estudiante" onPress={() => setRole('estudiante')} />
      <Button title="Mentor" onPress={() => setRole('mentor')} />
      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
};

export default SignupStep3;
