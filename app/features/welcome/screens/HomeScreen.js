import React from "react";
import { View, Text, Button } from "react-native";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";

const HomeScreen = ({ user }) => {
  const handleLogout = () => {
    FIREBASE_AUTH.signOut();
  };

  return (
    <View>
      <Text>Bienvenido a SheConecta! {user.email} </Text>

      <View>
        <Button title="Cerrar sesión" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default HomeScreen;
