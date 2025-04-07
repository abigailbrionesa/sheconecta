import React from 'react';
import { ActivityIndicator, Button, TextInput, View } from 'react-native';
import { Text } from 'react-native';
import { FIREBASE_AUTH } from '../../../wieehackathon/FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);

        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);    
        } catch (error) {
            console.log(error);
        }   finally {  
            setLoading(false);
        }       
    }

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);    
        } catch (error) {
            console.log(error);
        }   finally {  
            setLoading(false);
        }       
    }

    return (
        <View>
            <Text>Login</Text>

            <TextInput value={email} placeholder="Email" autoCapitalize="none" onChangeText={(text)=> setEmail(text)}></TextInput>
            <TextInput secureTextEntry={true} value={password} placeholder="password" autoCapitalize="none" onChangeText={(text)=> setEmail(text)}></TextInput>

            { loading ? <ActivityIndicator size="large" color="#0000ff" /> : 
            
            <><Button title="Login" onPress={() => signIn()} /> </>}
                    <>
                    
                    <Button title="Create account" onPress={() => signUp()} />
                        
                         </>

        

        </View>
    )
}

export default Login;

function setLoading(arg0: boolean) {
    throw new Error('Function not implemented.');
}
