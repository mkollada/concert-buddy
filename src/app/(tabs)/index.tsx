import { Button, Pressable, ScrollView } from 'react-native';

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
                <Link href={`/show-details/${show.id}`} key={`${show.id}-link`}>
                  <Pressable key={`${show.id}-btn`}>
                  {({ pressed }) => (
                  <View style={{ opacity: pressed ? 0.5 : 1 }}>
                    <ShowBlock key={`${show.id}-block`} show={show} />
                  </View>
                )}
                    
                    
                  </Pressable>
                </Link>
              ))}
            </View>
          </ScrollView>
        )}
      </View>
  );
}