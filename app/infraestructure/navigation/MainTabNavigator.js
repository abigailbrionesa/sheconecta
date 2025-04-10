import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { OpportunitiesNavigator } from './OpportunitiesNavigator';
import { CommunityNavigator } from './CommunityNavigator';
import { MessageNavigator} from './MessageNavigator';
import Perfil from '../../features/account/screens/Perfil';
import { ChallengesNavigator } from './ChallengesNavigator';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Oportunidades" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Oportunidades" component={OpportunitiesNavigator} />
      <Tab.Screen name="Conectar" component={CommunityNavigator} />
      <Tab.Screen name="Retos" component={ChallengesNavigator} />
      <Tab.Screen name="Chat" component={MessageNavigator} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}
