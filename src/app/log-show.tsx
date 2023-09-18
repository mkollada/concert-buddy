import { View } from '../components/Themed';
import LogShowAccordion from '../components/LogShowAccordion';
import React from 'react';

export default function LogShowScreen() {  
  return (
    <View className='flex-1 justify-center'>
      <LogShowAccordion />
    </View>
  );
}