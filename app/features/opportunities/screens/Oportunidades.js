import React, { useState, useEffect } from 'react';
import { TextInput, Button, View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../../FirebaseConfig';
import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ImageBackground } from 'react-native';
import backgroundStyle from '../../../../utils/backgroundStyle';

const Oportunidades = () => {
  const user = FIREBASE_AUTH.currentUser;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('experiencia');
  
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userDoc = doc(FIREBASE_DB, 'usuarios', user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          console.log('User data:', docSnap.data());
        } else {
          console.log('No such document!');
        }
      };

      fetchUserData();
    }
  }, [user]);

  const handlePostSubmit = async () => {
    if (!title || !description) {
      alert('Por favor, llena todos los campos.');
      return;
    }

    try {
      const newPublication = {
        type,
        title,
        description,
        createdAt: serverTimestamp(), 
      };

      await addDoc(collection(FIREBASE_DB, 'usuarios', user.uid, 'publications'), newPublication);

      setTitle('');
      setDescription('');
      setType('experiencia');

      alert('¡Publicación creada con éxito!');
    } catch (error) {
      console.error('Error al crear la publicación:', error);
      alert('Hubo un problema al crear la publicación');
    }
  };

  return (

        <ImageBackground
          source={require("../../../../assets/background.png")}
          style={backgroundStyle.background}
        >
    <View>
      <Text>Crear nueva publicación</Text>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      
      <RNPickerSelect
        onValueChange={setType}
        value={type}
        items={[
          { label: 'Experiencia', value: 'experiencia' },
          { label: 'Beca', value: 'beca' },
          { label: 'Curso', value: 'curso' },
          { label: 'Proyecto', value: 'proyecto' },
        ]}
      />
      
      <Button title="Publicar" onPress={handlePostSubmit} />
    </View>

    </ImageBackground>
  );
};

export default Oportunidades;
