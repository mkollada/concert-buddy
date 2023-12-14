import { View } from '../components/Themed';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import LogShowAccordionPreSelect from '../components/LogShowAccordionPreSelect';

export default function LogShowScreen() { 
  const rawParams = useLocalSearchParams();

  // Utility function to ensure each parameter is a string
  const ensureString = (param: string | string[]) => {
    if (Array.isArray(param)) {
      // If it's an array, take the first element, or join them, based on your needs
      return param.join(', ')
    }
    return param || ''; // Fallback to an empty string if param is undefined
  };

  // Ensuring all parameters are treated as strings
  const params = {
    artistId: ensureString(rawParams.artistId),
    artistImageUri: ensureString(rawParams.artistImageUri),
    artistName: ensureString(rawParams.artistName),
    venueId: ensureString(rawParams.venueId),
    venueName: ensureString(rawParams.venueName),
    venueLoc: ensureString(rawParams.venueLoc),
    eventId: ensureString(rawParams.eventId),
    date: ensureString(rawParams.date)
  };

  console.log(params);

  return (
    <View className='flex-1 justify-center'>
      <LogShowAccordionPreSelect 
        artistId={params.artistId} 
        artistImageUri={params.artistImageUri}
        artistName={params.artistName}
        venueId={params.venueId}
        venueName={params.venueName}
        venueLoc={params.venueLoc}
        date={params.date}
      />
    </View>
  );
}
