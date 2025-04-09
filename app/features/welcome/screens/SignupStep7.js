import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { ImageBackground } from "react-native";
import NextButton from "../components/NextButton";
import GoBackButton from "../components/GoBackButton";
//import React from "react";
//import { styles } from "./SignupStep3";

const SignupStep7 = ({ navigation }) => {
  const route = useRoute();
  const areas = ["Ciencia", "Tecnología", "Ingeniería", "Matemática"];

  const [selectedAreas, setSelectedAreas] = useState([]);

  const {
    email,
    password,
    firstName,
    lastName,
    birthDate,
    role,
    experience,
    city,
    university,
    career,
    instagram,
    linkedin,
    image,
  } = route.params;

  const handleAreaSelect = (area) => {
    setSelectedAreas((prevAreas) => {
      if (prevAreas.includes(area)) {
        return prevAreas.filter((item) => item !== area);
      } else {
        return [...prevAreas, area];
      }
    });
  };

  const handleContinue = () => {
    if (selectedAreas.length === 0) {
      Alert.alert("Por favor selecciona al menos un área.");
      return;
    }

    navigation.navigate("SignupStep6", {
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
      instagram: instagram || "",
      linkedin: linkedin || "",
      image,
      selectedAreas,
    });
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <Image 
          source={require("../../../../assets/orchid.png")} 
          style={styles.orchidImage} 
        />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={[fontStyle.h2, fontStyle.light]}>¿Cuál es el área de tu interés?</Text>

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
                <Text style={styles.areaButtonText}>{area}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <GoBackButton onPress={() => navigation.goBack()} />
          <NextButton onPress={handleContinue} />
        </View>


      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    justifyContent: "space-between",
    padding: 20,
  },
  orchidImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 20,
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
    justifyContent: 'space-center',
    width: '100%',
    position: 'absolute',
    alignItems: "center",
    bottom: 30,
    paddingHorizontal: 20,
  },
  areaButton: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    margin: 8,
    minWidth: 120,
    alignItems: "center",
  },
  selectedAreaButton: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 3,
    borderColor: "#007AFF",
  },
  areaButtonText: {
    color: "#4A4A4A",
    fontSize: 16,
    fontWeight: "500",
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  backButton: {
    width: 120,
  },
  nextButton: {
    width: 120,
    backgroundColor: "#6F9CEB",
    borderRadius: 20,
  },
});

export default SignupStep7;