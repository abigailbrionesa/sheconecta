import React from "react";
import { TouchableOpacity, Image, Text } from "react-native";
import { fontStyle } from "../../../utils/fontStyle";
import { View } from "react-native";

export default function ChatItem({ chat, openChat }) {
  return (
    <TouchableOpacity
      onPress={() => openChat(chat)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: 10,
        gap: 15,
        marginBottom: 10,
        borderRadius: 10,
      }}
    >
      <Image
        source={{ uri: chat.recipientPhoto }}
        style={{ width: 60, height: 60, borderRadius: 30 }}
      />
    
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Text style={[fontStyle.h4, fontStyle.pink]}>{chat.recipientName}</Text>
        <Text style={[fontStyle.p, fontStyle.dark]}>
          ({chat.recipientType})
        </Text>
      </View>

      <Text style={[fontStyle.p, fontStyle.gray]}>
        {chat.recipientCareer}
      </Text>

      </View>
    </TouchableOpacity>
  );
}
