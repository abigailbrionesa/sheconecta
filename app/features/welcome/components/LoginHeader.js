import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';

function LoginHeader() {
    return (
        <View style={[{ gap: 10, padding: 20, alignItems: 'center' }]}>
            <Image 
                source={require('../../../../assets/orchid.png')} 
                style={{ width: 100, height: 100, resizeMode: 'contain' }}
            />
            <Text style={styles.h1}>SheConecta</Text>
            <Text style={styles.h3}>Descubre tu potencial</Text>
        </View>

    );
}

export default LoginHeader;
 
 

const styles = StyleSheet.create({
    container: {
      padding: 20,
      marginTop: 100,
    },
    h1: {
      fontSize: 50,
      color: "white",
      textAlign: "center",
      fontFamily: "AbhayaLibre-ExtraBold",
    },
    h3: {
      fontSize: 20,
      textTransform: "uppercase",
      color: "white",
      letterSpacing:2,
      textAlign: "center",
      fontFamily: "AbhayaLibre-Bold",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
    spacer: {
      height: 10,
    },
    background: {
      width: "100%",
      height: "100%",
}});