import { View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LoggedShow from '../../components/logged-show/logged-show';

export default function LoggedShowTabScreen() {

  const [showReload, setShowReload] = useState(true)
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      // Do something when the screen is focused
      setShowReload(true)
    });

    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);
  
  return (
    <View className='flex-1'>
      <LoggedShow showReload={showReload} setShowReload={setShowReload}/>
    </View>
  )
}