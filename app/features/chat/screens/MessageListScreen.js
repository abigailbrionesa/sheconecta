import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../../FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { fontStyle } from "../../../utils/fontStyle";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { ImageBackground } from "react-native";
export default function MessagesListScreen({ navigation }) {
  const [chats, setChats] = useState([]);
  const currentUserId = FIREBASE_AUTH.currentUser.uid;

  useEffect(() => {
    const fetchChats = async () => {
      const q = query(
        collection(FIREBASE_DB, "chats"),
        where("participants", "array-contains", currentUserId)
      );
      const querySnapshot = await getDocs(q);
      const chatData = [];

      for (const docSnap of querySnapshot.docs) {
        const chat = docSnap.data();
        const otherUserId = chat.participants.find(
          (id) => id !== currentUserId
        );

        const userDoc = await getDocs(collection(FIREBASE_DB, "users"));
        const otherUser = userDoc.docs
          .find((u) => u.id === otherUserId)
          ?.data();

        chatData.push({
          id: docSnap.id,
          ...chat,
          recipientId: otherUserId,
          recipientName: `${otherUser?.firstName} ${otherUser?.lastName}`,
          recipientPhoto: otherUser?.profilePictureUrl,
        });
      }

      setChats(chatData);
    };

    fetchChats();
  }, []);

  const openChat = (chat) => {
    navigation.navigate("ChatScreen", {
      chatId: chat.id,
      recipientId: chat.recipientId,
      recipientName: chat.recipientName,
      recipientPhoto: chat.recipientPhoto,
    });
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View style={{ flex: 1, padding: 20, marginTop:80 }}>
        <Text style={[fontStyle.h1, fontStyle.light]}>Inbox</Text>
  
        {chats.length === 0 ? (
          <Text style={[fontStyle.h3, fontStyle.light]}>
            No messages yet
          </Text>
        ) : (
          <FlatList
            data={chats}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => openChat(item)}
                style={{
                  flexDirection: "row",
                  marginVertical: 10,
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: item.recipientPhoto }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    marginRight: 10,
                  }}
                />
                <Text style={{ fontSize: 18 }}>{item.recipientName}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </ImageBackground>
  );
}
