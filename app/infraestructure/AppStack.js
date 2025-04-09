import React from "react";
import MainTabNavigator from "./navigation/MainTabNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export const AppStack = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={MainTabNavigator} />
  </Stack.Navigator>
);