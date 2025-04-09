<<<<<<< HEAD
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useFonts } from "expo-font";

import Welcome from "./app/features/welcome/screens/Welcome";
import Login from "./app/features/welcome/screens/Login";
import SignUp from "./app/features/welcome/screens/SignUp";
import HomeScreen from "./app/features/welcome/screens/HomeScreen";
import Profileopc from "./app/features/welcome/screens/Profileopc";
import ExperienceLevel from "./app/features/welcome/screens/ExperienceLevel";
import ProfileInfo from "./app/features/welcome/screens/ProfileInfo";
import InterestArea from "./app/features/welcome/screens/InterestArea";
import Bio from "./app/features/welcome/screens/UserBio";
import ProfilePhoto from "./app/features/welcome/screens/ProfilePhoto";
import Experience from "./app/features/welcome/screens/Experience";

import { ProfileProvider } from "./app/features/welcome/screens/ProfileContext";

const Stack = createNativeStackNavigator();
=======
import Navigation from "./app/infraestructure/Navigation";
import { useFonts } from "expo-font";
>>>>>>> main

export default function App() {
  const [fontsLoaded] = useFonts({
    "AbhayaLibre-Bold": require("./assets/fonts/AbhayaLibre-Bold.ttf"),
    "AbhayaLibre-ExtraBold": require("./assets/fonts/AbhayaLibre-ExtraBold.ttf"),
    "AbhayaLibre-Medium": require("./assets/fonts/AbhayaLibre-Medium.ttf"),
    "AbhayaLibre-Regular": require("./assets/fonts/AbhayaLibre-Regular.ttf"),
    "AbhayaLibre-SemiBold": require("./assets/fonts/AbhayaLibre-SemiBold.ttf"),
  });

<<<<<<< HEAD
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      // Si el usuario cambia de null a un valor (sign up/login)
      if (!user && currentUser) {
        // Si el usuario acaba de registrarse, marcarlo como nuevo
        const creationTime = new Date(currentUser.metadata.creationTime);
        const lastSignInTime = new Date(currentUser.metadata.lastSignInTime);
        
        // Si la diferencia es menor a 10, asumimos que es un usuario nuevo
        setIsNewUser(lastSignInTime - creationTime < 10000);
      }
      
      setUser(currentUser);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, [user]);

  if (!fontsLoaded || initializing) {
=======
  if (!fontsLoaded) {
>>>>>>> main
    return null;
  }

  return (
<<<<<<< HEAD
    <NavigationContainer>
      <ProfileProvider>
        <Stack.Navigator initialRouteName={user ? (isNewUser ? "ProfileInfo" : "HomeScreen") : "Welcome"}>
          {/* Rutas de autenticación */}
          {!user && (
            <>
              <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            </>
          )}
          
          {/* Rutas para usuarios autenticados */}
          {user && (
            <>
              <Stack.Screen name="Profileopc" component={Profileopc} options={{ headerShown: false }} />
              <Stack.Screen name="ExperienceLevel" component={ExperienceLevel} options={{ headerShown: false }} />
              <Stack.Screen name="ProfileInfo" component={ProfileInfo} options={{ headerShown: false }} />
              <Stack.Screen name="InterestArea" component={InterestArea} options={{ headerShown: false }} />
              <Stack.Screen name="UserBio" component={Bio} options={{ headerShown: false }} />
              <Stack.Screen name="ProfilePhoto" component={ProfilePhoto} options={{ headerShown: false }} />
              <Stack.Screen name="Experience" component={Experience} options={{ headerShown: false }} />
              <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            </>
          )}
        </Stack.Navigator>
        <StatusBar style="auto" />
      </ProfileProvider>
    </NavigationContainer>
=======
    <>
      <Navigation />
    </>
>>>>>>> main
  );
}