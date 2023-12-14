import React, { useState, useEffect } from 'react';
import { Text, View } from '../../../components/Themed';
import { JamBaseEvent } from '../../../types/jambase';
import {  ScrollView, TouchableOpacity } from 'react-native';
import SelectShowBlock from './select-show-block';
// import { searchArtistName } from '../../../api/jambase';
import { getPastEventsForArtist } from '../../../api/jambase';

interface SelectPastShowDropdownProps {
  artistId: string
  setVenueName: (value: string) => void
  setVenueId: (value: string) => void
  setVenueLoc: (value: string) => void
  setEventId: (value: string) => void
  setDate: (value: string) => void
  setShowSelected: (value: boolean) => void
}
export function SelecPastShowDropdown({ 
  artistId, 
  setVenueName,
  setVenueId,
  setVenueLoc,
  setEventId,
  setDate,
  setShowSelected
}: SelectPastShowDropdownProps) {
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
            <View key={year} className='p-4'>
              <Text className='text-xl font-bold'>{year}</Text>
              {events[year].map((event, ix) => (
                <View className='flex-row px-5 py-2' key={ix}>
                  <TouchableOpacity className='flex-1'
                    onPress={() => {
                      setVenueId(event.location.identifier)
                      setVenueName(event.location.name)
                      setVenueLoc(event.location.address.addressLocality)
                      setEventId(event.identifier)
                      setDate(event.startDate.substring(0,10))
                      setShowSelected(true)
                    }}
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