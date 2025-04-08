import { View, ImageBackground } from "react-native";
import { Text } from "react-native";
import backgroundStyle from "../../../utils/backgroundStyle";

const Login = () => {
  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View style={{ padding: 20, marginTop: 100 }}>
        <Text>Login</Text>
      </View>
    </ImageBackground>
  );
};

export default Login;
