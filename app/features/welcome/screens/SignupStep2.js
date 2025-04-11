import React, { useState } from "react";
import {
  View,
  TextInput,
  Alert,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import NextButton from "../components/NextButton";
import GoBackButton from "../components/GoBackButton";
import { formatName } from "../../../utils/formatName";
import { validateBirthDate } from "../../../utils/validateBirthDate";

const SignupStep2 = ({ navigation }) => {
  const route = useRoute();
  const { email, password } = route.params;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [dateFeedback, setDateFeedback] = useState("");

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const validatePersonalInfo = () => {
    if (!firstName || !lastName || !birthDate) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return false;
    }
    return true;
  };

  const goToStep3 = () => {
    if (validatePersonalInfo()) {
      const age = calculateAge(birthDate);
      navigation.navigate("SignupStep3", {
        email,
        password,
        firstName,
        lastName,
        age,
      });
    }
  };

  const handleDateChange = () => {
    const validBirthDate = validateBirthDate(day, month, year);
    if (validBirthDate) {
      setBirthDate(validBirthDate);
      setDateFeedback("");
    } else {
      setDateFeedback("Fecha inválida.");
    }
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

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={[
            uiStyle.container,
            { gap: 40, flex: 1, justifyContent: "space-between" },
          ]}
        >
          <View style={{ gap: 15, marginTop: -10 }}>
            <Text style={[fontStyle.h2, fontStyle.light]}>
              Completa tu perfil
            </Text>

            <Text style={[fontStyle.h3, fontStyle.light]}>Nombre</Text>
            <TextInput
              style={uiStyle.input}
              value={firstName}
              placeholder="Escribe aquí..."
              onChangeText={(text) => setFirstName(formatName(text))}
            />

            <Text style={[fontStyle.h3, fontStyle.light]}>Apellido</Text>
            <TextInput
              style={uiStyle.input}
              value={lastName}
              placeholder="Escribe aquí..."
              onChangeText={(text) => setLastName(formatName(text))}
            />

            <Text style={[fontStyle.h3, fontStyle.light]}>
              Fecha de nacimiento
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TextInput
                style={[uiStyle.input, { width: "30%" }]}
                value={day}
                placeholder="Día"
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={setDay}
                onBlur={handleDateChange}
              />
              <Text style={[fontStyle.light, fontStyle.h3]}>/</Text>
              <TextInput
                style={[uiStyle.input, { width: "30%" }]}
                value={month}
                placeholder="Mes"
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={setMonth}
                onBlur={handleDateChange}
              />
              <Text style={[fontStyle.light, fontStyle.h3]}>/</Text>
              <TextInput
                style={[uiStyle.input, { width: "30%" }]}
                value={year}
                placeholder="Año"
                keyboardType="number-pad"
                maxLength={4}
                onChangeText={setYear}
                onBlur={handleDateChange}
              />
            </View>

            <Text style={[fontStyle.p, fontStyle.light]}>{dateFeedback}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <GoBackButton onPress={() => navigation.goBack()} />
            <NextButton onPress={goToStep3} />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  orchidImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 120,
  },
});

export default SignupStep2;
