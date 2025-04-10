import React from "react";
import { View, Text } from "react-native";
import { fontStyle } from "../../../utils/fontStyle";

export const PublicationItem = ({ publication }) => (
    <View style={{ backgroundColor: "#e6dafd", padding: 10, borderRadius: 10 }}>
      <Text style={fontStyle.h4}>{publication.title}</Text>
      <Text style={fontStyle.p}>Autor: {publication.author}</Text>
      <View style={{ backgroundColor: "gray", width: "100%", height: 1 }} />
      <Text style={fontStyle.p}>{publication.description}</Text>
      <Text style={[fontStyle.p, fontStyle.gray]}>
        {new Date(publication.createdAt.seconds * 1000).toLocaleDateString()}
      </Text>
    </View>
);