import { View } from 'react-native';
import React from 'react';
import { SearchVenueDropdown } from '../components/find-show/venues/search-venue';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from "expo-router";

export default function FindVenueScreen() {  

  const router = useRouter(); // Initialize the navigation hook
  const params = useLocalSearchParams()
  const [venueName, setVenueName] = useState('')
  const [venueId, setVenueId] = useState('')
  const [venueLoc, setVenueLoc] = useState('')
  const [venueSelected, setVenueSelected] = useState(false)

  useEffect(() => { 

    if(venueSelected) {
      setVenueSelected(false)
      router.push({
          pathname: '/select-date',
          params: {
            artistId: params.artistId,
            artistName: params.artistName,
            artistImageUri: params.artistImageUri,
            artistSpotifyUrl: params.artistSpotifyUrl,
            venueName: venueName,
            venueId: venueId,
            venueLoc: venueLoc,
          }
      })
    }
  }, [venueSelected]);

  return (
    <View className='flex-1 justify-center'>
      <SearchVenueDropdown 
        setVenueId={setVenueId} 
        setVenueName={setVenueName} 
        setVenueLoc={setVenueLoc}
        setVenueSelected={setVenueSelected} />
    </View>
  );
}