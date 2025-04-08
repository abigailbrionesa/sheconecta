import React from "react";
import { View, Text, Button } from "react-native";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";
import { uiStyle } from "../../../utils/uiStyle";


const HomeScreen = ({ user }) => {
  const handleLogout = () => {
    FIREBASE_AUTH.signOut();
  };

  return (
    <View style={uiStyle.container}>
      <Text>Bienvenido a gregegeSheConecta! {user.email} </Text>

      <View>
        <Button title="Cerrar sesión" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default HomeScreen;
