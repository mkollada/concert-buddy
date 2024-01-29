import React from 'react';
import { View } from "react-native";
import EmojiButton from "./emoji-button";
import Separator from './separator';

interface EmojiRatingBarProps {
    rating: number | null
    setRating: (value: number) => void
}

export default function EmojiRatingBar({ rating, setRating }: EmojiRatingBarProps) {

  const handlePress = (newRating: number) => {
    setRating(newRating)
  }

  return (
    <View style={{ padding: 8, flexDirection: 'row', justifyContent: 'space-around' }}>
        <EmojiButton emoji={1} selected={rating === 1} onPress={() => handlePress(1)} />
        <Separator />
        <EmojiButton emoji={0} selected={rating === 0} onPress={() => handlePress(0)} />
        <Separator />
        <EmojiButton emoji={2} selected={rating === 2} onPress={() => handlePress(2)} />
        <Separator />
        <EmojiButton emoji={3} selected={rating === 3} onPress={() => handlePress(3)} />
    </View>
  );
}