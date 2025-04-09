import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../../FirebaseConfig";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import SavedProfileCard from "../components/SavedProfileCard";
import { updateDoc } from "firebase/firestore";
import { arrayRemove } from "firebase/firestore";
import Loading from "../../welcome/components/Loading";
export default function FavoriteProfiles({ navigation }) {
  const [favoriteUsers, setFavoriteUsers] = useState([]);
  const [loading, setLoading] = useState(true); 
  const currentUser = FIREBASE_AUTH.currentUser;

  useEffect(() => {
    const fetchFavoriteProfiles = async () => {
      try {
        const currentUserDoc = doc(FIREBASE_DB, "users", currentUser.uid);
        const currentUserSnapshot = await getDoc(currentUserDoc);

        if (currentUserSnapshot.exists()) {
          const savedContacts = currentUserSnapshot.data().savedContacts || [];

          const allUsersSnapshot = await getDocs(collection(FIREBASE_DB, "users"));
          const allUsers = allUsersSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const savedUserProfiles = allUsers.filter((user) =>
            savedContacts.includes(user.id)
          );

          setFavoriteUsers(savedUserProfiles);
        }
      } catch (error) {
        console.error("Error fetching favorite profiles:", error);
        Alert.alert("Error", "No se pudieron cargar los perfiles favoritos.");
      } finally {
        setLoading(false); 
      }
    };

    if (currentUser?.uid) {
      fetchFavoriteProfiles();
    }
  }, [currentUser]);

  const handleRemoveFavorite = async (userIdToRemove) => {
    try {
      const userRef = doc(FIREBASE_DB, "users", currentUser.uid);
      await updateDoc(userRef, {
        savedContacts: arrayRemove(userIdToRemove),
      });

      setFavoriteUsers((prev) =>
        prev.filter((user) => user.id !== userIdToRemove)
      );
    } catch (error) {
      console.error("Error removing favorite:", error);
      Alert.alert("Error", "No se pudo eliminar el perfil.");
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      {loading ? (
        <Loading/>
      ) : favoriteUsers.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {favoriteUsers.map((user) => (
            <SavedProfileCard
              key={user.id}
              user={user}
              onRemove={() => handleRemoveFavorite(user.id)}
              onMessagePress={() => {
                Alert.alert("Chat", `Iniciar chat con ${user.firstName}`);
              }}
            />
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noFavorites}>Aún no tienes perfiles guardados.</Text>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    alignItems: "center",
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  scrollContainer: {
    padding: 20,
    gap: 15,
  },
  noFavorites: {
    fontSize: 16,
    color: "#fff",
    marginTop: 20,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#fff",
  },
});