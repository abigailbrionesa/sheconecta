import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, Alert } from "react-native";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../../FirebaseConfig";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import GoBackButton from "../../welcome/components/GoBackButton";
import NextButton from "../../welcome/components/NextButton";
import Button1 from "../../welcome/components/Button1";
import { Ionicons } from "@expo/vector-icons";
import UserProfileCard from "../components/UserProfileCard";

export default function CommunityProfiles({ navigation }) {
  const [users, setUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const currentUserId = FIREBASE_AUTH.currentUser?.uid;

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(FIREBASE_DB, "users"));
      const list = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const filteredUsers = list.filter((user) => user.id !== currentUserId);
      setUsers(filteredUsers);
    };

    fetchUsers();
  }, []);

  const currentUser = users[currentUserIndex];

  const alreadySaved = currentUser?.savedContacts?.includes(currentUser.id);


  const handleHeart = async (userId) => {
    try {
      if (typeof userId !== 'string' || typeof currentUserId !== 'string') {
        throw new Error('Invalid userId or currentUserId');
      }
  
      const currentUserDoc = doc(FIREBASE_DB, "users", currentUserId);
      const currentUser = users[currentUserIndex];
  
      const alreadySaved = currentUser?.savedContacts?.includes(userId);
  
      const updatedSavedContacts = Array.isArray(currentUser.savedContacts)
        ? alreadySaved
          ? currentUser.savedContacts.filter((id) => id !== userId) 
          : [...currentUser.savedContacts, userId] 
        : alreadySaved
        ? [] 
        : [userId];
  
      await updateDoc(currentUserDoc, { savedContacts: updatedSavedContacts });
  
      const updatedUsers = [...users];
      updatedUsers[currentUserIndex].savedContacts = updatedSavedContacts;
      setUsers(updatedUsers);
  
    } catch (error) {
      console.error("Error updating saved contacts:", error);
      Alert.alert("Error", "An error occurred while updating. Please try again.");
    }
  };
  

  const startChat = async (otherUserId) => {
    try {
      const chatId =
        currentUserId < otherUserId
          ? `${currentUserId}_${otherUserId}`
          : `${otherUserId}_${currentUserId}`;

      await setDoc(doc(FIREBASE_DB, "chats", chatId), {
        participants: [currentUserId, otherUserId],
        createdAt: new Date(),
      });

      const otherUser = users.find((u) => u.id === otherUserId);

      navigation.navigate("Chat", {
        chatId,
        recipientId: otherUserId,
        recipientName: `${otherUser.firstName} ${otherUser.lastName}`,
        recipientPhoto: otherUser.profilePictureUrl,
      });
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  const nextUser = () => {
    console.log(alreadySaved, "alreadys aveD?")

    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    } else {
      Alert.alert("No more users!");
    }
  };

  const previousUser = () => {
    if (currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1);
    } else {
      Alert.alert("You are on the first user!");
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <Button1
        onPress={() => navigation.navigate("FavoriteProfiles")}
        icon={<Ionicons name="bookmark-outline" size={20} color="white" />}
      >
        Aliadas STEM Guardadas
      </Button1>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          marginTop: 80,
        }}
      >
        {currentUser ? (
          <UserProfileCard
          user={currentUser}
          alreadyLiked={alreadySaved}
          onHeartPress={handleHeart}
          onMessagePress={startChat}
        />
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
        <GoBackButton onPress={previousUser} />
        <NextButton onPress={nextUser} />
      </View>
    </ImageBackground>
  );
}
