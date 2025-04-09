import React from "react";
import { View, Text, Image } from "react-native";
import { fontStyle } from "../../../utils/fontStyle";

export default function UserProfileInfo({ user }) {
  if (!user) return null;

  return (
    <View
      style={{
        alignItems: "center",
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
            width: 160,
            height: 160,
            borderRadius: 80,
            marginBottom: 20,
          }}
        />
        <Text style={[fontStyle.h2, fontStyle.pink]}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={[fontStyle.p, fontStyle.darker]}>{user.career}</Text>
        <Text style={[fontStyle.p, fontStyle.darker]}>{user.university}</Text>
        <Text style={[fontStyle.p, fontStyle.darker]}>Experiencia: {user.yearsExperience} años</Text>
        <Text style={[fontStyle.p, fontStyle.darker]}>{user.location.provincia}, {user.location.departamento}</Text>
        <Text style={[fontStyle.p, fontStyle.darker]}>Intereses: {user.interestAreas?.join(", ") || "N/A"}
        </Text>
      </View>
    </View>
  );
}
