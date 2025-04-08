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
import { ImageBackground } from "react-native";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import GoBackButton from "../../welcome/components/GoBackButton";
import NextButton from "../../welcome/components/NextButton";

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
        updatedLikes = user.likes
          ? [...user.likes, currentUserId]
          : [currentUserId];
      }

      await updateDoc(userDoc, { likes: updatedLikes });

      const updatedUsers = [...users];
      updatedUsers[currentUserIndex].likes = updatedLikes;
      setUsers(updatedUsers);
      console.log(user);
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
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View style={styles.container}>
        {currentUser ? (
          <View style={styles.profileContainer}>
            <View style={{ justifyContent: "center", alignItems: "center", marginVertical:10, gap:3 }}>
              <Image
                source={{ uri: currentUser.profilePictureUrl }}
                style={styles.profileImage}
              />

              <Text style={[fontStyle.h2, { color: "black" }]}>
                {currentUser.firstName} {currentUser.lastName}
              </Text>

              <Text style={fontStyle.p}>
                Experience: {currentUser.experienceLevel}
              </Text>

              <Text style={fontStyle.p}>
                University: {currentUser.university}
              </Text>

              <Text style={fontStyle.p}>City: {currentUser.city}</Text>

              <Text style={fontStyle.p}>Career: {currentUser.career}</Text>

              <Text style={fontStyle.h4}>
                Interest Areas:
              </Text>

              <Text style={fontStyle.p}>
                {currentUser.interestAreas?.join(", ")}
              </Text>


            </View>

            <View>
              <TouchableOpacity
                style={styles.heartButton}
                onPress={() => handleHeart(currentUser.id)}
              >
                <Ionicons
                  name={alreadyLiked ? "heart" : "heart-outline"}
                  size={30}
                  color={alreadyLiked ? "#3f60a0" : ""}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>

      <View
        style={{
          padding: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 20,
          width: "100%",
        }}
      >
        <GoBackButton onPress={() => navigation.goBack()}></GoBackButton>
        <NextButton onPress={nextUser}></NextButton>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  profileContainer: {
    alignItems: "center",
    backgroundColor: "#e8d4ff",
    borderRadius: 60,
    padding: 30,
    justifyContent: "space-between",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom:20,
  },

  heartButton: {
    backgroundColor: "white",
    marginTop:20,
    padding: 10,
    borderRadius: 50,
    elevation: 3,
  },
});
