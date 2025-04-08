import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./app/features/welcome/screens/Welcome";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useFonts } from "expo-font";
import Login from "./app/features/welcome/screens/Login";
import SignUp from "./app/features/welcome/screens/SignUp";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "AbhayaLibre-Bold": require("./assets/fonts/AbhayaLibre-Bold.ttf"),
    "AbhayaLibre-ExtraBold": require("./assets/fonts/AbhayaLibre-ExtraBold.ttf"),
    "AbhayaLibre-Medium": require("./assets/fonts/AbhayaLibre-Medium.ttf"),
    "AbhayaLibre-Regular": require("./assets/fonts/AbhayaLibre-Regular.ttf"),
    "AbhayaLibre-SemiBold": require("./assets/fonts/AbhayaLibre-SemiBold.ttf"),
  });

  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (!fontsLoaded || initializing) {
    return null;
  }

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={(props) => <HomeScreen {...props} user={user} />}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
