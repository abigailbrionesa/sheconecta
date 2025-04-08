import React from 'react';
import { Text } from 'react-native';
import { styles } from '../../../utils/appStyle';
import { View } from 'react-native';
import { Image } from 'react-native';

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
 
 

