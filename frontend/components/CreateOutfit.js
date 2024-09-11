import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, Text, ScrollView } from 'react-native';
import axios from 'axios';

// Allow users to select clothing items and creat outfit
export default function CreateOutfit() {
  const [name, setName] = useState('');
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // Fetch clothing items from the backend
  useEffect(() => {
    const fetchClothing = async () => {
      const response = await axios.get('http://localhost:7000/clothing');
      setClothingItems(response.data);
    };
    fetchClothing();
  }, []);

  // Function to create the outfit
  const createOutfit = async () => {
    try {
        await axios.post('http://localhost:7000/outfit/create', {
        name,
        clothingIds: selectedItems,
      });
      alert('Outfit created successfully');
    } catch (error) {
      alert('Error creating outfit');
    }
  };

  // Function to toggle item selection
  const toggleItemSelection = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <View>
      <TextInput placeholder="Outfit Name" value={name} onChangeText={setName} />
      <ScrollView>
        {clothingItems.map((item) => (
          <View key={item._id}>
            <Text onPress={() => toggleItemSelection(item._id)}>
              {item.type} - {item.color} {selectedItems.includes(item._id) ? '✅' : ''}
            </Text>
          </View>
        ))}
      </ScrollView>
      <Button title="Create Outfit" onPress={createOutfit} />
    </View>
  );
}
