import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Conectar from '../features/connect/screens/Conectar';
import Perfil from '../features/account/screens/Perfil';
import { OpportunitiesNavigator } from './OpportunitiesNavigator';
import { MessageNavigator } from './MessageNavigator';
const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Oportunidades" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Oportunidades" component={OpportunitiesNavigator} />
      <Tab.Screen name="Conectar" component={Conectar} />
      <Tab.Screen name="Chat" component={MessageNavigator} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}
