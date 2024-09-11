import React from 'react';
import { View, Text, Button } from 'react-native';
import AddClothing from '../components/AddClothing';

export default function ClothingScreen({ navigation }) {
  return (
    <View>
      <Text>Add Clothing</Text>
      <AddClothing />
      <Button title="View Outfits" onPress={() => navigation.navigate('OutfitScreen')} />
    </View>
  );
}
