import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

export default function OutfitScreen({ route }) {
  const [outfitData, setOutfitData] = useState(null);  // To store the fetched outfit data
  const [clothingItems, setClothingItems] = useState([]);  // To store clothing items with their details and signed URLs
  const outfitId = route.params.id;  // Assume you pass the outfit ID through route params

  useEffect(() => {
    const fetchOutfitDetails = async () => {
      try {
        // Fetch the outfit details from the backend
        const response = await axios.get(`http://localhost:7000/outfit/${outfitId}`);
        setOutfitData(response.data);

        // Now fetch details for each clothing item in the outfit
        const clothingPromises = response.data.clothingIds.map((clothingId) => 
          axios.get(`http://localhost:7000/clothing/${clothingId}`)
        );

        const clothingResponses = await Promise.all(clothingPromises);
        setClothingItems(clothingResponses.map(res => res.data));  // Store all clothing items with their details
      } catch (error) {
        console.error('Error fetching outfit details:', error);
      }
    };

    fetchOutfitDetails();
  }, [outfitId]);

  if (!outfitData || clothingItems.length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Outfit: {outfitData.name}</Text>

      {clothingItems.map((item, index) => (
        <View key={index} style={styles.clothingItem}>
          <Text style={styles.itemTitle}>{item.clothing.type}</Text>
          <Text>{item.clothing.color}</Text>
          <Text>{item.clothing.brand}</Text>
          <Image 
            source={{ uri: item.imageUrl }}  // Use the signed URL for the image
            style={styles.image}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  clothingItem: {
    marginBottom: 20,
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});
