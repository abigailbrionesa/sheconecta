import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { ImageBackground } from "react-native";
import NextButton from "../components/NextButton";
import GoBackButton from "../components/GoBackButton";

const SignupStep9 = ({ navigation }) => {
  const route = useRoute();
  const areas = ["Ciencia", "Tecnología", "Ingeniería", "Matemática"];

  const [selectedAreas, setSelectedAreas] = useState([]);

  const {
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
    if (!selectedAreas || selectedAreas.length === 0) {
      Alert.alert("Por favor selecciona al menos un área.");
      return;
    }
  
    navigation.navigate("SignupStep10", {
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

          <View>
            {areas.map((area) => (
              <TouchableOpacity
                key={area}
                style={[
                  styles.areaButton,
                  selectedAreas.includes(area) && styles.selectedAreaButton,
                ]}
                onPress={() => handleAreaSelect(area)}
              >
                <Text style={fontStyle.h4}>{area}</Text>
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
    borderColor: "purple",
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

export default SignupStep9;