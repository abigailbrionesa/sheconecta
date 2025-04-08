import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  TextInput,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle"; // Importing uiStyle
import { fontStyle } from "../../../utils/fontStyle"; // Importing fontStyle
import { backgroundStyle } from "../../../utils/backgroundStyle"; // Importing backgroundStyle

const Signup = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");
  const [skills, setSkills] = useState("");
  const [type, setType] = useState("");
  const [mentorId, setMentorId] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const auth = FIREBASE_AUTH;
  const db = getFirestore();

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = response.user;
      const userData = {
        email,
        bio,
        type,
        name:
          user.displayName ||
          (type === "Mentora" ? "Mentora Y" : "Estudiante X"),
      };

      if (type === "Estudiante") {
        userData.interests = interests.split(", ");
        userData.mentorId = mentorId || null;
      } else if (type === "Mentora") {
        userData.skills = skills.split(", ");
      }

      await setDoc(doc(db, "users", user.uid), userData);
      console.log("Signup and Firestore write successful");
    } catch (error) {
      console.error("Signup error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View style={uiStyle.container}>
        <Text style={fontStyle.h1}>Registrarse en SheConecta</Text>

        <TextInput
          style={uiStyle.input} 
          value={email}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={setEmail}
        />
        <TextInput
          style={uiStyle.input} 
          secureTextEntry
          value={password}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={setPassword}
        />

        <DropDownPicker
          open={open}
          value={type}
          items={[
            { label: "Estudiante", value: "Estudiante" },
            { label: "Mentora", value: "Mentora" },
          ]}
          setOpen={setOpen}
          setValue={setType}
          style={uiStyle.input}
          containerStyle={{ marginBottom: 10 }}
        />

        {type === "Estudiante" && (
          <>
            <TextInput
              style={uiStyle.input} 
              value={interests}
              placeholder="Intereses (separados por coma)"
              onChangeText={setInterests}
            />
            <TextInput
              style={uiStyle.input} 
              value={mentorId}
              placeholder="ID de tu mentora (si ya tienes una)"
              onChangeText={setMentorId}
            />
          </>
        )}
        {type === "Mentora" && (
          <TextInput
            style={uiStyle.input}
            value={skills}
            placeholder="Habilidades (separadas por coma)"
            onChangeText={setSkills}
          />
        )}

        <TextInput
          style={uiStyle.input}
          value={bio}
          placeholder="Bio (solo para registro)"
          onChangeText={setBio}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Crear cuenta" onPress={signUp} />
        )}

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text> 
            ¿Ya tienes cuenta? <Text>Inicia Sesión</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Signup;
