import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../../FirebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { fontStyle } from "../../../utils/fontStyle";

export default function Conectar({ navigation }) {
  const [users, setUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  useEffect(() => {
    const fetchUsersData = async () => {
      const usersCollection = collection(FIREBASE_DB, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(usersList);
    };

    fetchUsersData();
  }, []);

  const handleHeart = async (userId) => {
    try {
      const userDoc = doc(FIREBASE_DB, "users", userId);
      const user = users[currentUserIndex];
      const currentUserId = FIREBASE_AUTH.currentUser.uid;
      let updatedLikes;

      const alreadyLiked = user.likes?.includes(currentUserId);

      if (alreadyLiked) {
        updatedLikes = user.likes.filter((id) => id !== currentUserId);
      } else {
        updatedLikes = user.likes ? [...user.likes, currentUserId] : [currentUserId];
      }

      await updateDoc(userDoc, { likes: updatedLikes });

      const updatedUsers = [...users];
      updatedUsers[currentUserIndex].likes = updatedLikes;
      setUsers(updatedUsers);
      console.log(user)
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const nextUser = () => {
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    } else {
      alert("No more users!");
    }
  };

  const currentUser = users[currentUserIndex];
  const currentUserId = FIREBASE_AUTH.currentUser?.uid;
  const alreadyLiked = currentUser?.likes?.includes(currentUserId);

  return (
    <View style={styles.container}>
      {currentUser ? (
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: currentUser.profilePictureUrl }}
            style={styles.profileImage}
          />

          <Text style={[fontStyle.h2, { color: "black" }]}>
            {currentUser.firstName} {currentUser.lastName}
          </Text>

          <Text style={styles.infoText}>
            Experience: {currentUser.experienceLevel}
          </Text>

          <Text style={styles.infoText}>
            University: {currentUser.university}
          </Text>

          <Text style={styles.infoText}>City: {currentUser.city}</Text>

          <Text style={styles.infoText}>Career: {currentUser.career}</Text>

          <Text style={styles.infoText}>
            Interest Areas: {currentUser.interestAreas?.join(", ")}
          </Text>

          <Text style={styles.infoText}>
            Interest Categories: {currentUser.interestCategories?.join(", ")}
          </Text>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.heartButton}
              onPress={() => handleHeart(currentUser.id)}
            >
              <Ionicons
                name={alreadyLiked ? "heart" : "heart-outline"}
                size={30}
                color={alreadyLiked ? "red" : "gray"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.navigationButtons}>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
            <Button title="Next" onPress={nextUser} />

          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#e8d4ff",
    borderRadius: 40,
    padding: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginVertical: 2,
  },
  buttons: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  heartButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    elevation: 3,
  },
  navigationButtons: {
    marginTop: 20,
    flexDirection: "row",
    gap: 10,
  },
});