import { useNavigation } from "@react-navigation/native";
import { View, Button } from "react-native";
import LoginHeader from "../components/LoginHeader";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { ImageBackground } from "react-native";
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
<<<<<<< HEAD

        <Button
          title="CREAR CUENTA"
          onPress={() => 
            navigation.navigate("SignUp")
          }
        />
        <Button
          title="INICIAR SESIÓN"
          onPress={() => navigation.navigate("Login")}
        />
=======
        <View style={{ gap: 15 }}>
          <Button1 onPress={() => navigation.navigate("SignUp")}>
            Crear Cuenta
          </Button1>
          <Button1 onPress={() => navigation.navigate("Login")}>
            Iniciar Sesión
          </Button1>
        </View>
>>>>>>> main
      </View>
    </ImageBackground>
  );
};

export default Welcome;
