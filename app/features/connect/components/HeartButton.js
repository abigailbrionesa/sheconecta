import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Button1 from "../../welcome/components/Button1";

export const HeartButton = ({ liked, onPress }) => {
  return (
    <Button1
      onPress={onPress}
      color="white"
      textColor="#3f60a0"
      icon={<Ionicons name={liked ? "heart" : "heart-outline"} size={30} color="#3f60a0" />}
    >
      Guardar Aliada STEM
    </Button1>
  );
};