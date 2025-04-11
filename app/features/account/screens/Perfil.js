import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  ActivityIndicator,
  Image,
  ImageBackground,
} from "react-native";
import { signOut } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../../FirebaseConfig";
import { fontStyle } from "../../../utils/fontStyle";
import { uiStyle } from "../../../utils/uiStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import Button1 from "../../welcome/components/Button1";

export default function Perfil() {
  const user = FIREBASE_AUTH.currentUser;
  const [editando, setEditando] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePictureUrl: "",
    career: "",
    city: "",
    experienceLevel: "",
    interestAreas: [],
    university: "",
    socialLinks: {},
    score: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const userDoc = doc(FIREBASE_DB, "users", user.uid);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData({
          ...data,
          email: user.email,
        });
      }
      setLoading(false);
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

  const handleSave = async () => {
    setLoading(true);
    const userDoc = doc(FIREBASE_DB, "users", user.uid);
    try {
      await setDoc(userDoc, userData, { merge: true });
      setEditando(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setUserData((prevState) => ({ ...prevState, [field]: value }));
  };

  if (loading) {
    return (
      <View style={uiStyle.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View
        style={{ alignItems: "center", marginTop: 50, paddingHorizontal: 20 }}
      >
        <Image
          source={{ uri: userData.profilePictureUrl }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            marginBottom: 20,
          }}
        />


        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            alignItems: "center",
            width: "100%",
            gap:15,
          }}
        >

          <View style={{gap:5, alignItems:"center"}}>
          <Text style={[fontStyle.h2, fontStyle.dark]}>
            {userData.firstName} {userData.lastName}
          </Text>
          <Text style={[fontStyle.p, fontStyle.dark]}>{userData.email}</Text>
          </View>
          <Text style={[fontStyle.h4, fontStyle.pink]}>
            Puntuación: {userData.score}
          </Text>

          <View
            style={{
              backgroundColor: "#f1e9ff",
              padding: 15,
              borderRadius: 8,
              marginTop: 20,
              width: "100%",
            }}
          >
            <Text style={[fontStyle.p, fontStyle.dark]}>
              Carrera: {userData.career}
            </Text>
            <Text style={[fontStyle.p, fontStyle.dark]}>
              Años de experiencia: {userData.experience}
            </Text>
            <Text style={[fontStyle.p, fontStyle.dark]}>
              Áreas de interés:{" "}
              {userData.interestAreas.length > 0 ? (
                userData.interestAreas.map((area, index) => (
                  <Text key={index}>{area} - </Text>
                ))
              ) : (
                <Text>No especificadas</Text>
              )}
            </Text>

            <Text style={[fontStyle.p, fontStyle.dark]}>
              Universidad: {userData.university}
            </Text>

            {userData.socialLinks.instagram ? (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="logo-instagram" size={20} color="#E4405F" />
                <Text style={[fontStyle.p, fontStyle.gray, { marginLeft: 8 }]}>
                  {userData.socialLinks.instagram}
                </Text>
              </View>
            ) : (
              <Text></Text>
            )}

            {userData.socialLinks.linkedin ? (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="logo-linkedin" size={20} color="#0077B5" />
                <Text style={[fontStyle.p, fontStyle.gray, { marginLeft: 8 }]}>
                  {userData.socialLinks.linkedin}
                </Text>
              </View>
            ) : (
              <Text></Text>
            )}
          </View>


            <View style={{flexDirection:"row", justifyContent:"space-between", width:"100%",}}>
          <Button1
          onPress={handleLogout}
          icon={<Ionicons name="log-out-outline" size={20} color="white" />}
          color="#ab4769"
        >
          Cerrar Sesión
        </Button1>

          <Button1
            onPress={editando ? handleSave : () => setEditando(true)}
            icon={
              <Ionicons
                name={editando ? "save-outline" : "create-outline"}
                size={20}
                color="white"
              />
            }
            color="#769ad4"
          >
            {editando ? "Guardar" : "Editar"}
          </Button1>
          </View>


        </View>
      </View>
    </ImageBackground>
  );
}
