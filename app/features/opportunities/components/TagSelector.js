import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { fontStyle } from "../../../utils/fontStyle";

const TagSelector = ({ tags, selectedTags, toggleTag }) => (
  <View style={styles.tagsContainer}>
    {tags.map((tag) => (
      <TouchableOpacity
        key={tag}
        style={[styles.tag, selectedTags.includes(tag) && styles.tagSelected]}
        onPress={() => toggleTag(tag)}
      >
        <Text style={[ fontStyle.h4, { color: selectedTags.includes(tag) ? "#faf5f3" : "#746ba8" }]}>
          {tag}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 10,
    justifyContent: "center",

  },
  
  tag: {
    backgroundColor: "#ffff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 40,
    alignItems: "center",

    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  tagSelected: {
    backgroundColor: "#ae80b3",
  },


});

export default TagSelector;
