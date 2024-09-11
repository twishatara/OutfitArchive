import React from 'react';
import { View, Text } from 'react-native';
import CreateOutfit from '../components/CreateOutfit';

export default function OutfitScreen() {
  return (
    <View>
      <Text>Create an Outfit</Text>
      <CreateOutfit />
    </View>
  );
}
