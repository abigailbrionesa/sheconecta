import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const InterestArea = () => {
  const navigation = useNavigation();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const db = getFirestore();

  const interestOptions = [
    { id: 'ciencia', label: 'Ciencia' },
    { id: 'tecnologia', label: 'Tecnología' },
    { id: 'salud', label: 'Salud' },
    { id: 'ingenieria', label: 'Ingeniería' },
    { id: 'matematica', label: 'Matemática' }
  ];

  const toggleInterest = (id) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(interest => interest !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleNext = async () => {
    try {
      const user = FIREBASE_AUTH.currentUser;
      if (user && selectedInterests.length > 0) {
        // Actualizar el perfil del usuario con los intereses seleccionados
        await updateDoc(doc(db, "users", user.uid), {
          interests: selectedInterests
        });
        console.log("Perfil actualizado con intereses");
      }
      // Navegar a la siguiente pantalla
      navigation.navigate('UserBio');
    } catch (error) {
      console.error("Error actualizando intereses:", error);
      // Intentar navegar aunque falle la actualización
      navigation.navigate('UserBio');
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
        
        <Text style={[fontStyle.h1, styles.headerText]}>¿Cuál es el área de tu interés?</Text>
        
        <View style={styles.interestContainer}>
          {interestOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.interestButton,
                selectedInterests.includes(option.id) && styles.selectedInterest
              ]}
              onPress={() => toggleInterest(option.id)}
            >
              <Text style={[
                styles.interestText,
                selectedInterests.includes(option.id) && styles.selectedInterestText
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

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
    marginBottom: 40,
  },
  interestContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 40,
  },
  interestButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    margin: 6,
  },
  selectedInterest: {
    backgroundColor: '#6d8bd9',
  },
  interestText: {
    fontSize: 16,
    color: '#6d8bd9',
  },
  selectedInterestText: {
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

export default InterestArea;