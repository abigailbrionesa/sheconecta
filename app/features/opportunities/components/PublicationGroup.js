import React from "react";
import { View } from "react-native";
import { PublicationItem } from "./PublicationItem";
import { fontStyle } from "../../../utils/fontStyle";


export const PublicationGroup = ({ type, publications }) => (
    <View style={{ backgroundColor: "#faf5f3", flex: 1, padding: 20, gap: 15 }}>
      <Text style={[fontStyle.h3, fontStyle.pink]}>{type}</Text>
      {publications.map((publication) => (
        <PublicationItem key={publication.publicationId} publication={publication} />
      ))}
    </View>
  );