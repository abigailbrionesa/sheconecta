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
            <Text style={fontStyle.h1}>SheConecta</Text>
            <Text style={fontStyle.h3}>Descubre tu potencial</Text>
        </View>

    );
}

export default LoginHeader;
