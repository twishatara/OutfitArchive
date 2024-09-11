import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function ClothingDetails({ route }) {
  const [clothingData, setClothingData] = useState(null);  // To store the fetched clothing data
  const clothingId = route.params.id;  // Assume you pass the clothing item ID through route params

  useEffect(() => {
    const fetchClothingDetails = async () => {
      try {
        // Fetch clothing details and signed image URL from the backend
        const response = await axios.get(`http://localhost:7000/clothing/${clothingId}`);
        setClothingData(response.data);
      } catch (error) {
        console.error('Error fetching clothing details:', error);
      }
    };

    fetchClothingDetails();
  }, [clothingId]);

  // While loading, show a message or spinner
  if (!clothingData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{clothingData.clothing.type}</Text>
      <Text>{clothingData.clothing.color}</Text>
      <Text>{clothingData.clothing.brand}</Text>

      {/* Display the image using the signed URL from the backend */}
      <Image 
        source={{ uri: clothingData.imageUrl }}  // The signed URL for the image
        style={styles.image}
      />
    </View>
  );
}

// Basic styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
