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
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";

const Signup = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  const [open, setOpen] = useState(false);

  const auth = FIREBASE_AUTH;
  const db = getFirestore();

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
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
    </ImageBackground>
  );
};

export default Signup;