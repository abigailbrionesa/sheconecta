import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import GoBackButton from "../components/GoBackButton";
import NextButton from "../components/NextButton";
import Button1 from "../components/Button1"; 
import { fontStyle } from "../../../utils/fontStyle";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";

const plans = [
  {
    name: "Plan Free",
    price: "Gratis",
    features: [
      "Mentorías: 2/mes",
      "Crear 1 proyecto, unirse a 2",
      "Comunidad básica (principiante/intermedio)",
      "1 taller mensual (según cupo)",
      "Participación en retos (máx. 2 por semana)",
      "Puntos x1",
    ],
  },
  {
    name: "Conecta+",
    price: "S/ 15",
    features: [
      "Mentorías ilimitadas",
      "Proyectos ilimitados",
      "Acceso total a comunidad",
      "Acceso a talleres",
      "Participación en retos",
      "Recursos exclusivos, sorteos, eventos",
      "Multiplicador de puntos x1.2",
    ],
  },
  {
    name: "SheTeam",
    price: "S/ 45",
    features: [
      "Todo el Plan Conecta+",
      "Acceso para 4 personas",
      "Canal privado, seguimiento grupal, retos grupales",
    ],
  },
  {
    name: "ConectaPro",
    price: "S/ 120 anual",
    features: [
      "Todo lo anterior + bonificación inicial de 200 pts",
      "Badge exclusivo + puntos x1.5",
      "Acceso a sorteos anuales grandes",
    ],
  },
];

const PlanCard = ({ plan }) => (
  <View style={styles.card}>
    <Text style={styles.planName}>{plan.name}</Text>
    <Text style={styles.planPrice}>{plan.price}</Text>
    {plan.features.map((feature, index) => (
      <Text key={index} style={styles.feature}>• {feature}</Text>
    ))}
  </View>
);

const SubscriptionScreen = ({ navigation }) => {
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    selectedAreas,
  } = route.params;

  const signUp = async () => {
    setLoading(true);
    const auth = FIREBASE_AUTH;
    const db = getFirestore();

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;

      const userData = {
        type: role,
        email,
        firstName,
        lastName,
        age,
        location: {
          departamento,
          provincia,
        },
        languages,
        career,
        university,
        interestAreas: selectedAreas,
        yearsExperience: experience,
        socialLinks: {
          instagram,
          linkedin,
        },
        profilePictureUrl: image,
        carnetPictureUrl: "",
        score: 0,
        savedContacts: [],
      };

      await setDoc(doc(db, "users", user.uid), userData);
      console.log("Signup successful");
    } catch (error) {
      console.error("Signup error:", error.message);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Planes de Suscripción</Text>
      <FlatList
        data={plans}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <PlanCard plan={item} />}
        contentContainerStyle={styles.list}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button1 onPress={signUp}>Crear Cuenta</Button1>
      )}

      {errorMessage ? <Text style={fontStyle.p}>{errorMessage}</Text> : null}

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <GoBackButton onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#f0f4ff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 3,
  },
  planName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2a2a72",
    marginBottom: 5,
  },
  planPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4a4a4a",
    marginBottom: 10,
  },
  feature: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
});

export default SubscriptionScreen;
