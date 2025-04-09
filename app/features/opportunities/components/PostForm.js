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
      <Text style={fontStyle.h2}>Crear publicación</Text>
      <Text style={fontStyle.h3}>Tipo de publicación</Text>
      
      <PostTypePicker type={type} setType={setType} />

      <Text style={fontStyle.h3}>Título</Text>
      <TextInput
        placeholder="Título"
        style={uiStyle.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={fontStyle.h3}>Descripción</Text>
      <TextInput
        placeholder="Descripción"
        style={[styles.input, { height: 120 }]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={fontStyle.h3}>Etiquetas</Text>
      <TagSelector
        tags={allTopicTags}
        selectedTags={selectedTopicTags}
        toggleTag={toggleTopicTag}
      />

      <Text style={fontStyle.h3}>Languages</Text>
      <TagSelector
        tags={allLanguageTags}
        selectedTags={selectedLanguageTags}
        toggleTag={toggleLanguageTag}
      />

      <Text style={[fontStyle.p, { textAlign: "right" }]}>
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
