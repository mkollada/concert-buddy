import { View } from '../components/Themed';
import React from 'react';
import { SearchArtistDropdown } from '../components/find-show/artists/search-artist';
import { useState, useEffect } from 'react';
import { useRouter } from "expo-router";

export default function FindArtistScreen() {  

  const router = useRouter(); // Initialize the navigation hook
  const [artistName, setArtistName] = useState('')
  const [artistId, setArtistId] = useState('')
  const [artistImageUri, setArtistImageUri] = useState('')
  const [artistSelected, setArtistSelected] = useState(false)

  useEffect(() => { 
    if(artistSelected) {
      setArtistSelected(false)
      router.push({
          pathname: '/select-show',
          params: {
              artistId: artistId,
              artistName: artistName,
              artistImageUri: artistImageUri,
          }
      })
    } 
  }, [artistSelected]);

    return (
    <View className='flex-1 justify-center'>
      <SearchArtistDropdown 
        setArtistName={setArtistName} 
        setArtistId={setArtistId} 
        setArtistImageUri={setArtistImageUri}
        setArtistSelected={setArtistSelected}/>
    </View>
  );
}