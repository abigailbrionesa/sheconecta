import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";
import { uiStyle } from "../../../utils/uiStyle";


const HomeScreen = () => {
  const [userEmail, setUserEmail] = useState('');
  
  useEffect(() => {
    const currentUser = FIREBASE_AUTH.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
    }
  }, []);

  const handleLogout = () => {
    FIREBASE_AUTH.signOut();
  };

  return (
<<<<<<< HEAD
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Bienvenido a SheConecta! {userEmail ? `(${userEmail})` : ''}
      </Text>
=======
    <View style={uiStyle.container}>
      <Text>Bienvenido a gregegeSheConecta! {user.email} </Text>
>>>>>>> main

      <View style={styles.buttonContainer}>
        <Button title="Cerrar sesión" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
  }
});

export default HomeScreen;