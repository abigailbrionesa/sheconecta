import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Image } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function ChatScreen() {
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
      <TouchableOpacity       
      
      onPress={() => navigation.navigate("MessagesListScreen")} 


style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <Text style={{ fontSize: 90 }}>←</Text>
        <Image source={{ uri: recipientPhoto }} style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }} />
        <Text style={{ marginLeft: 10, fontSize: 18 }}>{recipientName}</Text>
      </TouchableOpacity>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={{ padding: 10 }}>{item.text}</Text>}
      />

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message"
          style={{ flex: 1, borderWidth: 1, borderRadius: 5, padding: 10 }}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}
