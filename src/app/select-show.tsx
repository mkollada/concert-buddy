import { View } from '../components/Themed';
import React from 'react';
import { SelecPastShowDropdown } from '../components/find-show/shows/select-show-dropdown';
import { useLocalSearchParams } from 'expo-router';

// Selects show when artist is known by api
export default function FindVenueScreen() {  

  // const router = useRouter(); // Initialize the navigation hook
  const params = useLocalSearchParams()

  let artistId = params.artistId
  if (Array.isArray(artistId)) {
    console.warn('Warning: artistId is an array. Using the first element.');
    artistId = artistId[0];
  }
  // const [venueName, setVenueName] = useState('')
  // const [venueId, setVenueId] = useState('')
  // const [venueLoc, setVenueLoc] = useState('')

  return (
    <View className='flex-1 justify-center'>
      <SelecPastShowDropdown artistId={artistId}/>
    </View>
  );
}