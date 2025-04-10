import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChallengeDetails } from "../../features/challenges/screens/ChallengeDetails";
import { ChallengesScreen } from "../../features/challenges/screens/ChallengesScreen";

const Stack = createNativeStackNavigator();

export const ChallengesNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ChallengesScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ChallengesScreen" component={ChallengesScreen} />
      <Stack.Screen
        name="ChallengeDetails"
        component={ChallengeDetails}

        options={{
          headerShown: true,
          title: 'Más Detalles',
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
    </Stack.Navigator>
  );
};
