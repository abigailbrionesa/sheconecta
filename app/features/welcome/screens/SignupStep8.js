import React, { useState, useEffect } from "react";
import { 
  View, 
  ActivityIndicator, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity,
  Animated,
  ImageBackground
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import GoBackButton from "../components/GoBackButton";

const SignupStep8 = ({ navigation }) => {
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.9);

  const {
    email,
    password,
    firstName,
    lastName,
    birthDate,
    role,
    city,
    university,
    career,
    experience,
    instagram,
    linkedin,
    image,
    selectedAreas,
  } = route.params;

  useEffect(() => {
    console.log("Final signup data:", JSON.stringify({
      email,
      firstName,
      lastName,
      birthDate,
      role,
      city,
      university,
      career,
      experience,
      instagram,
      linkedin, 
      selectedAreas,
    }, null, 2));
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const signUp = async () => {
    if (!email || !password || !firstName || !lastName || !role || !city || !university || !career || !selectedAreas) {
      alert("Error: Missing required information. Please go back and complete all required fields.");
      return;
    }
    
    setLoading(true);
    const auth = FIREBASE_AUTH;
    const db = getFirestore();

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = response.user;

      const userData = {
        type: role,
        email,
        firstName,
        lastName,
        birthDate,
        city,
        career,
        university,
        interestAreas: selectedAreas || [],
        yearsExperience: experience,
        socialLinks: {
          instagram: instagram || null,
          linkedin: linkedin || null,
        },
        profilePictureUrl: image,
        carnetPictureUrl: null,
        score: 0,
        savedContacts: [],
      };

      await setDoc(doc(db, "users", user.uid), userData);
      console.log("Signup successful");
      setSuccess(true);
      
      setTimeout(() => {
        navigation.navigate("Home");
      }, 1500);
      
    } catch (error) {
      console.error("Signup error:", error.message);
      alert("Error al crear la cuenta: " + error.message);
    } finally {
      setLoading(false);
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
        
        <Animated.View 
          style={[
            styles.content, 
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Text style={[fontStyle.h2, fontStyle.light, {marginTop:-60}]}>
            ¡Todo listo para crear tu cuenta!
          </Text>
          
          <Text style={[fontStyle.light, {marginBottom:55}]}>
            Estás a un paso de unirte a nuestra comunidad
          </Text>

          {success ? (
            <View style={styles.successContainer}>
              <Image 
                source={require("../../../../assets/check.png")} 
                style={styles.checkIcon} 
              />
              <Text style={styles.buttonTitle}>¡Cuenta creada con éxito!</Text>
            </View>
          ) : loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FFFFFF" />
              <Text style={styles.loadingText}>Creando tu cuenta...</Text>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.createButton}
              onPress={signUp}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Crear Cuenta</Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        {!loading && !success && (
          <View style={styles.navigationContainer}>
            <GoBackButton onPress={() => navigation.goBack()} />
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  orchidImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 120,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 50,
  },
  createButton: {
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '48%',
    alignItems: 'center',
    marginBottom: 20,
    shadowOffset: {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderWidth: 3,
      borderColor: "#007AFF",
        },
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
  },
  buttonTitle: {
    fontSize: 14,
  },

  loadingContainer: {
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    marginTop: 15,
    fontSize: 16,
  },
  successContainer: {
    alignItems: "center",
  },
  checkIcon: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 20,
  },
  successText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  navigationContainer: {
    marginBottom: 20,
  },
});

export default SignupStep8;