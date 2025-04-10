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
        {user.profilePictureUrl && (
          <Image
            source={{ uri: user.profilePictureUrl }}
            style={{
              width: 160,
              height: 160,
              borderRadius: 80,
              marginBottom: 20,
            }}
          />
        )}

        {user.type && (
          <Text style={[fontStyle.h3, fontStyle.darker]}>{user.type}</Text>
        )}

        {user.firstName && user.lastName && (
          <Text style={[fontStyle.h2, fontStyle.pink]}>
            {user.firstName} {user.lastName}
          </Text>
        )}

        {user.career && (
          <Text style={[fontStyle.p, fontStyle.darker]}>{user.career}</Text>
        )}

        {user.university && (
          <Text style={[fontStyle.p, fontStyle.darker]}>{user.university}</Text>
        )}

        {user.yearsExperience && (
          <Text style={[fontStyle.p, fontStyle.darker]}>
            Experiencia: {user.yearsExperience} años
          </Text>
        )}

        {user.location?.provincia && user.location?.departamento && (
          <Text style={[fontStyle.p, fontStyle.darker]}>
            {user.location.provincia}, {user.location.departamento}
          </Text>
        )}

        {user.interestAreas && user.interestAreas.length > 0 && (
          <Text style={[fontStyle.p, fontStyle.darker]}>
            Intereses: {user.interestAreas.join(", ")}
          </Text>
        )}
      </View>
    </View>
  );
}
