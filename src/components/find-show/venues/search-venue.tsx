import React, { useState, useCallback } from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import debounce from 'lodash/debounce';
import { JamBaseVenue } from '../../../types/jambase';
import { TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { useRouter, useLocalSearchParams } from 'expo-router';
import { searchVenues } from '../../../api/jambase';
import VenueBlock from './venue-block';

interface SearchVenueDropdownProps {
  handleVenueSelected: (
    venueId: string,
    venueName: string,
    venueLoc: string
  ) => void
  handleCustomVenueSelected: (venueName: string) => void
}


export function SearchVenueDropdown({
  handleVenueSelected, handleCustomVenueSelected
}: SearchVenueDropdownProps) {
  const [venues, setVenues] = useState<JamBaseVenue[]>([])
  const [nameText, setNameText] = useState('')
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
      // console.log("User finished typing:", text);
    }, 300),
    []  // ensures that the debounce function isn't recreated on every render
  );

  const handleSubmitPress = (venue: JamBaseVenue) => {
    
    handleVenueSelected(
      venue.identifier,
      venue.name,
      venue.address.addressLocality
    )
  }

  const handleUseAsTypedPress = () => {
    handleCustomVenueSelected(nameText)
  }
  
  return (
    <KeyboardAwareScrollView 
      enableOnAndroid={true}
      extraHeight={100}
      keyboardShouldPersistTaps='handled'
      className='flex-1'>
      <View className='bg-themeGray p-3'>
        <Text className='text-sm text-white'>Find a Venue</Text>
        <TextInput className='p-2 text-2xl text-white font-bold'
        onChangeText={(text) => {
            setNameText(text)
            debouncedInputChange(text); 
          }}
        placeholder='Search here...'/>
      </View>
      <View className='p-2 items-center'>
          <TouchableOpacity onPress={handleUseAsTypedPress}>
            <Text className='underline text-white font-bold text-ul'>Use as typed</Text>
          </TouchableOpacity>
      </View>
      
      <View className='flex-1'>
       { venues.map((venue, ix) => (
         
          <View className='flex-row' key={ix}>
            <TouchableOpacity className='flex-1'
              onPress={() => handleSubmitPress(venue)}
              >
              <VenueBlock venue={venue} />
            </TouchableOpacity>          
          </View>
        
       ))}
      </View>
    </KeyboardAwareScrollView>
  );
}