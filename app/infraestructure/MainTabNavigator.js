import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chat from '../features/chat/screens/Chat';
import Conectar from '../features/connect/screens/Conectar';
import Oportunidades from '../features/opportunities/screens/Oportunidades';
import Perfil from '../features/account/screens/Perfil';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Perfil" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Oportunidades" component={Oportunidades} />
      <Tab.Screen name="Conectar" component={Conectar} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}
