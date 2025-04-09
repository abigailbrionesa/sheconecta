import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function HeaderChat({ recipientName, recipientPhoto, onBackPress }) {
  return (
    <TouchableOpacity onPress={onBackPress} style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
      <Text style={{ fontSize: 30 }}>←</Text>
      <Image
        source={{ uri: recipientPhoto }}
        style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }}
      />
      <Text style={{ marginLeft: 10, fontSize: 18 }}>{recipientName}</Text>
    </TouchableOpacity>
  );
}
