import { View } from '../components/Themed';
import React from 'react';
import { SearchVenueDropdown } from '../components/find-show/venues/search-venue';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from "expo-router";
import { SelecPastShowDropdown } from '../components/find-show/shows/select-show-dropdown';

export default function FindVenueScreen() {  

  const router = useRouter(); // Initialize the navigation hook
  const params = useLocalSearchParams()
  const [venueName, setVenueName] = useState('')
  const [venueId, setVenueId] = useState('')
  const [venueLoc, setVenueLoc] = useState('')

  useEffect(() => { 
    console.log(venueId)
    console.log(venueName)
    console.log(venueLoc)

    if((venueName != '') && (venueId != '') && (venueLoc != '')) {
        router.push({
            pathname: '/select-date',
            params: {
              artistId: params.artistId,
              artistName: params.artistName,
              artistImageUri: params.artistImageUri,
              venueName: venueName,
              venueId: venueId,
              venueLoc: venueLoc,
            }
        })
    }
  }, [venueName, venueId, venueLoc]);

  return (
    <View className='flex-1 justify-center'>
      <SearchVenueDropdown 
        setVenueId={setVenueId} 
        setVenueName={setVenueName} 
        setVenueLoc={setVenueLoc} />
    </View>
  );
}