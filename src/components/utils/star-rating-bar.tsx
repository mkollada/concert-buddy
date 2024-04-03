import React from 'react';
import { View } from "react-native";
import StarButton from './star-button';

interface StarRatingBarProps {
    rating: number
    setRating: (value: number) => void
    editEnabled: boolean
}

export default function StarRatingBar({ rating, setRating, editEnabled }: StarRatingBarProps) {

  const handlePress = (newRating: number) => {
    if(editEnabled){
      setRating(newRating)
    }
    
  }

  return (
    <View style={{ padding: 8, flexDirection: 'row', justifyContent: 'space-around' }}>
        <StarButton selected={rating >= 0} onPress={() => handlePress(0)} editEnabled={editEnabled}/>
        <StarButton selected={rating >= 1} onPress={() => handlePress(1)} editEnabled={editEnabled}/>
        <StarButton selected={rating >= 2} onPress={() => handlePress(2)} editEnabled={editEnabled}/>
        <StarButton selected={rating >= 3} onPress={() => handlePress(3)} editEnabled={editEnabled}/>
        <StarButton selected={rating >= 4} onPress={() => handlePress(4)} editEnabled={editEnabled}/>
    </View>
  );
}
