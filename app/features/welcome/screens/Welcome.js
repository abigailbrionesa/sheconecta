import React from "react";
import { View, ImageBackground } from "react-native";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import LoginHeader from "../components/LoginHeader";
import { useNavigation } from "@react-navigation/native";
import Button1 from "../components/Button1";

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View style={{ padding: 20, marginTop: 100 }}>
        <LoginHeader />
        <View style={{ gap: 15, padding:40 }}>
          <Button1 color="#bf77a9" onPress={() => navigation.navigate("SignUp")}>
            Crear Cuenta
          </Button1>
          <Button1 onPress={() => navigation.navigate("Login")}>
            Iniciar Sesión
          </Button1>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Welcome;
