import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const Profileopc = () => {
  const navigation = useNavigation();
  const [selectedType, setSelectedType] = useState(null);
  const db = getFirestore();

  const handleSelection = (type) => {
    setSelectedType(type);
  };

  const handleNext = async () => {
    if (selectedType) {
      try {
        const user = FIREBASE_AUTH.currentUser;
        if (user) {
          await updateDoc(doc(db, "users", user.uid), {
            userType: selectedType
          });
          console.log("Perfil actualizado con tipo de usuario");
        }
        navigation.navigate('ExperienceLevel');
      } catch (error) {
        console.error("Error updating user type:", error);
        navigation.navigate('ExperienceLevel');
      }
    } else {
      alert("Por favor selecciona cómo quieres participar para continuar");
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
        
        <Text style={[fontStyle.h1, styles.headerText]}>¿Cómo quieres participar?</Text>
        
        <TouchableOpacity 
          style={[styles.button, selectedType === 'Estudiante' && styles.selectedButton]}
          onPress={() => handleSelection('Estudiante')}
        >
          <Text style={styles.buttonTitle}>Soy estudiante</Text>
          <Text style={styles.buttonSubtitle}>Quiero aprender</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, selectedType === 'Mentora' && styles.selectedButton]}
          onPress={() => handleSelection('Mentora')}
        >
          <Text style={styles.buttonTitle}>Soy mentora</Text>
          <Text style={styles.buttonSubtitle}>Quiero guiar</Text>
        </TouchableOpacity>

        <View style={styles.navigationContainer}>

          <TouchableOpacity 
            style={[styles.nextButton, !selectedType && styles.disabledButton]}
            onPress={handleNext}
            disabled={!selectedType}
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
  buttonSubtitle: {
    fontSize: 14,
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

export default Profileopc;