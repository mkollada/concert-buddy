import React, { useState } from 'react';
import { View, Text } from "react-native";
import EmojiButton from "./emoji-button";
import { Show } from '../../../types/types';

interface ShowDetailsRatingProps {
    show: Show
}

export default function ShowDetailsRating({ show }: ShowDetailsRatingProps) {
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const handlePress = (emoji: string) => {
    setSelectedEmoji(emoji);
  };

  const Separator = () => {
    return (
      <View style={{ height: '100%', width: 1, backgroundColor: 'gray', opacity: '0.5' }} />
    );
  };

  return (
    <View style={{ padding: 8, flexDirection: 'row', justifyContent: 'space-around' }}>
        <EmojiButton emoji="thumbs-down" selected={selectedEmoji === 'thumbs-down'} onPress={() => handlePress('thumbs-down')} />
        <Separator />
        <EmojiButton emoji="thumbs-up" selected={selectedEmoji === 'thumbs-up'} onPress={() => handlePress('thumbs-up')} />
        <Separator />
        <EmojiButton emoji="heart-eyes" selected={selectedEmoji === 'heart-eyes'} onPress={() => handlePress('heart-eyes')} />
        <Separator />
        <EmojiButton emoji="mind-blown" selected={selectedEmoji === 'mind-blown'} onPress={() => handlePress('mind-blown')} />
    </View>
  );
}
