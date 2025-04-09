import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const ProfileInfo = () => {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [pais, setPais] = useState("");
  const [carrera, setCarrera] = useState("");
  const [universidad, setUniversidad] = useState("");
  
  const db = getFirestore();

  const handleNext = async () => {
    try {
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
        await updateDoc(doc(db, "users", user.uid), {
          nombre,
          edad,
          ciudad,
          pais,
          carrera,
          universidad
        });
        console.log("Perfil actualizado con información básica");
      }
      navigation.navigate('InterestArea');
    } catch (error) {
      console.error("Error actualizando información de perfil:", error);
      navigation.navigate('InterestArea');
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View style={styles.container}>
        <Text style={[fontStyle.h1, styles.headerText]}>Completa tu perfil</Text>
        
        <Text style={styles.labelText}>Nombre y Apellido</Text>
        <TextInput
          style={uiStyle.input}
          value={nombre}
          placeholder="Escribe aquí..."
          onChangeText={setNombre}
        />
        
        <Text style={styles.labelText}>Edad</Text>
        <TextInput
          style={uiStyle.input}
          value={edad}
          placeholder="Escribe aquí..."
          keyboardType="numeric"
          onChangeText={setEdad}
        />
        
        <Text style={styles.labelText}>Ciudad</Text>
        <TextInput
          style={uiStyle.input}
          value={ciudad}
          placeholder="Escribe aquí..."
          onChangeText={setCiudad}
        />
        
        <Text style={styles.labelText}>País</Text>
        <TextInput
          style={uiStyle.input}
          value={pais}
          placeholder="Escribe aquí..."
          onChangeText={setPais}
        />
        
        <Text style={styles.labelText}>Carrera</Text>
        <TextInput
          style={uiStyle.input}
          value={carrera}
          placeholder="Escribe aquí..."
          onChangeText={setCarrera}
        />
        
        <Text style={styles.labelText}>Universidad</Text>
        <TextInput
          style={uiStyle.input}
          value={universidad}
          placeholder="Escribe aquí..."
          onChangeText={setUniversidad}
        />

        <View style={styles.navigationContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.nextButton}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    textAlign: 'center',
    marginVertical: 20,
  },
  labelText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 12,
    marginBottom: 8,
    color: 'white',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 30,
    paddingHorizontal: 20,
  },
  backButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  backButtonText: {
    color: '#8ca3d8',
    fontSize: 18,
  },
  nextButton: {
    backgroundColor: '#6d8bd9',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
  }
});

export default ProfileInfo;