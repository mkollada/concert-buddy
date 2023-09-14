import { Button, StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { getSupabaseShows } from '../../api';
import { Show } from '../../types/types';
import { ShowBlock } from '../../components/ShowBlock';

export default function TabOneScreen() {
  const [shows, setShows] = useState<Show[]>([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const result = await getSupabaseShows();
        setShows(result);
      } catch (error) {
        console.error('Error fetching shows', error);
      }
    };

    fetchShows();
  }, []);
  
  
  return (
    <View className='items-center p-5'>
      <Text className='font-bold'>Get started logging a show!</Text>
      <Link href="/log-show" asChild>
        <Button title='Log a show'/>        
      </Link>
      <View>
        {shows.map((show: Show) => (
          // <Text key={show.id}>Show 1 - Artist: {show.artistName}, Date: {show.date}, Venue: {show.venue}</Text>
          <ShowBlock key={show.id} show={show} />
        ))}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
