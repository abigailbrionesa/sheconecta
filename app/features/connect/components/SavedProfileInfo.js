import React from "react";
import { View, Text, Image } from "react-native";
import { fontStyle } from "../../../utils/fontStyle";

export default function SavedProfileInfo({ user }) {
  if (!user) return null;

  return (

      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 10,
          gap: 10,
          flexDirection: "row"
        }}
      >
        <Image
          source={{ uri: user.profilePictureUrl }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
          }}
        />

      <View> 
        <Text style={[fontStyle.h4, fontStyle.pink]}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={[fontStyle.p, fontStyle.darker]}>{user.career}</Text>
        <Text style={[fontStyle.p, fontStyle.darker]}>{user.university}</Text>
        </View>
      </View>

  );
}
