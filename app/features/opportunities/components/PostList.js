import React from "react";
import { View } from "react-native";
import { PublicationGroup } from "./PublicationGroup";

export const PostList = ({ typeOptions, groupedByType }) => (
    <View style={{ backgroundColor: "#faf5f3", flex: 1 }}>
      {typeOptions.map(
        (type) =>
          groupedByType[type].length > 0 && <PublicationGroup key={type} type={type} publications={groupedByType[type]} />
      )}
    </View>
);