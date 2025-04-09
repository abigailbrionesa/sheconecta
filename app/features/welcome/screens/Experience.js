import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";

const Experience = () => {
  const navigation = useNavigation();
  const [experiences, setExperiences] = useState([{ 
    titulo: '', 
    lugar: '', 
    tiempo: '',
    descripcion: '',
    archivo: null
  }]);
  
  const db = getFirestore();

  const addExperience = () => {
    setExperiences([...experiences, { 
      titulo: '', 
      lugar: '', 
      tiempo: '',
      descripcion: '',
      archivo: null
    }]);
  };

  const updateExperienceField = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value
    };
    setExperiences(updatedExperiences);
  };

  const handleNext = async () => {
    try {
      const user = FIREBASE_AUTH.currentUser;
      
      if (user) {
        const validExperiences = experiences.filter(exp => 
          exp.titulo.trim() !== '' || 
          exp.lugar.trim() !== '' || 
          exp.tiempo.trim() !== '' || 
          exp.descripcion.trim() !== ''
        );
        
        if (validExperiences.length > 0) {
          await updateDoc(doc(db, "users", user.uid), {
            experiences: validExperiences
          });
          console.log("Perfil actualizado con experiencias");
        }
      }
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error("Error actualizando experiencias:", error);
      navigation.navigate('HomeScreen');
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.orchidImageContainer}>
            <View style={styles.orchidPlaceholder} />
          </View>
          
          <Text style={[fontStyle.h1, styles.headerText]}>Comparte tu experiencia</Text>
          
          {experiences.map((experience, index) => (
            <View key={index} style={styles.experienceCard}>
              <TextInput
                style={styles.inputTitle}
                value={experience.titulo}
                placeholder="Título"
                onChangeText={(text) => updateExperienceField(index, 'titulo', text)}
              />
              <TextInput
                style={styles.inputField}
                value={experience.lugar}
                placeholder="Lugar"
                onChangeText={(text) => updateExperienceField(index, 'lugar', text)}
              />
              <TextInput
                style={styles.inputField}
                value={experience.tiempo}
                placeholder="Tiempo"
                onChangeText={(text) => updateExperienceField(index, 'tiempo', text)}
              />
              <TextInput
                style={[styles.inputField, styles.descriptionInput]}
                value={experience.descripcion}
                placeholder="Escribe una breve descripción..."
                multiline={true}
                numberOfLines={3}
                textAlignVertical="top"
                onChangeText={(text) => updateExperienceField(index, 'descripcion', text)}
              />
              <TouchableOpacity style={styles.attachButton}>
                <Text style={styles.attachButtonText}>Adjuntar Archivo</Text>
                <MaterialIcons name="attach-file" size={16} color="#8ca3d8" />
              </TouchableOpacity>
            </View>
          ))}
          
          <TouchableOpacity 
            style={styles.addButton}
            onPress={addExperience}
          >
            <MaterialIcons name="add-circle" size={30} color="#6d8bd9" />
          </TouchableOpacity>

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
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    paddingBottom: 100, // Espacio para los botones de navegación
  },
  orchidImageContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  orchidPlaceholder: {
    width: 80,
    height: 80,
  },
  headerText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  experienceCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    width: '100%',
    marginBottom: 20,
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputField: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  descriptionInput: {
    marginTop: 8,
    height: 8,
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

export default Experience;

