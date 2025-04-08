import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../../FirebaseConfig";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import { uiStyle } from "../../../utils/uiStyle";
import Button1 from "../../welcome/components/Button1";
import { fontStyle } from "../../../utils/fontStyle";
import { Image } from "react-native";

const typeOptions = ["curso", "proyecto", "experiencia", "beca"];
const tagOptions = ["Ingenieria", "Matematica", "Tecnología", "Ciencia"];

const FeedOfPosts = () => {
  const [publications, setPublications] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const navigation = useNavigation();

  const fetchAllPublications = async () => {
    try {
      const usersRef = collection(FIREBASE_DB, "users");
      const usersSnapshot = await getDocs(usersRef);
      const allPublications = [];

      for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id;
        const userDocRef = doc(FIREBASE_DB, "users", userId);
        const userSnapshot = await getDoc(userDocRef);
        const userData = userSnapshot.data();

        const publicationsRef = collection(
          FIREBASE_DB,
          "users",
          userId,
          "publications"
        );
        const publicationsSnapshot = await getDocs(publicationsRef);

        publicationsSnapshot.forEach((pubDoc) => {
          allPublications.push({
            userId,
            publicationId: pubDoc.id,
            author: `${userData.firstName} ${userData.lastName}`,
            ...pubDoc.data(),
          });
        });
      }

      setPublications(allPublications);
    } catch (error) {
      console.error("Error fetching publications:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAllPublications();
    }, [])
  );

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredPublications = publications.filter(
    (pub) =>
      (selectedTypes.length === 0 || selectedTypes.includes(pub.type)) &&
      (selectedTags.length === 0 ||
        pub.tags?.some((tag) => selectedTags.includes(tag)))
  );

  const groupedByType = typeOptions.reduce((acc, type) => {
    acc[type] = filteredPublications.filter((pub) => pub.type === type);
    return acc;
  }, {});

  const tagOptions = [
    {
      name: "Ingeniería",
      imageUrl:
        "https://www.itcsa.es/wp-content/uploads/Ingenieria-planos-detalle-320x220.jpg",
    },
    {
      name: "Matemática",
      imageUrl:
        "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/164EE/production/_109347319_gettyimages-611195980.jpg.webp",
    },
    {
      name: "Tecnología",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuMFJkwKYntOfm07r0IDZgK1arpN4mV3jmeg&s",
    },
    {
      name: "Ciencia",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx5Y97nIfyLzsWAyyQLrPxQjs-hjFokujppA&s",
    },
  ];

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <ScrollView contentContainerStyle={{ padding: 20, gap: 15 }}>
        <Button1 onPress={() => navigation.navigate("CreatePost")}>
          Crear Publicación
        </Button1>

        <View>
          <Text style={fontStyle.h3}>Filtrar por tema</Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginVertical: 8,
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
                <Image
                  source={{ uri: tag.imageUrl }}
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                />
                <Text style={fontStyle.p}>{tag.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={{backgroundColor: "#faf5f3"}}>

        {typeOptions.map(
          (type) =>
            groupedByType[type].length > 0 && (
              <View key={type} style={{backgroundColor: "#faf5f3"}}>
                <Text style={fontStyle.h3}>{type}</Text>
                {groupedByType[type].map((item) => (
                  <View key={item.publicationId}>
                    <Text style={fontStyle.p}>{item.title}</Text>
                    <Text style={fontStyle.p}>{item.description}</Text>
                    <Text style={fontStyle.p}>{item.type}</Text>
                    <Text style={fontStyle.p}>
                      {new Date(
                        item.createdAt.seconds * 1000
                      ).toLocaleDateString()}
                    </Text>
                    <Text style={fontStyle.p}>Autor: {item.author}</Text>
                  </View>
                ))}
              </View>
            )
        )}

</View>
      </ScrollView>
    </ImageBackground>
  );
};

export default FeedOfPosts;
