import { View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import LoggedShow from '../../components/logged-show/logged-show';

export default function LoggedShowTabScreen() {

  const [showReload, setShowReload] = useState(true)

    useFocusEffect(
      useCallback(() => {
        setShowReload(true);
        return () => setShowReload(false);
      }, [])
    );
  
  return (
    <View className='flex-1'>
      <LoggedShow showReload={showReload} setShowReload={setShowReload}/>
    </View>
  )
}