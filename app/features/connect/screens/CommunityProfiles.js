import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from "react-native";
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
import UserProfile from "../components/UserProfile";
import HeartButton from "../components/HeartButton";
import Button1 from "../../welcome/components/Button1";

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
      setUsers(list);
    };

    fetchUsers();
  }, []);

  const currentUser = users[currentUserIndex];
  const alreadyLiked = currentUser?.likes?.includes(currentUserId);

  const handleHeart = async (userId) => {
    try {
      const userDoc = doc(FIREBASE_DB, "users", userId);
      const user = users[currentUserIndex];

      const updatedLikes = alreadyLiked
        ? user.likes.filter((id) => id !== currentUserId)
        : [...(user.likes || []), currentUserId];

      await updateDoc(userDoc, { likes: updatedLikes });

      const updatedUsers = [...users];
      updatedUsers[currentUserIndex].likes = updatedLikes;
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error toggling like:", error);
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
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    } else {
      Alert.alert("No more users!");
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 80,
        }}
      >
        {currentUser ? (
          <>
            <UserProfile user={currentUser} />
            <HeartButton
              liked={alreadyLiked}
              onPress={() => handleHeart(currentUser.id)}
            />
            <Button1 onPress={() => startChat(currentUser.id)}>Message</Button1>
          </>
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
        <GoBackButton onPress={() => navigation.goBack()} />
        <NextButton onPress={nextUser} />
      </View>
      
    </ImageBackground>
  );
}