import React, { useState } from "react";
import { View } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import HeaderChat from "../components/HeaderChat";

export default function PersonalChat() {
  const route = useRoute();
  const navigation = useNavigation();
  const { recipientName, recipientPhoto } = route.params;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (text.trim()) {
      setMessages((prev) => [...prev, { text, id: Date.now().toString() }]);
      setText("");
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <HeaderChat
        recipientName={recipientName}
        recipientPhoto={recipientPhoto}
        onBackPress={() => navigation.navigate("ChatScreen")}
      />
      <MessageList messages={messages} />
      <MessageInput text={text} setText={setText} onSend={sendMessage} />
    </View>
  );
}
