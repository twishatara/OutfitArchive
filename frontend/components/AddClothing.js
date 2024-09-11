import React, { useState } from 'react';
import { View, TextInput, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

// Where users can upload clothing items, select an image, adn submit it to backend
export default function AddClothing() {
  const [type, setType] = useState('');
  const [color, setColor] = useState('');
  const [brand, setBrand] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  // Image Picker for selecting clothing photo
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUrl(result.uri);
    }
  };

  // Function to add clothing item
  const addClothing = async () => {
    try {
        await axios.post('http://localhost:7000/outfit/add', {
        type,
        color,
        brand,
        imageUrl, // Use Cloudinary/S3 to store image and get URL
      });
      alert('Clothing added successfully');
    } catch (error) {
      alert('Error adding clothing');
    }
  };

  return (
    <View>
      <TextInput placeholder="Type" value={type} onChangeText={setType} />
      <TextInput placeholder="Color" value={color} onChangeText={setColor} />
      <TextInput placeholder="Brand" value={brand} onChangeText={setBrand} />
      <Button title="Pick an image" onPress={pickImage} />
      {imageUrl && <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />}
      <Button title="Add Clothing" onPress={addClothing} />
    </View>
  );
}
