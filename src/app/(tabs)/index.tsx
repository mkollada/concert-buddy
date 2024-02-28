import { Button, ScrollView } from 'react-native';

import { Text, View } from '../react-native';
import { Link } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { getSupabaseShows } from '../../api';
import { Show } from '../../types/types';
import { ShowBlock } from '../../components/ShowBlock';
import { useNavigation } from '@react-navigation/native';

export default function TabOneScreen() {
  const [shows, setShows] = useState<Show[]>([]);
  const [deleteShowId, setDeleteShowId] = useState('')
  const isInitialRender = useRef(true)

  const navigation = useNavigation()

  // To immediately delete deleted show from logged shows on page
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false // Toggle ref after first render
      return;
  }
    const updatedShows = shows.filter(show => show.id !== deleteShowId)
    setShows(updatedShows)
    // setDeleteShowId('')

  },[deleteShowId])

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      // Do something when the screen is focused
      const fetchShows = async () => {
        try {
          const result = await getSupabaseShows();
          // Sort shows by date in ascending order
          const sortedShows = result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setShows(sortedShows);
        } catch (error) {
          console.error('Error fetching shows', error);
        }
      };
      fetchShows();
    });

    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);
  
  return (
    <View className='flex-1 p-5'>
      {shows.length === 0 ? ( 
        <View className='flex-1 justify-center items-center'>
          <Text className='font-bold'>Get started logging a show!</Text>
          <Link href="/find-artist" asChild>
            <Button title='Log a show'/>        
          </Link>
        </View>
      ) : (
        <ScrollView className='flex-1'>     
          <View className='bg-transparent'>
            {shows.map((show: Show) => (
                <View key={`${show.id}-btn`}>
                  <ShowBlock show={show} setDeleteShowId={setDeleteShowId}/>
                </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  )
}