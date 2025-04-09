import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessagesInbox from '../../features/chat/screens/MessagesInbox';
import PersonalChat from '../../features/chat/screens/PersonalChat';


const Stack = createNativeStackNavigator();

export const MessageNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MessagesInbox" 
    screenOptions={{ headerShown: false }}>
        
      <Stack.Screen 
        name="ChatScreen" 
        component={PersonalChat} 
      />
      <Stack.Screen 
        name="MessagesInbox" 
        component={MessagesInbox} 
      />
    </Stack.Navigator>
  );
};