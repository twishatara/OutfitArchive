import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';  // Example main screen
import ClothingDetails from './screens/ClothingDetails';  // The new screen for displaying clothing details

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ClothingDetails" component={ClothingDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
