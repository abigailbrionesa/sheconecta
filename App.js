import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./app/features/welcome/screens/Welcome";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useFonts } from "expo-font";
const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    "AbhayaLibre-Bold": require("./assets/fonts/AbhayaLibre-Bold.ttf"),
    "AbhayaLibre-ExtraBold": require("./assets/fonts/AbhayaLibre-ExtraBold.ttf"),
    "AbhayaLibre-Medium": require("./assets/fonts/AbhayaLibre-Medium.ttf"),
    "AbhayaLibre-Regular": require("./assets/fonts/AbhayaLibre-Regular.ttf"),
    "AbhayaLibre-SemiBold": require("./assets/fonts/AbhayaLibre-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null; 
  }
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      console.log("Current User:", currentUser); 
      setUser(currentUser);
    });
    return () => unsubscribe(); 
  }, []);

  if (user === null) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={(props) => (
            <HomeScreen {...props} user={user} />
          )}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

function HomeScreen({ user }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Text>Email: {user.email}</Text>
      <Text>UID: {user.uid}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});