import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  TextInput,
  View,
  Text,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { ImageBackground } from "react-native";
import Button1 from "../components/Button1";
import Loading from "../../welcome/components/Loading"

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful:", response);
    } catch (error) {
      console.error("Login error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
          source={require("../../../../assets/background.png")}
          style={backgroundStyle.background}
        >
      <View style={{ padding: 20, marginTop: 100, gap:15 }}>
        <Text style={[fontStyle.h1, fontStyle.light]}>Iniciar Sesión</Text>

        <TextInput
          style={uiStyle.input}
          value={email}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={uiStyle.input}
          secureTextEntry
          value={password}
          placeholder="Contraseña"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        />

        {loading ? (
          <Loading/>
        ) : (
          <Button1  onPress={signIn}>
          Iniciar Sesión
          </Button1>
        )}

        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={[fontStyle.p, fontStyle.light]}>
            ¿No tienes cuenta? <Text>Crea una</Text>
          </Text>
        </TouchableOpacity>


      </View>
      </ImageBackground>
  );
};

export default Login;