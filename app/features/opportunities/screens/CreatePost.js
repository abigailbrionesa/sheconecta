import React, { useState } from "react";
import { View, ImageBackground, ScrollView } from "react-native";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../../FirebaseConfig";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { uiStyle } from "../../../utils/uiStyle";
import useUserData from "../components/useUserData";
import PostForm from "../components/PostForm";
import Button1 from "../../welcome/components/Button1";
import { getDoc, doc, updateDoc } from "firebase/firestore";

const CreatePost = () => {
  const user = FIREBASE_AUTH.currentUser;
  const { firstName, lastName } = useUserData();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Experiencia");
  const [selectedTopicTags, setSelectedTopicTags] = useState([]);
  const [selectedLanguageTags, setSelectedLanguageTags] = useState([]);

  const allTopicTags = ["Ingeniería", "Matemática", "Ciencia", "Tecnología"];

  const allLanguageTags = [
    "Español", 
    "Quechua", 
    "Aymara", 
    "Awajún", 
    "Shipibo", 
    "Ashaninka", 
    "Matsigenka", 
    "Kandozi-Chapra"
  ];

  const toggleTopicTag = (tag) => {
    setSelectedTopicTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleLanguageTag = (tag) => {
    setSelectedLanguageTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handlePostSubmit = async () => {
    if (!title || !description) {
      alert("Por favor, llena todos los campos.");
      return;
    }
  
    try {
      const newPost = {
        type,
        title,
        description,
        tags: selectedTopicTags.concat(selectedLanguageTags),
        createdAt: serverTimestamp(),
      };
  
      await addDoc(
        collection(FIREBASE_DB, "users", user.uid, "publications"),
        newPost
      );
  
      const userRef = doc(FIREBASE_DB, "users", user.uid);
      const userSnapshot = await getDoc(userRef);
      
      if (userSnapshot.exists()) {
        const currentScore = userSnapshot.data().score || 0;
        const updatedScore = currentScore + 5;
  
        await updateDoc(userRef, { score: updatedScore });
  
        alert(`¡Publicación creada con éxito! Tu puntuación ha aumentado a ${updatedScore}.`);
      } else {
        alert("No se pudo encontrar el usuario.");
      }
  
      setTitle("");
      setDescription("");
      setType(null);
      setSelectedTopicTags([]);
      setSelectedLanguageTags([]);
    } catch (err) {
      console.error(err);
      alert("Error al crear la publicación");
    }
  };
  
  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <ScrollView contentContainerStyle={[uiStyle.container, { gap: 15, flexGrow: 1, justifyContent: "space-between", marginTop:10, }]}>
        <PostForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          type={type}
          setType={setType}
          selectedTopicTags={selectedTopicTags}
          toggleTopicTag={toggleTopicTag}
          allTopicTags={allTopicTags}
          selectedLanguageTags={selectedLanguageTags}
          toggleLanguageTag={toggleLanguageTag}
          allLanguageTags={allLanguageTags}
          firstName={firstName}
          lastName={lastName}
        />
        <Button1 onPress={handlePostSubmit}>Publicar</Button1>
      </ScrollView>
    </ImageBackground>
  );
};

export default CreatePost;
