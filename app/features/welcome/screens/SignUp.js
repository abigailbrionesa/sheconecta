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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";
//import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";

const SignUp = ({ route }) => {
  const navigation = useNavigation();
  //const { userType, experienceLevel } = route.params || { userType: 'Estudiante', experienceLevel: 'beginner' };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [city, setCity] = useState("");
  const [career, setCareer] = useState("");
  const [university, setUniversity] = useState("");
  const [interestAreas, setInterestAreas] = useState([]);
  const [interestCategories, setInterestCategories] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [carnetPictureUrl, setCarnetPictureUrl] = useState("");
  const [type, setType] = useState("");
  const [mentorId, setMentorId] = useState("");
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
      // const response = await createUserWithEmailAndPassword(auth, email, password);
      // console.log("Signup successful:", response);
      
      // await setDoc(doc(db, "users", response.user.uid), {
      //   email: email,
      //   userType: userType,
      //   experienceLevel: experienceLevel,
      //   createdAt: new Date(),
      //   //isProfileComplete: false,
      // });
      
      // const [isProfileComplete, setIsProfileComplete] = useState(null);

      // //navigation.navigate('Profileopc');

      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = response.user;

      const userData = {
        email,
        type,
        firstName,
        lastName,
        birthDate: new Date(birthDate).toISOString(),
        city,
        career,
        university,
        interestAreas,
        interestCategories,
        experienceLevel,
        socialLinks: {
          instagram: instagram || null,
          linkedin: linkedin || null,
        },
        profilePictureUrl: profilePictureUrl || null,
        carnetPictureUrl: carnetPictureUrl || null,
        score: 0,
        savedContacts: [],
        publications: [],
      };

      if (type === "Estudiante") {
        userData.mentorId = mentorId || null;
      }

      await setDoc(doc(db, "users", user.uid), userData);
      console.log("Signup and Firestore write successful");


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

    // <ImageBackground
    //   source={require("../../../../assets/background.png")}
    //   style={backgroundStyle.background}
    // >
    //   <View style={{ padding: 20, marginTop: 100 }}>
    //     <Text style={fontStyle.h1}>Crear Cuenta</Text>
        
    //     {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}

    //     <TextInput
    //       style={uiStyle.input}
    //       value={email}
    //       placeholder="Email"
    //       autoCapitalize="none"
    //       onChangeText={(text) => setEmail(text)}
    //     />
    //     <TextInput
    //       style={uiStyle.input}
    //       secureTextEntry
    //       value={password}
    //       placeholder="Contraseña"
    //       autoCapitalize="none"
    //       onChangeText={(text) => setPassword(text)}
    //     />
    //     <TextInput
    //       style={uiStyle.input}
    //       secureTextEntry
    //       value={confirmPassword}
    //       placeholder="Confirmar contraseña"
    //       autoCapitalize="none"
    //       onChangeText={(text) => setConfirmPassword(text)}
    //     />

    //     {loading ? (
    //       <ActivityIndicator size="large" color="#0000ff" />
    //     ) : (
    //       <Button title="Crear Cuenta" onPress={signUp} />
    //     )}

    //     <TouchableOpacity onPress={() => navigation.navigate("Login")}>
    //       <Text>
    //         ¿Ya tienes cuenta? <Text>Inicia sesión</Text>
    //       </Text>
    //     </TouchableOpacity>
    //   </View>
    // </ImageBackground>


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
      <TextInput
        style={uiStyle.input}
        value={firstName}
        placeholder="Primer nombre"
        onChangeText={setFirstName}
      />
      <TextInput
        style={uiStyle.input}
        value={lastName}
        placeholder="Apellido"
        onChangeText={setLastName}
      />
      <TextInput
        style={uiStyle.input}
        value={birthDate}
        placeholder="Fecha de nacimiento"
        onChangeText={setBirthDate}
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

      <DropDownPicker
        open={open}
        value={city}
        items={[
          { label: "Lima", value: "Lima" },
          { label: "Arequipa", value: "Arequipa" },
        ]}
        setOpen={setOpen}
        setValue={setCity}
        style={uiStyle.input}
        containerStyle={{ marginBottom: 10 }}
      />

      <DropDownPicker
        open={open}
        value={career}
        items={[
          { label: "Ingeniería", value: "Ingeniería" },
          { label: "Ciencias", value: "Ciencias" },
        ]}
        setOpen={setOpen}
        setValue={setCareer}
        style={uiStyle.input}
        containerStyle={{ marginBottom: 10 }}
      />

      <DropDownPicker
        open={open}
        value={university}
        items={[
          { label: "PUCP", value: "PUCP" },
          { label: "UNMSM", value: "UNMSM" },
        ]}
        setOpen={setOpen}
        setValue={setUniversity}
        style={uiStyle.input}
        containerStyle={{ marginBottom: 10 }}
      />

      <DropDownPicker
        open={open}
        value={interestAreas}
        items={[
          { label: "Ciencia", value: "ciencia" },
          { label: "Tecnología", value: "tecnologia" },
        ]}
        multiple={true}
        setOpen={setOpen}
        setValue={setInterestAreas}
        style={uiStyle.input}
        containerStyle={{ marginBottom: 10 }}
      />

      <DropDownPicker
        open={open}
        value={experienceLevel}
        items={[
          { label: "Poca experiencia", value: "poca" },
          { label: "Experiencia media", value: "maso" },
          { label: "Mucha experiencia", value: "mucho" },
        ]}
        setOpen={setOpen}
        setValue={setExperienceLevel}
        style={uiStyle.input}
        containerStyle={{ marginBottom: 10 }}
      />

      <TextInput
        style={uiStyle.input}
        value={instagram}
        placeholder="Instagram (opcional)"
        onChangeText={setInstagram}
      />
      <TextInput
        style={uiStyle.input}
        value={linkedin}
        placeholder="LinkedIn (opcional)"
        onChangeText={setLinkedin}
      />

      <TextInput
        style={uiStyle.input}
        value={profilePictureUrl}
        placeholder="URL de foto de perfil (opcional)"
        onChangeText={setProfilePictureUrl}
      />
      <TextInput
        style={uiStyle.input}
        value={carnetPictureUrl}
        placeholder="URL de foto de carnet (opcional)"
        onChangeText={setCarnetPictureUrl}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Crear cuenta" onPress={signUp} />
      )}

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>¿Ya tienes cuenta? Inicia Sesión</Text>
      </TouchableOpacity>
    </View>


  );
};

export default SignUp;