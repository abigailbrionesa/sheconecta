import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fontStyle } from "../../../utils/fontStyle";
import SavedProfileInfo from "./SavedProfileInfo";
import Button1 from "../../welcome/components/Button1";

const SavedProfileCard = ({ user, onMessagePress, onRemove }) => {
  return (
    <View
      style={{
        backgroundColor: "#e8d4ff",
        borderRadius: 15,
        padding: 20,
        gap: 15,
      }}
    >
      <SavedProfileInfo user={user} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={onRemove}>
          <Text style={[fontStyle.gray, fontStyle.p]}>Eliminar</Text>
        </TouchableOpacity>

        <Button1
          onPress={onMessagePress}
          icon={<Ionicons name="chatbubble-ellipses" size={20} color="white" />}
        >
          Mandar Mensaje
        </Button1>
      </View>
    </View>
  );
};

export default SavedProfileCard;
