import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";
import PostTypePicker from "./PostTypePicker";
import TagSelector from "./TagSelector";

const PostForm = ({
  title,
  setTitle,
  description,
  setDescription,
  type,
  setType,
  selectedTopicTags,
  toggleTopicTag,
  allTopicTags,
  selectedLanguageTags,
  toggleLanguageTag,
  allLanguageTags,
  firstName,
  lastName,
}) => {
  return (
    <View style={{ gap: 15 }}>
      <Text style={[fontStyle.h2, fontStyle.light]}>Crear publicación</Text>
      <Text style={[fontStyle.h3, fontStyle.light]}>Tipo de publicación</Text>
      
      <PostTypePicker type={type} setType={setType} />

      <Text style={[fontStyle.h3, fontStyle.light]}>Título</Text>
      <TextInput
        placeholder="Título"
        style={uiStyle.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={[fontStyle.h3, fontStyle.light]}>Descripción</Text>
      <TextInput
        placeholder="Descripción"
        style={[styles.input, { height: 120 }]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={[fontStyle.h3, fontStyle.light]}>Etiquetas</Text>
      <TagSelector
        tags={allTopicTags}
        selectedTags={selectedTopicTags}
        toggleTag={toggleTopicTag}
      />

      <Text style={[fontStyle.h3, fontStyle.light]}>Languages</Text>
      <TagSelector
        tags={allLanguageTags}
        selectedTags={selectedLanguageTags}
        toggleTag={toggleLanguageTag}
      />

      <Text style={[fontStyle.p, fontStyle.light, { textAlign: "right"}]}>
        De: {firstName} {lastName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    ...uiStyle.input,
    textAlignVertical: "top",
  },
});

export default PostForm;
