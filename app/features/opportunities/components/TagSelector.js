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
        <Text style={[ fontStyle.p, { color: selectedTags.includes(tag) ? "#faf5f3" : "#746ba8" }]}>
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
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#faf5f3",
  },
  tagSelected: {
    backgroundColor: "#746ba8",
  },
});

export default TagSelector;
