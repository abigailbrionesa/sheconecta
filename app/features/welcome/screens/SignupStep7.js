import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, Animated } from "react-native";
import { useRoute } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { ImageBackground } from "react-native";
import NextButton from "../components/NextButton";
import GoBackButton from "../components/GoBackButton";

const SignupStep7 = ({ navigation }) => {
  const route = useRoute();
  const areas = ["Ciencia", "Tecnología", "Ingeniería", "Matemática"];
  const [selectedAreas, setSelectedAreas] = useState([]);
  const fadeAnim = new Animated.Value(0);
  
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

  const handleContinue = () => {
    if (selectedAreas.length === 0) {
      Alert.alert("Por favor selecciona al menos un área.");
      return;
    }

    // Navigate to Step6 in your new flow
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
      selectedAreas, // Pass the selected areas
      // No instagram, linkedin or image yet since they come later in the flow
    });
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
    justifyContent: 'center',
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedAreaButton: {
    backgroundColor: "#6F9CEB",
    borderWidth: 0,
  },
  areaButtonText: {
    color: "#4A4A4A",
    fontSize: 16,
    fontWeight: "500",
  },
  selectedAreaButtonText: {
    color: "white",
    fontWeight: "600",
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default SignupStep7;