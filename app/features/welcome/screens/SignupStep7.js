<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, Animated } from "react-native";
=======
import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
>>>>>>> main
import { useRoute } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { Text } from "react-native";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { ImageBackground } from "react-native";
import NextButton from "../components/NextButton";
import GoBackButton from "../components/GoBackButton";
<<<<<<< HEAD

const SignupStep7 = ({ navigation }) => {
  const route = useRoute();
  const areas = ["Ciencia", "Tecnología", "Ingeniería", "Matemática"];
  const [selectedAreas, setSelectedAreas] = useState([]);
  const fadeAnim = new Animated.Value(0);
  
=======
import { fontStyle } from "../../../utils/fontStyle";
import { ScrollView } from "react-native";

const SignupStep7 = ({ navigation }) => {
  const route = useRoute();
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");

>>>>>>> main
  const {
    email,
    password,
    firstName,
    lastName,
    age,
    role,
<<<<<<< HEAD
    city,
    university,
    career,
    experience,
  } = route.params;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleAreaSelect = (area) => {
    setSelectedAreas((prevAreas) => {
      if (prevAreas.includes(area)) {
        return prevAreas.filter((item) => item !== area);
      } else {
        return [...prevAreas, area];
      }
    });
  };

=======
    departamento,
    provincia,
    university,
    career,
    experience,
    languages: selectedLanguages,

  } = route.params;

>>>>>>> main
  const handleContinue = () => {
    navigation.navigate("SignupStep8", {
      email,
      password,
      firstName,
      lastName,
      age,
      role,
      departamento,
      provincia,
      university,
      career,
      experience,
<<<<<<< HEAD
      selectedAreas,
=======
      languages: selectedLanguages,
      instagram: instagram || "",
      linkedin: linkedin || "",
>>>>>>> main
    });
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
<<<<<<< HEAD
      <View style={styles.container}>
        <Image 
          source={require("../../../../assets/orchid.png")} 
          style={styles.orchidImage} 
        />
        
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <Text style={[fontStyle.h2, fontStyle.light, {marginTop:-50}]}>¿Cuál es el área de tu interés?</Text>

          <View style={styles.areasContainer}>
            {areas.map((area) => (
              <TouchableOpacity
                key={area}
                style={[
                  styles.areaButton,
                  selectedAreas.includes(area) && styles.selectedAreaButton,
                ]}
                onPress={() => handleAreaSelect(area)}
              >
                <Text 
                  style={[
                    styles.areaButtonText,
                    selectedAreas.includes(area) && styles.selectedAreaButtonText
                  ]}
                >
                  {area}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        <View style={styles.navigationContainer}>
=======
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={[
          uiStyle.container,
          { gap: 15, flex: 1, justifyContent: "space-between" },
        ]}
      >
        <View style={{ gap: 15 }}>
          <Text style={[fontStyle.h2, fontStyle.light]}>Añade tus redes sociales (opcional)</Text>
          
          <Text style={[fontStyle.h3, fontStyle.light]}>Instagram</Text>
          <TextInput
            style={uiStyle.input}
            value={instagram}
            placeholder="Escribe aquí..."
            onChangeText={setInstagram}
          />

          <Text style={[fontStyle.h3, fontStyle.light]}>LinkedIn</Text>
          <TextInput
            style={uiStyle.input}
            value={linkedin}
            placeholder="Escribe aquí..."
            onChangeText={setLinkedin}
          />
        </View>
        
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
>>>>>>> main
          <GoBackButton onPress={() => navigation.goBack()} />
          <NextButton onPress={handleContinue} />
        </View>
      </View>
      </ScrollView>


    </ImageBackground>
  );
};

<<<<<<< HEAD
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
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 50,
  },
  areasContainer: {
    flexDirection: 'row',
    flexWrap: "wrap",
    gap: 10,
    justifyContent: 'space-between',
    width: '100%',
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  areaButton: {
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '48%',
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedAreaButton: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 3,
    borderColor: "#007AFF",
  },
  areaButtonText: {
    fontSize: 20,
    fontWeight: '500',
  },
  buttonSubtitle: {
    fontSize: 14,
  },
});

export default SignupStep7;
=======
export default SignupStep7;
>>>>>>> main
