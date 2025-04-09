import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../features/chat/screens/ChatScreen';
import MessagesListScreen from '../features/chat/screens/MessageListScreen';

const Stack = createNativeStackNavigator();

export const MessageNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MessagesListScreen" 
    screenOptions={{ headerShown: false }}>
        
      <Stack.Screen 
        name="ChatScreen" 
        component={ChatScreen} 
      />
      <Stack.Screen 
        name="MessagesListScreen" 
        component={MessagesListScreen} 
      />
    </Stack.Navigator>
  );
};