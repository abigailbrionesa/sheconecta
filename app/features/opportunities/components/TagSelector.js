import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TagSelector = ({ tags, selectedTags, toggleTag }) => (
  <View style={styles.tagsContainer}>
    {tags.map((tag) => (
      <TouchableOpacity
        key={tag}
        style={[styles.tag, selectedTags.includes(tag) && styles.tagSelected]}
        onPress={() => toggleTag(tag)}
      >
        <Text style={{ color: selectedTags.includes(tag) ? "white" : "#333" }}>
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
    backgroundColor: "#eee",
  },
  tagSelected: {
    backgroundColor: "#6200ee",
  },
});

export default TagSelector;
