import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedOfPosts from '../features/opportunities/screens/FeedOfPosts';
import CreatePost from '../features/opportunities/screens/CreatePost'; 

const Stack = createNativeStackNavigator();

export const OpportunitiesNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="FeedOfPosts" 
        component={FeedOfPosts} 
        options={{ title: 'Posts' }} 
      />
      <Stack.Screen 
        name="CreatePost" 
        component={CreatePost} 
        options={{ title: 'Create Post' }} 
      />
    </Stack.Navigator>
  );
};