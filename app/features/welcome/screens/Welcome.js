import { useNavigation } from "@react-navigation/native";
import { View, Button, ImageBackground } from "react-native";
import LoginHeader from "../components/LoginHeader";
import { StyleSheet } from "react-native";

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <LoginHeader />

        <Button
          title="CREAR CUENTA"
          onPress={() => navigation.navigate("SignUp")}
        />
        <Button
          title="INICIAR SESIÓN"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
      padding: 20,
      marginTop: 100,
    },
    h1: {
      fontSize: 50,
      color: "white",
      textAlign: "center",
      fontFamily: "AbhayaLibre-ExtraBold",
    },
    h3: {
      fontSize: 20,
      textTransform: "uppercase",
      color: "white",
      letterSpacing:2,
      textAlign: "center",
      fontFamily: "AbhayaLibre-Bold",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
    spacer: {
      height: 10,
    },
    background: {
      width: "100%",
      height: "100%",
}});