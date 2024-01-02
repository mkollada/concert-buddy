import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

interface EmojiButtonProps {
    emoji: 'thumbs-down' | 'thumbs-up' | 'heart-eyes' | 'mind-blown';
    selected: boolean;
    onPress: () => void;
  }

const EmojiButton: React.FC<EmojiButtonProps> = ({ emoji, selected, onPress }) => {
  const getEmojiName = (emojiKey: string) => {
    switch (emojiKey) {
      case 'thumbs-down':
        return '\u{1F44D}';
      case 'thumbs-up':
        return '\u{1F44E}';
      case 'heart-eyes':
        return '\u{1F60D}';
      case 'mind-blown':
        return '\u{1F92F}'; 
      default:
        return 'smile';
    }
  };

  const styles = StyleSheet.create({
    button: {
      backgroundColor: selected ? 'blue' : 'transparent', // Change color when selected
      padding: 10,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {/* <Icon name={getEmojiName(emoji)} size={30} color="#fff" /> */}
        <Text className='text-3xl'>{getEmojiName(emoji)} </Text>
    </TouchableOpacity>
  );
};

export default EmojiButton;
