import { View } from '../components/Themed';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import LogShowAccordionPreSelect from '../components/LogShowAccordionPreSelect';
import { ensureString } from '../utils';

export default function LogShowScreen() { 
  const rawParams = useLocalSearchParams();

  console.log(rawParams.artistSpotifyUrl)


  // Ensuring all parameters are treated as strings
  const params = {
    artistId: ensureString(rawParams.artistId),
    artistImageUri: ensureString(rawParams.artistImageUri),
    artistName: ensureString(rawParams.artistName),
    artistSpotifyUrl: ensureString(rawParams.artistSpotifyUrl),
    venueId: ensureString(rawParams.venueId),
    venueName: ensureString(rawParams.venueName),
    venueLoc: ensureString(rawParams.venueLoc),
    eventId: ensureString(rawParams.eventId),
    date: ensureString(rawParams.date)
  };

  return (
    <View className='flex-1 justify-center'>
      <LogShowAccordionPreSelect 
        artistId={params.artistId} 
        artistImageUri={params.artistImageUri}
        artistName={params.artistName}
        artistSpotifyUrl={params.artistSpotifyUrl}
        venueId={params.venueId}
        venueName={params.venueName}
        venueLoc={params.venueLoc}
        eventId={params.eventId}
        date={params.date}
      />
    </View>
  );
}
