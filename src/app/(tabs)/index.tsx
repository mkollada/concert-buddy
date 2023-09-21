import { Button, ScrollView } from 'react-native';

import { Text, View } from '../../components/Themed';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { getSupabaseShows } from '../../api';
import { Show } from '../../types/types';
import { ShowBlock } from '../../components/ShowBlock';
import { useNavigation } from '@react-navigation/native';

export default function TabOneScreen() {
  const [shows, setShows] = useState<Show[]>([]);

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      console.log('focusing')
      // Do something when the screen is focused
      const fetchShows = async () => {
        try {
          const result = await getSupabaseShows();
          setShows(result);
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
            <Link href="/log-show" asChild>
              <Button title='Log a show'/>        
            </Link>
          </View>
        ) : (
          <ScrollView className='flex-1'>
            <View className='bg-transparent'>
              {shows.map((show: Show) => (
                // <Text key={show.id}>Show 1 - Artist: {show.artistName}, Date: {show.date}, Venue: {show.venue}</Text>
                <ShowBlock key={show.id} show={show} />
                  

              ))}
            </View>
          </ScrollView>
        )}
      </View>
  );
}