import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CommunityProfiles from '../../features/connect/screens/CommunityProfiles';
import FavoriteProfiles from '../../features/connect/screens/FavoriteProfiles';

const Stack = createNativeStackNavigator();

export const CommunityNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="CommunityProfiles" 
    screenOptions={{ headerShown: false }}>
        
      <Stack.Screen 
        name="CommunityProfiles" 
        component={CommunityProfiles} 
      />
      <Stack.Screen 
        name="FavoriteProfiles" 
        component={FavoriteProfiles} 
      />
    </Stack.Navigator>
  );
};