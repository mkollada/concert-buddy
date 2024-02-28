import React, { useState, useEffect } from 'react';
import { Text, View } from '../../react-native';
import { JamBaseEvent } from '../../../types/jambase';
import {  ScrollView, TouchableOpacity } from 'react-native';
import SelectShowBlock from './select-show-block';
// import { searchArtistName } from '../../../api/jambase';
import { getPastEventsForArtist } from '../../../api/jambase';

interface SelectPastShowDropdownProps {
  artistId: string
  artistName: string
  setVenueName: (value: string) => void
  setVenueId: (value: string) => void
  setVenueLoc: (value: string) => void
  setEventId: (value: string) => void
  setDate: (value: string) => void
  setShowSelected: (value: boolean) => void
  setLogOwnShowSelected: (value: boolean) => void
}
export function SelecPastShowDropdown({ 
  artistId,
  artistName,
  setVenueName,
  setVenueId,
  setVenueLoc,
  setEventId,
  setDate,
  setShowSelected,
  setLogOwnShowSelected
}: SelectPastShowDropdownProps) {
  const [events, setEvents] = useState<{ [year: string]: JamBaseEvent[]; }>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {

    async function fetchApiData() {
      setIsLoading(true)
      if (artistId) {
        const response = await getPastEventsForArtist(artistId);
        if (response) {
          setEvents(response.artist['x-pastEvents'])
          setIsLoading(false)
        }
      }
    }

    fetchApiData();

  }, [])
  
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      
      <View className='flex-1 pt-3'>
        <View className='items-center'>
          <Text className='font-bond text-lg'>{artistName}</Text>
        </View>

        {isLoading ? (
        // If isLoading is true, render the Loading text
        <View className='flex-1 items-center justify-center'>
          <Text className='font-bold text-md'>Loading...</Text>
        </View>
      ) : (
        <View className='flex-1 pt-3'>
          {(Object.keys(events).length === 0 && !isLoading) ? (
            // Render a different component when events is empty
            <View className='flex-1 items-center justify-center'>
              <Text className='font-bold text-md'>We don&apos;t have any shows for that Artist</Text>
              <TouchableOpacity className='p-2' onPress={() => {
                setLogOwnShowSelected(true)
              }}>
                <Text className='underline font-bold text-themePurple'>Want to log your own?</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
            <View className='flex-1 items-center justify-center'>
              <TouchableOpacity className='p-2' onPress={() => {
                setLogOwnShowSelected(true)
              }}>
                <Text className='underline font-bold text-themePurple'>Don&apos;t see your show here?</Text>
              </TouchableOpacity>
            </View>
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
              ))}
              </>
          )}
        </View>
    )}

      </View>
    </ScrollView>
)
}