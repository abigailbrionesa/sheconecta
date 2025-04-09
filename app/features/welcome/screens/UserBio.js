import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const UserBio = () => {
  const navigation = useNavigation();
  const [bio, setBio] = useState("");
  const db = getFirestore();

  const handleNext = async () => {
    try {
      const user = FIREBASE_AUTH.currentUser;
      if (user && bio.trim() !== "") {
        // Actualizar el perfil del usuario con la biografía
        await updateDoc(doc(db, "users", user.uid), {
          bio: bio.trim()
        });
        console.log("Perfil actualizado con biografía");
      }
      // Navegar a la siguiente pantalla
      navigation.navigate('ProfilePhoto');
    } catch (error) {
      console.error("Error actualizando biografía:", error);
      // Intentar navegar aunque falle la actualización
      navigation.navigate('ProfilePhoto');
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View style={styles.container}>
        <View style={styles.orchidImageContainer}>
          <View style={styles.orchidPlaceholder} />
        </View>
        
        <Text style={[fontStyle.h1, styles.headerText]}>Haz que te conozcan...</Text>
        
        <Text style={styles.subtitle}>
          Escribe lo que te apasiona, tus sueños, metas, lo que más te gustaría aprender...
        </Text>
        
        <TextInput
          style={styles.bioInput}
          value={bio}
          placeholder="Escribe aquí..."
          placeholderTextColor="#AAAAAA"
          multiline={true}
          numberOfLines={6}
          textAlignVertical="top"
          onChangeText={setBio}
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
    alignItems: 'center',
  },
  orchidImageContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  orchidPlaceholder: {
    // Este espacio es para la orquídea que se ve en la imagen
    width: 80,
    height: 80,
  },
  headerText: {
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  bioInput: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: '100%',
    height: 150,
    fontSize: 16,
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

export default UserBio;