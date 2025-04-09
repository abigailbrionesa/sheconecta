import React from "react";
import { View, Text, Image } from "react-native";
import { fontStyle } from "../../../utils/fontStyle";

export default function UserProfile({ user }) {
  if (!user) return null;

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "#e8d4ff",
        borderRadius: 60,
        padding: 30,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
          gap: 3,
        }}
      >
        <Image
          source={{ uri: user.profilePictureUrl }}
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            marginBottom: 20,
          }}
        />
        <Text style={[fontStyle.h2, { color: "black" }]}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={fontStyle.p}>Experience: {user.experienceLevel}</Text>
        <Text style={fontStyle.p}>University: {user.university}</Text>
        <Text style={fontStyle.p}>City: {user.city}</Text>
        <Text style={fontStyle.p}>Career: {user.career}</Text>
        <Text style={fontStyle.h4}>Interest Areas:</Text>
        <Text style={fontStyle.p}>
          {user.interestAreas?.join(", ") || "N/A"}
        </Text>
      </View>
    </View>
  );
}
