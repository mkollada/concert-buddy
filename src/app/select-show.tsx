import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SelecPastShowDropdown } from '../components/find-show/shows/select-show-dropdown';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ensureString } from '../utils';

// Selects show when artist is known by api
export default function SelectShowScreen() {  

  const rawParams = useLocalSearchParams()
  const router = useRouter()

  // const artistName = params.artistName
  // const artistImageUri = params.artistImageUri
  const [showSelected, setShowSelected] = useState(false)
  const [logOwnShowSelected, setLogOwnShowSelected] = useState(false)
  const [venueName, setVenueName] = useState('')
  const [venueId, setVenueId] = useState('')
  const [venueLoc, setVenueLoc] = useState('')
  const [date, setDate] = useState('')
  const [eventId, setEventId] = useState('')

  const params = {
    artistId: ensureString(rawParams.artistId),
    artistName: ensureString(rawParams.artistName),
    artistImageUri: ensureString(rawParams.artistImageUri),
    artistSpotifyUrl: ensureString(rawParams.artistSpotifyUrl)
  }

  useEffect(() => {
    
    if(showSelected) {
      setShowSelected(false)
      router.push({
        pathname: "/log-show",
        params: {
          artistId: params.artistId,
          artistName: params.artistName,
          artistImageUri: params.artistImageUri,
          artistSpotifyUrl: params.artistSpotifyUrl,
          venueName: venueName,
          venueId: venueId,
          venueLoc: venueLoc,
          eventId: eventId,
          date: date
        }
      })
    }
    if(logOwnShowSelected) {
      setLogOwnShowSelected(false)
      router.push({
        pathname: "/find-venue",
        params: params
      })
    }
  }, [showSelected, logOwnShowSelected])

  
  return (
    <View className='flex-1 justify-center'>
      <SelecPastShowDropdown 
      artistId={params.artistId}
      artistName={params.artistName}
      setVenueName={setVenueName}
      setVenueId={setVenueId}
      setVenueLoc={setVenueLoc}
      setEventId={setEventId}
      setDate={setDate}
      setShowSelected={setShowSelected}
      setLogOwnShowSelected={setLogOwnShowSelected} />
    </View>
  );
}