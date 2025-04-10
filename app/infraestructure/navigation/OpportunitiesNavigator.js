import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedOfPosts from '../../features/opportunities/screens/FeedOfPosts';
import CreatePost from '../../features/opportunities/screens/CreatePost'; 

const Stack = createNativeStackNavigator();

export const OpportunitiesNavigator = () => {
  return (
    <Stack.Navigator>
<Stack.Screen 
        name="FeedOfPosts" 
        component={FeedOfPosts} 
        options={{
          title: 'Oportunidades STEM 🌸',
          headerStyle: {
            backgroundColor: '#7f84cb', 
          },
          headerTintColor: '#ffffff', 
          headerTitleStyle: {
            fontSize: 20, 
            fontFamily: 'AbhayaLibre-ExtraBold', 
          },
        }} 
      />
      <Stack.Screen 
              options={{
                title: 'Compartir con la comunidad',
                headerStyle: {
                  backgroundColor: '#7f84cb', 
                },
                headerTintColor: '#ffffff', 
                headerTitleStyle: {
                  fontSize: 20, 
                  fontFamily: 'AbhayaLibre-ExtraBold', 
                },
              }} 

        name="CreatePost" 
        component={CreatePost} 
      />
    </Stack.Navigator>
  );
};