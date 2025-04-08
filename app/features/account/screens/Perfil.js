import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../../FirebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ImageBackground } from 'react-native';
import { backgroundStyle } from '../../../utils/backgroundStyle';
import { fontStyle } from '../../../utils/fontStyle';
import { uiStyle } from '../../../utils/uiStyle';

export default function Perfil() {
  const user = FIREBASE_AUTH.currentUser;
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = doc(FIREBASE_DB, 'users', user.uid);
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setNombre(data.name || '');
        setDescripcion(data.descripcion || '');
      }
    };

    fetchUserData();
  }, []);

  const handleGuardar = async () => {
    const userDoc = doc(FIREBASE_DB, 'usuarios', user.uid);
    await setDoc(userDoc, {
      nombre,
      descripcion
    }, { merge: true });

    setEditando(false);
  };

  return (

    <ImageBackground
    source={require("../../../../assets/background.png")}
    style={backgroundStyle.background}
  >


    <View style={uiStyle.container}>
    <Text style={fontStyle.h2}>{user.firstName} {user.lastName}</Text>


      <Text style={fontStyle.h3}>Correo:</Text>
      <Text>{user.email}</Text>

      <Text style={fontStyle.h3}>Nombre:</Text>
      {editando ? (
        <TextInput value={nombre} onChangeText={setNombre} style={fontStyle.h3} />
      ) : (
        <Text>{nombre}</Text>
      )}

      <Text style={fontStyle.h3}>Descripción:</Text>
      {editando ? (
        <TextInput value={descripcion} onChangeText={setDescripcion} style={fontStyle.h3} multiline />
      ) : (
        <Text>{descripcion}</Text>
      )}

      <Button
        title={editando ? 'Guardar cambios' : 'Editar perfil'}
        onPress={editando ? handleGuardar : () => setEditando(true)}
      />
    </View>

    </ImageBackground>
  );
}
