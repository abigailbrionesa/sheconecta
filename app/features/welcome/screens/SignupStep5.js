import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { fontStyle } from "../../../utils/fontStyle";
import NextButton from "../components/NextButton";
import GoBackButton from "../components/GoBackButton";
import DropDownPicker from "react-native-dropdown-picker";
import {
  public_universities,
  private_universities,
} from "../../../utils/universitiesList";
import { careers } from "../../../utils/careersList";
import TagSelector from "../../opportunities/components/TagSelector";

const SignupStep5 = ({ navigation }) => {
  const route = useRoute();
  const [universityType, setUniversityType] = useState(null);
  const [university, setUniversity] = useState(null);
  const [career, setCareer] = useState(null);
  const [experience, setExperience] = useState("");

  const [uniOpen, setUniOpen] = useState(false);
  const [careerOpen, setCareerOpen] = useState(false);

  const [selectedTags, setSelectedTags] = useState([]);

  const universityTypeOptions = ["Privada", "Pública"];

  const {
    email,
    password,
    firstName,
    lastName,
    age,
    role,
    departamento,
    provincia,
  } = route.params;

  const validateCityUniversityCareer = () => {
    if (!university || !career) {
      Alert.alert(
        "Error",
        "Por favor, completa los campos de universidad y carrera."
      );
      return false;
    }
    return true;
  };

  const goToStep6 = () => {
    if (validateCityUniversityCareer()) {
      navigation.navigate("SignupStep6", {
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
      });
    }
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags([]);
      setUniversityType(null);
      setUniversity(null);
      setCareer(null);
    } else {
      setSelectedTags([tag]);
      const type = tag.toLowerCase();
      setUniversityType(type);
      setUniversity(null);
      setCareer(null);
    }
  };

  const formattedUniversities =
    universityType === "privada"
      ? private_universities.map((item) => ({ ...item, key: item.value }))
      : public_universities.map((item) => ({ ...item, key: item.value }));

  const formattedCareers = careers.map((item) => ({
    ...item,
    key: item.value,
  }));

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View
          style={[
            uiStyle.container,
            { gap: 15, flex: 1, justifyContent: "space-between" },
          ]}
        >
          <View style={{ gap: 15 }}>
            <Text style={[fontStyle.h2, fontStyle.light]}>
              Cuéntanos un poco más sobre ti
            </Text>

            <Text style={[fontStyle.h3, fontStyle.light]}>Universidad:</Text>
            <TagSelector
              tags={universityTypeOptions}
              selectedTags={selectedTags}
              toggleTag={toggleTag}
            />

            {universityType && (
              <>
                <Text style={[fontStyle.h3, fontStyle.light]}>Universidad</Text>
                <DropDownPicker
                  open={uniOpen}
                  setOpen={setUniOpen}
                  value={university}
                  setValue={setUniversity}
                  items={formattedUniversities}
                  style={uiStyle.input}
                  placeholder="Selecciona tu universidad"
                  zIndex={3000}
                  zIndexInverse={1000}
                />
              </>
            )}

            {university && (
              <>
                <Text style={[fontStyle.h3, fontStyle.light]}>Carrera</Text>
                <DropDownPicker
                  open={careerOpen}
                  setOpen={setCareerOpen}
                  value={career}
                  setValue={setCareer}
                  items={formattedCareers}
                  style={uiStyle.input}
                  placeholder="Selecciona tu carrera"
                  zIndex={2000}
                  zIndexInverse={2000}
                />
              </>
            )}

            {career && (
              <>
                <Text style={[fontStyle.h3, fontStyle.light]}>
                  Años de experiencia
                </Text>
                <TextInput
                  style={uiStyle.input}
                  value={experience}
                  placeholder="Años de experiencia"
                  keyboardType="numeric"
                  onChangeText={setExperience}
                />
              </>
            )}
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <GoBackButton onPress={() => navigation.goBack()} />
            <NextButton onPress={goToStep6} />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default SignupStep5;