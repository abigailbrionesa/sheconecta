import React from 'react';
import SignupStep1 from '../../features/welcome/screens/SignupStep1';
import SignupStep2 from '../../features/welcome/screens/SignupStep2';
import SignupStep3 from '../../features/welcome/screens/SignupStep3';
import SignupStep4 from '../../features/welcome/screens/SignupStep4';
import SignupStep5 from '../../features/welcome/screens/SignupStep6';
import SignupStep6 from '../../features/welcome/screens/SignupStep7';
import SignupStep7 from '../../features/welcome/screens/SignupStep8';
import SignupStep8 from '../../features/welcome/screens/SignupStep9';
import SignupStep9 from '../../features/welcome/screens/SignupStep9';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

const SignupNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SignupStep1">
      <Stack.Screen name="SignupStep1" component={SignupStep1} options={{ headerShown: false }} />
      <Stack.Screen name="SignupStep2" component={SignupStep2} options={{ headerShown: false }} />
      <Stack.Screen name="SignupStep3" component={SignupStep3} options={{ headerShown: false }} />
      <Stack.Screen name="SignupStep4" component={SignupStep4} options={{ headerShown: false }} />
      <Stack.Screen name="SignupStep5" component={SignupStep5} options={{ headerShown: false }} />
      <Stack.Screen name="SignupStep6" component={SignupStep6} options={{ headerShown: false }} />
      <Stack.Screen name="SignupStep7" component={SignupStep7} options={{ headerShown: false }} />
      <Stack.Screen name="SignupStep8" component={SignupStep8} options={{ headerShown: false }} />
      <Stack.Screen name="SignupStep9" component={SignupStep9} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default SignupNavigator;