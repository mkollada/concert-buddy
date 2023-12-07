import React, { useState, useEffect } from 'react';
import { Text, View } from '../../../components/Themed';
import { JamBaseEvent } from '../../../types/jambase';
import {  ScrollView, TouchableOpacity } from 'react-native';
import SelectShowBlock from './select-show-block';
// import { searchArtistName } from '../../../api/jambase';
import { getPastEventsForArtist } from '../../../api/jambase';

interface SelectPastShowDropdownProps {
  artistId: string
}
export function SelecPastShowDropdown({ artistId }: SelectPastShowDropdownProps) {
  const [events, setEvents] = useState<{ [year: string]: JamBaseEvent[]; }>({})

  useEffect(() => {

    async function fetchApiData() {
    
      if (artistId) {
        const response = await getPastEventsForArtist(artistId);
        if (response) {
          setEvents(response.artist['x-pastEvents'])
        }
      }
    }

    fetchApiData();

  }, [])
  
  return (
    <ScrollView className='flex-1'>
      <View className='flex-1'>
        {Object.keys(events)
          .sort((a, b) => Number(b) - Number(a))  // Sorting in descending order
          .map(year => (
            <View key={year}>
              <Text className='text-xl font-bold'>{year}</Text>
              {events[year].map((event, ix) => (
                <View className='flex-row p-5' key={ix}>
                  <TouchableOpacity className='flex-1'
                    // onPress={() => {
                    //   router.push({ pathname: "/log-show", 
                    //   params: { artistId: artist.identifier, eventId: event.identifier } });
                    // }}
                  >
                    <SelectShowBlock event={event} />
                  </TouchableOpacity>          
                </View>
              ))}
            </View>
          ))
        }
      </View>
    </ScrollView>

  );
}