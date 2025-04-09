import React, { useState, useEffect } from "react";
import {
  TextInput,
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
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
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { uiStyle } from "../../../utils/uiStyle";
import { fontStyle } from "../../../utils/fontStyle";

const CreatePost = () => {
  const user = FIREBASE_AUTH.currentUser;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const allTags = ["Ingeniería", "Matemática", "Ciencia", "Tecnología"];

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userDoc = doc(FIREBASE_DB, "users", user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
        } else {
          console.log("No such document!");
        }
      };
      fetchUserData();
    }
  }, [user]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handlePostSubmit = async () => {
    if (!title || !description) {
      alert("Por favor, llena todos los campos.");
      return;
    }

    try {
      const newPublication = {
        type,
        title,
        description,
        createdAt: serverTimestamp(),
        tags: selectedTags,
      };

      await addDoc(
        collection(FIREBASE_DB, "users", user.uid, "publications"),
        newPublication
      );

      setTitle("");
      setDescription("");
      setType(null);
      setSelectedTags([]);

      alert("¡Publicación creada con éxito!");
    } catch (error) {
      console.error("Error al crear la publicación:", error);
      alert("Hubo un problema al crear la publicación");
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <View
        style={[
          uiStyle.container,
          { gap: 15, flex: 1, justifyContent: "space-between" },
        ]}
      >
        <View style={{ gap: 15 }}>
          <Text style={fontStyle.h2}>Crear publicación</Text>
          <Text style={fontStyle.h3}>Tipo de publicación</Text>

          <RNPickerSelect
            onValueChange={setType}
            placeholder={{
              label: "(Experiencia, Beca, Curso, Proyecto)",
              value: null,
            }}
            style={{
              inputIOS: {
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                borderRadius: 10,
              },
              inputAndroid: {
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                borderRadius: 10,
              },
              placeholder: {
                fontSize: 17,
                color: "gray",
              },
            }}
            value={type}
            items={[
              { label: "Experiencia", value: "experiencia" },
              { label: "Beca", value: "beca" },
              { label: "Curso", value: "curso" },
              { label: "Proyecto", value: "proyecto" },
            ]}
          />

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
          <View style={styles.tagsContainer}>
            {allTags.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tag,
                  selectedTags.includes(tag) && styles.tagSelected,
                ]}
                onPress={() => toggleTag(tag)}
              >
                <Text
                  style={{
                    color: selectedTags.includes(tag) ? "white" : "#333",
                  }}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[fontStyle.p, { textAlign: "right" }]}>
            De: {firstName} {lastName}
          </Text>
        </View>

        <Button1 onPress={handlePostSubmit}>Publicar</Button1>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  input: {
    ...uiStyle.input,
    textAlignVertical: "top",
  },
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

export default CreatePost;