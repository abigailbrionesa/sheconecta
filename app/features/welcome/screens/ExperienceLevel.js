import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const ExperienceLevel = ({ route }) => {
  const navigation = useNavigation();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const userType = route.params?.userType || 'Estudiante';
  const db = getFirestore();

  const handleNext = async () => {
    if (selectedLevel) {
      try {
        const user = FIREBASE_AUTH.currentUser;
        if (user) {
          await updateDoc(doc(db, "users", user.uid), {
            experienceLevel: selectedLevel,
            userType: userType
          });
          console.log("Perfil actualizado con nivel de experiencia");
        }
        navigation.navigate('ProfileInfo');
      } catch (error) {
        console.error("Error updating experience level:", error);
        navigation.navigate('ProfileInfo');
      }
    } else {
      alert("Por favor selecciona tu nivel de experiencia para continuar");
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View style={styles.container}>
        <Image 
          source={require("../../../../assets/orchid.png")} 
          style={styles.orchidImage} 
        />
        
        <Text style={[fontStyle.h1, styles.headerText]}>¿Cuánta experiencia tienes?</Text>
        
        <TouchableOpacity 
          style={[styles.button, selectedLevel === 'beginner' && styles.selectedButton]}
          onPress={() => setSelectedLevel('beginner')}
        >
          <Text style={styles.buttonTitle}>🌱 Recién estoy empezando</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, selectedLevel === 'intermediate' && styles.selectedButton]}
          onPress={() => setSelectedLevel('intermediate')}
        >
          <Text style={styles.buttonTitle}>🌷 Tengo algo de experiencia</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, selectedLevel === 'advanced' && styles.selectedButton]}
          onPress={() => setSelectedLevel('advanced')}
        >
          <Text style={styles.buttonTitle}>💐 Sé bastante del tema</Text>
        </TouchableOpacity>

        <View style={styles.navigationContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.nextButton, !selectedLevel && styles.disabledButton]}
            onPress={handleNext}
            disabled={!selectedLevel}
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  orchidImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  headerText: {
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedButton: {
    backgroundColor: '#e8eeff',
    borderWidth: 2,
    borderColor: '#6d8bd9',
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: '500',
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
  disabledButton: {
    backgroundColor: '#a0a0a0',
    opacity: 0.7,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
  }
});

export default ExperienceLevel;