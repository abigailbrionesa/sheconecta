import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, Alert, Button } from "react-native";
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../../FirebaseConfig";
import { backgroundStyle } from "../../../utils/backgroundStyle";
import GoBackButton from "../../welcome/components/GoBackButton";
import NextButton from "../../welcome/components/NextButton";
import Button1 from "../../welcome/components/Button1";
import { Ionicons } from "@expo/vector-icons";
import UserProfileCard from "../components/UserProfileCard";
import Loading from "../../welcome/components/Loading";
export default function CommunityProfiles({ navigation }) {
  const [users, setUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [savedContacts, setSavedContacts] = useState([]);
  const [filterMentors, setFilterMentors] = useState(false);

  const currentAuthenticatedUser = FIREBASE_AUTH.currentUser;
  const currentAuthenticatedUserId = currentAuthenticatedUser?.uid;

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(FIREBASE_DB, "users"));
      const list = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const filteredUsers = list.filter(
        (user) =>
          user.id !== currentAuthenticatedUserId &&
          (!filterMentors || user.type === "mentor")
      );
      setUsers(filteredUsers);
    };
    fetchUsers();
  }, [currentAuthenticatedUserId, filterMentors]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = doc(FIREBASE_DB, "users", currentAuthenticatedUserId);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSavedContacts(data.savedContacts || []);
      }
    };
    if (currentAuthenticatedUserId) {
      fetchUserData();
    }
  }, [currentAuthenticatedUserId]);

  const userBeingDisplayed = users[currentUserIndex];

  const handleHeart = async (userId) => {
    try {
      if (!savedContacts.includes(userId)) {
        const updatedContacts = [...savedContacts, userId];
        await setDoc(
          doc(FIREBASE_DB, "users", currentAuthenticatedUserId),
          { savedContacts: updatedContacts },
          { merge: true }
        );
        setSavedContacts(updatedContacts);
        Alert.alert("Guardado", "Contacto añadido a tus aliadas STEM.");
      } else {
        const updatedContacts = savedContacts.filter((id) => id !== userId);
        await setDoc(
          doc(FIREBASE_DB, "users", currentAuthenticatedUserId),
          { savedContacts: updatedContacts },
          { merge: true }
        );
        setSavedContacts(updatedContacts);
        Alert.alert("Eliminado", "Contacto eliminado de tus aliadas STEM.");
      }
    } catch (error) {
      console.error("Error updating saved contacts:", error);
      Alert.alert("Error", "Ocurrió un error. Inténtalo de nuevo.");
    }
  };

  const startChat = async (otherUserId) => {
    try {
      const chatId =
        currentAuthenticatedUserId < otherUserId
          ? `${currentAuthenticatedUserId}_${otherUserId}`
          : `${otherUserId}_${currentAuthenticatedUserId}`;

      await setDoc(doc(FIREBASE_DB, "chats", chatId), {
        participants: [currentAuthenticatedUserId, otherUserId],
        createdAt: new Date(),
      });

      const otherUser = users.find((u) => u.id === otherUserId);

      navigation.navigate("Chat", {
        chatId,
        recipientId: otherUserId,
        recipientName: `${otherUser.firstName} ${otherUser.lastName}`,
        recipientPhoto: otherUser.profilePictureUrl,
      });
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  const nextUser = () => {
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    } else {
      Alert.alert("No más usuarios");
    }
  };

  const previousUser = () => {
    if (currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1);
    } else {
      Alert.alert("Estás en el primer usuario");
    }
  };

  const alreadySaved =
    userBeingDisplayed && savedContacts.includes(userBeingDisplayed.id);

  return (
    <ImageBackground
      source={require("../../../../assets/background.png")}
      style={backgroundStyle.background}
    >

      <View style={{ justifyContent: "space-between", alignItems: "center", padding:20, marginTop:10, gap:15 }}> 
      <Button1
        onPress={() => navigation.navigate("FavoriteProfiles")}
        icon={<Ionicons name="bookmark-outline" size={20} color="white" />}
      >
        Guardadas
      </Button1>

      <Button1
        onPress={() => setFilterMentors(!filterMentors)}
        color="#9c6f97"
        icon={<Ionicons name="people-outline" size={20} color="white" />}
      >
        {filterMentors ? "Mostrar Todos" : "Mostrar Mentores"}
      </Button1>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        {userBeingDisplayed ? (
          <UserProfileCard
            user={userBeingDisplayed}
            alreadyLiked={alreadySaved}
            onHeartPress={() => handleHeart(userBeingDisplayed.id)}
            onMessagePress={() => startChat(userBeingDisplayed.id)}
          />
        ) : (
          <Loading/>
        )}
      </View>

      <View
        style={{
          padding: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 20,
          width: "100%",
        }}
      >
        <GoBackButton onPress={previousUser} />
        <NextButton onPress={nextUser} />
      </View>
    </ImageBackground>
  );
}
