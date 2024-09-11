import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ClothingScreen from './screens/ClothingScreen';
import OutfitScreen from './screens/OutfitScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ClothingScreen">
        <Stack.Screen name="ClothingScreen" component={ClothingScreen} options={{ title: 'Clothing' }} />
        <Stack.Screen name="OutfitScreen" component={OutfitScreen} options={{ title: 'Outfits' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
