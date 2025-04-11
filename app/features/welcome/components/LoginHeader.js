import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { Image } from 'react-native';
import { fontStyle } from '../../../utils/fontStyle';
function LoginHeader() {
    return (
        <View style={[{ gap: 10, padding: 20, alignItems: 'center' }]}>
            <Image 
                source={require('../../../../assets/orchid.png')} 
                style={{ width: 100, height: 100, resizeMode: 'contain' }}
            />
            <Text style={[fontStyle.h1, fontStyle.light]}>SheConecta</Text>
            <Text style={[fontStyle.h3, fontStyle.light]}>Descubre tu potencial</Text>
            <Text style={[fontStyle.h4, fontStyle.light]}>Caminamos juntas, crecemos juntas</Text>

        </View>

    );
}

export default LoginHeader;
