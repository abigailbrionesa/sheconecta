import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlanDetailsScreen from "./PlanDetailsScreen";
import SubscriptionScreen from './SubscriptionScreen';

const Stack = createNativeStackNavigator();

export const SubscriptionStack = ({ route }) => {
  const userData = route.params;

  console.log(userData, "user data in stack")

  return (
    <Stack.Navigator initialRouteName="SubscriptionScreen">
      <Stack.Screen 
        name="SubscriptionScreen" 
        options={{ headerShown: false }}
      >
        {(props) => (
          <SubscriptionScreen 
            {...props} 
            userData={userData} 
          />
        )}
      </Stack.Screen>
      <Stack.Screen 
        name="PlanDetails" 
        options={{ headerShown: false }}
      >
        {(props) => (
          <PlanDetailsScreen 
            {...props} 
            userData={userData} 
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
