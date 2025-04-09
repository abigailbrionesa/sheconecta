import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { ImageBackground } from "react-native";
import { backgroundStyle } from "../../../utils/backgroundStyle";

export default function FavoriteProfiles() {
 
  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View style={{ alignItems: "center", marginTop: 80,  }}>

        <Text>favorite profiles</Text>
      </View>
    </ImageBackground>
  );
}
