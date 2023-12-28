import React, { useState, useCallback } from 'react';
import { Text, View } from '../../../components/Themed';
import { TextInput } from 'react-native-gesture-handler';
import debounce from 'lodash/debounce';
import { JamBaseVenue } from '../../../types/jambase';
import {  ScrollView, TouchableOpacity } from 'react-native';
// import { useRouter, useLocalSearchParams } from 'expo-router';
import { searchVenues } from '../../../api/jambase';
import VenueBlock from './venue-block';

interface SearchVenueDropdownProps {
  setVenueName: (value: string) => void
  setVenueId: (value: string) => void
  setVenueLoc: (value: string) => void
  setVenueSelected: (value: boolean) => void
}


export function SearchVenueDropdown({
  setVenueName, setVenueId, setVenueLoc, setVenueSelected
}: SearchVenueDropdownProps) {
  const [venues, setVenues] = useState<JamBaseVenue[]>([])
  // const router = useRouter(); // Initialize the navigation hook
  // const params = useLocalSearchParams()


  const debouncedInputChange = useCallback(
    debounce((text: string) => {
      // Handle the text input change after the user has stopped typing for 300ms
      async function fetchApiData() {
        if(text.length>0) {
          const response = await searchVenues(text);
          if (response) {
            setVenues(response.venues);
          }
        }
      }

      fetchApiData();
      console.log("User finished typing:", text);
    }, 300),
    []  // ensures that the debounce function isn't recreated on every render
  );

  const handleSubmitPress = (venue: JamBaseVenue) => {
    setVenueLoc(venue.address.addressLocality)
    setVenueId(venue.identifier)
    setVenueName(venue.name)
    setVenueSelected(true)
  }
  
  return (
    <ScrollView keyboardShouldPersistTaps='handled' className='flex-1'>
      <View className='bg-themeGray p-3'>
        <Text className='text-sm text-white'>Find a Venue</Text>
        <TextInput className='p-2 text-2xl text-white font-bold'
        onChangeText={(text) => {
            debouncedInputChange(text);
          }}
        placeholder='Search here...'/>
      </View>
      
      <View className='flex-1'>
       { venues.map((venue, ix) => (
         
          <View className='flex-row' key={ix}>
            <TouchableOpacity className='flex-1'
              // onPress={() => {
              //   router.push({ pathname: "/select-date", 
              //   params: { 
              //     artistId: params.artistId,
              //     artistName: params.artistName,
              //     artistImageUri: params.artistImageUri,
              //     venueId: venue.identifier,
              //     venueName: venue.name,
              //     venueLoc: venue.address.addressLocality
              //   } });
              // }}
              onPress={() => handleSubmitPress(venue)}
              >
              <VenueBlock venue={venue} />
            </TouchableOpacity>          
          </View>
        
       ))}
      </View>
    </ScrollView>
  );
}