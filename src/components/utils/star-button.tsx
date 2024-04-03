import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

interface StarButtonProps {
    selected: boolean;
    onPress: () => void;
    editEnabled: boolean
  }

const StarButton: React.FC<StarButtonProps> = ({ selected, onPress, editEnabled }) => {

  onPress

  return (
      <TouchableOpacity className='py-2.5 pl-2.5 pr-1 rounded-3xl items-center' onPress={onPress} activeOpacity={editEnabled ? 0.5 : 1}>
        <FontAwesome size={36} name='star' color={selected ? '#E9A939':'#1F3346'} />
      </TouchableOpacity>
  );
};

export default StarButton;
