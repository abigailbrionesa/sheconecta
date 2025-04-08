import React, { useState, useEffect } from "react";
import { TextInput, Button, View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Button1 from "../../welcome/components/Button1";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../../FirebaseConfig";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { ImageBackground } from "react-native";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";

const FeedOfPosts = () => {


  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View
        style={[uiStyle.container, { gap: 15, flex: 1, justifyContent: "space-between" }]}
      >

      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  input: {
    ...uiStyle.input,
    textAlignVertical: "top",
  },
});

export default FeedOfPosts;
