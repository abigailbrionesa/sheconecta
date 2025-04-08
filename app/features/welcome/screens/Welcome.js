import { useNavigation } from "@react-navigation/native";
import { View, Button, ImageBackground } from "react-native";
import LoginHeader from "../components/LoginHeader";
import { backgroundStyle } from "../../../utils/backgroundStyle";
const Welcome = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
    source={require("../../../../assets/background.png")}
    style={backgroundStyle.background}
  >   
      <View style={{ padding: 20, marginTop: 100 }}>
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