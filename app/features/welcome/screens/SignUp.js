import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  TextInput,
  View,
  Text,
  ImageBackground,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";

const SignUp = ({ route }) => {
  const navigation = useNavigation();
  const { userType, experienceLevel } = route.params || { userType: 'Estudiante', experienceLevel: 'beginner' };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const auth = FIREBASE_AUTH;
  const db = getFirestore();

  const signUp = async () => {
    setLoading(true);
    setError("");
    
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }
    
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signup successful:", response);
      
      await setDoc(doc(db, "users", response.user.uid), {
        email: email,
        userType: userType,
        experienceLevel: experienceLevel,
        createdAt: new Date(),
        //isProfileComplete: false,
      });
      
      const [isProfileComplete, setIsProfileComplete] = useState(null);

      //navigation.navigate('Profileopc');
    } catch (error) {
      console.error("Signup error:", error.message);
      
      if (error.code === 'auth/email-already-in-use') {
        setError("Este correo ya está registrado");
      } else if (error.code === 'auth/invalid-email') {
        setError("Correo electrónico inválido");
      } else if (error.code === 'auth/weak-password') {
        setError("La contraseña debe tener al menos 6 caracteres");
      } else {
        setError("Error al crear la cuenta");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View style={{ padding: 20, marginTop: 100 }}>
        <Text style={fontStyle.h1}>Crear Cuenta</Text>
        
        {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}

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
        <TextInput
          style={uiStyle.input}
          secureTextEntry
          value={confirmPassword}
          placeholder="Confirmar contraseña"
          autoCapitalize="none"
          onChangeText={(text) => setConfirmPassword(text)}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Crear Cuenta" onPress={signUp} />
        )}

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>
            ¿Ya tienes cuenta? <Text>Inicia sesión</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SignUp;