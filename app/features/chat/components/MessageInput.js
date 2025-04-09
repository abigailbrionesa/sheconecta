import React from "react";
import { View, TextInput, Button } from "react-native";

export default function MessageInput({ text, setText, onSend }) {
  return (
    <View style={{ flexDirection: "row", marginTop: 10 }}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Type a message"
        style={{ flex: 1, borderWidth: 1, borderRadius: 5, padding: 10 }}
      />
      <Button title="Send" onPress={onSend} />
    </View>
  );
}