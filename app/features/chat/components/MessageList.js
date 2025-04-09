import React from "react";
import { FlatList, Text } from "react-native";

export default function MessageList({ messages }) {
  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Text style={{ padding: 10 }}>{item.text}</Text>
      )}
    />
  );
}
