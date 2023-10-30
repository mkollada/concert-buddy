import { View } from '../components/Themed';
import LogShowAccordion from '../components/LogShowAccordion';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

export default function LogShowScreen() { 
  const params = useLocalSearchParams()

  console.log(params)
 
  return (
    <View className='flex-1 justify-center'>
      <LogShowAccordion />
    </View>
  );
}