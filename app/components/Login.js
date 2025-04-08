import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import DropDownPicker from "react-native-dropdown-picker"; 

const Login = () => {
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

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;
      if (type === "Estudiante") {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName || "Estudiante X",
          type: "Estudiante",
          interests: interests.split(", "), 
          email: email,
          mentorId: mentorId || null, 
        });
      } else if (type === "Mentora") {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName || "Mentora Y",
          type: "Mentora",
          skills: skills.split(", "),
          email: email,
        });
      }

      console.log("Signup and Firestore write successful");
    } catch (error) {
      console.error("Signup error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login / Sign Up</Text>

      <TextInput
        style={styles.input}
        value={email}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={password}
        placeholder="Password"
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
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
        style={styles.input}
        containerStyle={{ marginBottom: 10 }}
      />

      {type === "Estudiante" && (
        <>
          <TextInput
            style={styles.input}
            value={interests}
            placeholder="Intereses (separados por coma)"
            onChangeText={(text) => setInterests(text)}
          />
          <TextInput
            style={styles.input}
            value={mentorId}
            placeholder="ID de tu mentora (si ya tienes una)"
            onChangeText={(text) => setMentorId(text)}
          />
        </>
      )}
      {type === "Mentora" && (
        <TextInput
          style={styles.input}
          value={skills}
          placeholder="Habilidades (separadas por coma)"
          onChangeText={(text) => setSkills(text)}
        />
      )}

      <TextInput
        style={styles.input}
        value={bio}
        placeholder="Bio (solo para registro)"
        onChangeText={(text) => setBio(text)}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button title="Login" onPress={signIn} />
          <View style={styles.spacer} />
          <Button title="Create Account" onPress={signUp} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
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
});

export default Login;