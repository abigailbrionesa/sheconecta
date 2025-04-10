import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { FIREBASE_DB } from "../../../../FirebaseConfig";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import Button1 from "../../welcome/components/Button1";
import { fontStyle } from "../../../utils/fontStyle";
import Loading from "../../welcome/components/Loading";
import { typeOptions } from "../../../utils/typeOptions";
import { tagOptions } from "../../../utils/tagOptions";

const FeedOfPosts = () => {
  const [publications, setPublications] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchAllPublications = async () => {
        setLoading(true);
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
        } finally {
          setLoading(false);
        }
      };

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

  const renderTagButton = (tag) => (
    <TouchableOpacity
      key={tag.name}
      onPress={() => toggleTag(tag.name)}
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: 80,
        borderRadius: 40,
        margin: 5,
        opacity: selectedTags.includes(tag.name) ? 0.6 : 1,
      }}
    >
      <Image
        source={{ uri: tag.imageUrl }}
        style={{ width: 60, height: 60, borderRadius: 30 }}
      />
      <Text style={[fontStyle.p, fontStyle.light]}>{tag.name}</Text>
    </TouchableOpacity>
  );

  const renderPublications = (type) => (
    <View
      key={type}
      style={{ backgroundColor: "#faf5f3", flex: 1, padding: 20, gap: 15 }}
    >
      <Text style={[fontStyle.h3, fontStyle.pink]}>{type}</Text>
      {groupedByType[type].map((item) => (
        <View
          key={item.publicationId}
          style={{ backgroundColor: "#e6dafd", padding: 10, borderRadius: 10 }}
        >
          <Text style={fontStyle.h4}>{item.title}</Text>
          <Text style={fontStyle.p}>Autor: {item.author}</Text>
          <View style={{ backgroundColor: "gray", width: "100%", height: 1 }} />
          <Text style={fontStyle.p}>{item.description}</Text>
          <Text style={[fontStyle.p, fontStyle.gray]}>
            {new Date(item.createdAt.seconds * 1000).toLocaleDateString()}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={{ padding: 20, gap: 15 }}>
          <Text style={[fontStyle.h3, fontStyle.light]}>Filtrar por tema</Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: 10,
              justifyContent: "space-between",
            }}
          >
            {tagOptions.map(renderTagButton)}
          </View>

          {loading ? (
            <>
              <Loading />
              <Text style={[fontStyle.h4, fontStyle.light]}>
                {" "}
                Estamos trabajando para brindarte la mejor experiencia. El
                contenido se está cargando... ¡Gracias por tu paciencia!
              </Text>
              <Text style={[fontStyle.p, fontStyle.light]}>
                ¡Bienvenida a SheConecta! 🌟 Una app creada por mujeres en STEM,
                pensada para empoderar a todas las que se enfrentan a la falta
                de guía, mentoras y una comunidad de apoyo. Con un modelo de
                suscripción accesible y planes escalables, nos unimos a
                universidades, voluntariados y organizaciones para generar un
                impacto real. Porque cuando una mujer se conecta, crece. Y
                cuando crecen juntas, ¡transforman el mundo! 💪💫
              </Text>
            </>
          ) : (
            <View>
              {typeOptions.map(
                (type) =>
                  groupedByType[type].length > 0 && renderPublications(type)
              )}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={{ margin: 20 }}>
        <Button1 onPress={() => navigation.navigate("CreatePost")}>
          Crear Publicación
        </Button1>
      </View>
    </ImageBackground>
  );
};

export default FeedOfPosts;
