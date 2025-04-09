import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ProfilePhoto = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const db = getFirestore();
  const storage = getStorage();

  const pickImage = async () => {
    try {
      // Solicitar permisos para acceder a la galería
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        alert('Se necesitan permisos para acceder a la galería');
        return;
      }
      
      // Lanzar el selector de imágenes
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      
      if (!result.cancelled && result.assets && result.assets[0].uri) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error al seleccionar imagen:', error);
      alert('Hubo un error al seleccionar la imagen.');
    }
  };

  const uploadImage = async () => {
    if (!image) return null;

    try {
      setUploading(true);
      
      // Convertir la imagen a blob
      const response = await fetch(image);
      const blob = await response.blob();
      
      // Crear una referencia para la imagen en Firebase Storage
      const user = FIREBASE_AUTH.currentUser;
      const storageRef = ref(storage, `profile_photos/${user.uid}`);
      
      // Subir la imagen
      const snapshot = await uploadBytes(storageRef, blob);
      
      // Obtener la URL de descarga
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setUploading(false);
      return downloadURL;
    } catch (error) {
      console.error('Error al subir imagen:', error);
      setUploading(false);
      return null;
    }
  };

  const handleNext = async () => {
    try {
      const user = FIREBASE_AUTH.currentUser;
      
      if (user && image) {
        // Subir la imagen y obtener la URL
        const photoURL = await uploadImage();
        
        if (photoURL) {
          // Actualizar el perfil del usuario con la URL de la foto
          await updateDoc(doc(db, "users", user.uid), {
            photoURL
          });
          console.log("Perfil actualizado con foto");
        }
      }
      // Navegar a la siguiente pantalla
      navigation.navigate('Experience');
    } catch (error) {
      console.error("Error actualizando foto de perfil:", error);
      // Intentar navegar aunque falle la actualización
      navigation.navigate('Experience');
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View style={styles.container}>
        <Text style={[fontStyle.h1, styles.headerText]}>Foto de perfil</Text>
        
        <TouchableOpacity style={styles.photoContainer} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholderContainer}>
              <FontAwesome name="user-circle-o" size={60} color="#CCCCCC" />
            </View>
          )}
          
          <View style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Subir foto...</Text>
            <FontAwesome name="upload" size={16} color="#8ca3d8" />
          </View>
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
            disabled={uploading}
          >
            <Text style={styles.nextButtonText}>{uploading ? 'Subiendo...' : 'Next'}</Text>
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
    justifyContent: 'center'
  },
  headerText: {
    textAlign: 'center',
    marginBottom: 40,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  placeholderContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#8ca3d8',
    marginRight: 8,
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

export default ProfilePhoto;