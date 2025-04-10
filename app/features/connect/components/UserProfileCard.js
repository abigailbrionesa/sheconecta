import React from "react";
import { View } from "react-native";
import { HeartButton } from "./HeartButton";
import Button1 from "../../welcome/components/Button1";
import { Ionicons } from "@expo/vector-icons";
import UserProfileInfo from "./UserProfileInfo";

const UserProfileCard = ({ user, alreadyLiked, onHeartPress, onMessagePress }) => {
  const backgroundColor = user.type === "mentor" ? "#e8d4ff" : "#d3d9f5"; 
  return (
    <View
      style={{
        backgroundColor: backgroundColor, 
        borderRadius: 60,
        padding: 30,
        gap: 15,
      }}
    >
      <UserProfileInfo user={user} />
      <HeartButton 
        liked={alreadyLiked} 
        onPress={() => onHeartPress(user.id)} 
      />
      <Button1 
        onPress={onMessagePress} 
        icon={<Ionicons name="chatbubble-ellipses" size={20} color="white" />}
      >
        Mandar Mensaje
      </Button1>
    </View>
  );
};

export default UserProfileCard;
