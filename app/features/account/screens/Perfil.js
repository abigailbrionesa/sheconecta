import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../../FirebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function Perfil() {
  const user = FIREBASE_AUTH.currentUser;
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = doc(FIREBASE_DB, 'usuarios', user.uid);
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setNombre(data.nombre || '');
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
    <View style={styles.container}>
      <Text style={styles.label}>Correo:</Text>
      <Text>{user.email}</Text>

      <Text style={styles.label}>Nombre:</Text>
      {editando ? (
        <TextInput value={nombre} onChangeText={setNombre} style={styles.input} />
      ) : (
        <Text>{nombre}</Text>
      )}

      <Text style={styles.label}>Descripción:</Text>
      {editando ? (
        <TextInput value={descripcion} onChangeText={setDescripcion} style={styles.input} multiline />
      ) : (
        <Text>{descripcion}</Text>
      )}

      <Button
        title={editando ? 'Guardar cambios' : 'Editar perfil'}
        onPress={editando ? handleGuardar : () => setEditando(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8
  }
});
