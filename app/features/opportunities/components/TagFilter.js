
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { fontStyle } from "../../../utils/fontStyle";

export const TagFilter = ({ tagOptions, selectedTags, toggleTag }) => (
    <View>
      <Text style={[fontStyle.h3, fontStyle.light]}>Filtrar por tema</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 10,
          justifyContent: "space-between",
        }}
      >
        {tagOptions.map((tag) => (
          <TouchableOpacity
            key={tag.name}
            onPress={() => toggleTag(tag.name)}
            style={[
              {
                justifyContent: "center",
                alignItems: "center",
                width: 80,
                height: 80,
                borderRadius: 40,
                margin: 5,
              },
              selectedTags.includes(tag.name) && { opacity: 0.6 },
            ]}
          >
            <Image source={{ uri: tag.imageUrl }} style={{ width: 60, height: 60, borderRadius: 30 }} />
            <Text style={[fontStyle.p, fontStyle.light]}>{tag.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
);
  