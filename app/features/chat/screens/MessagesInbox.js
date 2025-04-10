import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ImageBackground } from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../../FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import Loading from "../../welcome/components/Loading";
import ChatItem from "../components/ChatItem";
import { uiStyle } from "../../../utils/uiStyle";

export default function MessagesInbox({ navigation }) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = FIREBASE_AUTH.currentUser.uid;

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(FIREBASE_DB, "chats"),
          where("participants", "array-contains", currentUserId)
        );
        const querySnapshot = await getDocs(q);

        const chatData = [];

        for (const docSnap of querySnapshot.docs) {
          const chat = docSnap.data();
          const otherUserId = chat.participants.find(id => id !== currentUserId);

          const userDocSnap = await getDocs(collection(FIREBASE_DB, "users"));
          const otherUser = userDocSnap.docs.find(u => u.id === otherUserId)?.data();

          chatData.push({
            id: docSnap.id,
            ...chat,
            recipientId: otherUserId,
            recipientName: `${otherUser?.firstName} ${otherUser?.lastName}`,
            recipientPhoto: otherUser?.profilePictureUrl,
            recipientType: otherUser?.type,
            recipientCareer: otherUser?.career,
          });
        }

        setChats(chatData);
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [currentUserId]);

  const openChat = (chat) => {
    navigation.navigate("ChatScreen", {
      chatId: chat.id,
      recipientId: chat.recipientId,
      recipientName: chat.recipientName,
      recipientPhoto: chat.recipientPhoto,
      recipientCareer: chat.recipientCareer,
      recipientType: chat.recipientType,
    });
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View style={[uiStyle.container]}>
        <Text style={[fontStyle.h1, fontStyle.light]}>Inbox</Text>

        {loading ? (
          <Loading />
        ) : chats.length === 0 ? (
          <Text style={[fontStyle.h3, fontStyle.light]}>No messages yet</Text>
        ) : (
          <FlatList
            data={chats}
            keyExtractor={(item) => item.id}
            style={{ flex: 1, gap: 15 }}
            renderItem={({ item }) => <ChatItem chat={item} openChat={openChat} />}
          />
        )}
      </View>
    </ImageBackground>
  );
}
