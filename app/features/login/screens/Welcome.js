import { useNavigation } from "@react-navigation/native";

export const Welcome = () => {
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
