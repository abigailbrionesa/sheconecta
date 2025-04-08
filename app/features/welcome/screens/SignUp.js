import { View, ImageBackground } from "react-native";
import { Text } from "react-native";
import backgroundStyle from "../../../utils/backgroundStyle";
const SignUp = () => {

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View style={{padding: 20, marginTop: 100}}>
        <Text>SignUp</Text>
      </View>
    </ImageBackground>
  );
};

export default SignUp;