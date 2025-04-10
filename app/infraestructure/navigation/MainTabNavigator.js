import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { OpportunitiesNavigator } from './OpportunitiesNavigator';
import { CommunityNavigator } from './CommunityNavigator';
import { MessageNavigator } from './MessageNavigator';
import Perfil from '../../features/account/screens/Perfil';
import { ChallengesNavigator } from './ChallengesNavigator';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const tabBarIcon = (iconName) => ({ color, size }) => (
  <Ionicons name={iconName} size={size} color={color} />
);

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Oportunidades"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#9eb0dc',
          borderTopWidth: 0, 
          height: 60,
        },
        tabBarActiveTintColor: '#3f60a0',
        tabBarInactiveTintColor: '#f0f7fd', 
        tabBarLabelStyle: {
          fontSize: 12, 
          fontFamily: 'AbhayaLibre-ExtraBold',

        },
      }}>
      <Tab.Screen
        name="Oportunidades"
        component={OpportunitiesNavigator}
        options={{
          tabBarIcon: tabBarIcon('rocket-outline'),
          title:"Posts"
        }}
      />
      <Tab.Screen
        name="Conectar"
        component={CommunityNavigator}
        options={{
          tabBarIcon: tabBarIcon('people-outline'),
        }}
      />
      <Tab.Screen
        name="Retos"
        component={ChallengesNavigator}
        options={{
          tabBarIcon: tabBarIcon('trophy-outline'),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={MessageNavigator}
        options={{
          tabBarIcon: tabBarIcon('chatbubbles-outline'),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: tabBarIcon('person-outline'),
        }}
      />
    </Tab.Navigator>
  );
}