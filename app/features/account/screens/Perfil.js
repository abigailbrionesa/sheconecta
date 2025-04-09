import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../../FirebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { fontStyle } from "../../../utils/fontStyle";
import { ImageBackground } from "react-native";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import GoBackButton from "../../welcome/components/GoBackButton";
import NextButton from "../../welcome/components/NextButton";
import { uiStyle } from "../../../utils/uiStyle";
import { getDoc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function Perfil() {
  const user = FIREBASE_AUTH.currentUser;
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editando, setEditando] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    career: "",
    city: "",
    experienceLevel: "",
    interestAreas: [],
    profilePictureUrl: "",
    score: 0,
    university: "",
    socialLinks: {},
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = doc(FIREBASE_DB, "users", user.uid);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setNombre(data.name || "");
        setDescripcion(data.descripcion || "");
        setUserData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          birthDate: data.birthDate || "",
          career: data.career || "",
          city: data.city || "",
          experienceLevel: data.experienceLevel || "",
          interestAreas: data.interestAreas || [],
          profilePictureUrl: data.profilePictureUrl || "",
          score: data.score || 0,
          university: data.university || "",
          socialLinks: data.socialLinks || {},
        });
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  const handleGuardar = async () => {
    const userDoc = doc(FIREBASE_DB, "usuarios", user.uid);
    await setDoc(
      userDoc,
      {
        nombre,
        descripcion,
      },
      { merge: true }
    );

    setEditando(false);
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View style={{ alignItems: "center", marginTop: 80,  }}>
        <Image
          source={{ uri: userData.profilePictureUrl }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
<Button title="Cerrar sesión" onPress={handleLogout} color="red" />

        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            width: "100%",
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={[fontStyle.h3, fontStyle.dark]}>
            {userData.firstName} {userData.lastName}
          </Text>

          <Text style={[fontStyle.p, fontStyle.dark]}>{user.email}</Text>

          <Text style={[fontStyle.h4, fontStyle.pink]}>
            Puntuación: {userData.score}{" "}
          </Text>

          <View style={{backgroundColor: "#e6dafd", width: "100%", padding:20,}}>

            <Text style={[fontStyle.h4, fontStyle.gray]}>Carrera:{userData.career}</Text>

            <Text style={[fontStyle.h4, fontStyle.gray]}>{userData.city}</Text>

            <Text style={fontStyle.h3}>Nivel de experiencia:</Text>
            <Text>{userData.experienceLevel}</Text>

            <Text style={fontStyle.h3}>Áreas de interés:</Text>
            {userData.interestAreas.length > 0 ? (
              userData.interestAreas.map((area, index) => (
                <Text key={index}>{area}</Text>
              ))
            ) : (
              <Text>No specified interest areas</Text>
            )}

            <Text style={fontStyle.h3}>Universidad:</Text>
            <Text>{userData.university}</Text>

            <Text style={fontStyle.h3}>Redes sociales:</Text>
            {userData.socialLinks.instagram ? (
              <Text>Instagram: {userData.socialLinks.instagram}</Text>
            ) : (
              <Text>Instagram: No disponible</Text>
            )}
            {userData.socialLinks.linkedin ? (
              <Text>LinkedIn: {userData.socialLinks.linkedin}</Text>
            ) : (
              <Text>LinkedIn: No disponible</Text>
            )}

            <Text style={fontStyle.h3}>Foto de perfil:</Text>

            <Text style={fontStyle.h3}>Nombre:</Text>
            {editando ? (
              <TextInput
                value={nombre}
                onChangeText={setNombre}
                style={fontStyle.h3}
              />
            ) : (
              <Text>{nombre}</Text>
            )}
          </View>

          <Button
            title={editando ? "Guardar cambios" : "Editar perfil"}
            onPress={editando ? handleGuardar : () => setEditando(true)}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
