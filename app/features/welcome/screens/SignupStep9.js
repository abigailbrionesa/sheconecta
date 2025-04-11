import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ImageBackground,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import NextButton from "../components/NextButton";
import GoBackButton from "../components/GoBackButton";
import TagSelector from "../../opportunities/components/TagSelector";
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
    languages,
    instagram,
    linkedin,
    image,
  } = route.params;

  const handleAreaSelect = (area) => {
    setSelectedAreas((prevAreas) =>
      prevAreas.includes(area)
        ? prevAreas.filter((item) => item !== area)
        : [...prevAreas, area]
    );
  };

  const handleContinue = () => {
    if (!selectedAreas.length) {
      Alert.alert("Por favor selecciona al menos un área.");
      return;
    }

    navigation.navigate("SubscriptionStack", {
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
      languages,
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

        <View
          style={[
            uiStyle.container,
            { gap: 40, flex: 1, justifyContent: "space-between" },
          ]}
        >       
        
        <View >
          <Text style={[fontStyle.h2, fontStyle.light, {marginBottom: 15}]}>
            ¿Cuál es el área de tu interés?
          </Text>


  <TagSelector
    tags={areas}
    selectedTags={selectedAreas}
    toggleTag={handleAreaSelect} 
  />
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
    alignItems: "center",
  },
  orchidImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  areasContainer: {
    width: "100%",
    marginTop: 20,
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
  orchidImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 120,
  },
});

export default SignupStep9;
