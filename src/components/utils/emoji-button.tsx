import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

interface EmojiButtonProps {
    emoji: 0 | 1 | 2 | 3;
    selected: boolean;
    onPress: () => void;
    editEnabled: boolean
  }

const EmojiButton: React.FC<EmojiButtonProps> = ({ emoji, selected, onPress, editEnabled }) => {
  const getEmojiName = (emojiKey: number) => {
    switch (emojiKey) {
      case 0:
        return '\u{1F44E}'; // thumbs-down
      case 1:
        return '\u{1F44D}'; // thumbs-up
      case 2:
        return '\u{1F60D}'; // heart-eyes
      case 3:
        return '\u{1F92F}'; // mind-blown
      default:
        return 'smile';
    }
  };

  const styles = StyleSheet.create({
    button: {
      backgroundColor: selected ? 'blue' : 'transparent', // Change color when selected
    },
  });

  return (
      <TouchableOpacity className='py-2.5 pl-2.5 pr-1 rounded-3xl items-center' style={styles.button} onPress={onPress} activeOpacity={editEnabled ? 0.5 : 1}>
        <Text className='text-3xl items-center'>{getEmojiName(emoji)} </Text>
      </TouchableOpacity>
  );
};

export default EmojiButton;
