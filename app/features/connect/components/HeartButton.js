import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HeartButton({ liked, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "white",
        marginTop: 20,
        padding: 10,
        borderRadius: 50,
        elevation: 3,
      }}
    >
      <Ionicons
        name={liked ? "heart" : "heart-outline"}
        size={30}
        color={liked ? "#3f60a0" : "black"}
      />
    </TouchableOpacity>
  );
}
