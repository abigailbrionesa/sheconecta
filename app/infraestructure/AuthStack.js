import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../features/welcome/screens/Login";
import SignupNavigator from "./navigation/SignupNavigator";
import Welcome from "../features/welcome/screens/Welcome";

const Stack = createNativeStackNavigator();

export const AuthStack = () => (
  <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignUp" component={SignupNavigator} />
  </Stack.Navigator>
);