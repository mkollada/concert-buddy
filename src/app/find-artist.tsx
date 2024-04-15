import { View } from 'react-native';
import React from 'react';
import { SearchArtistDropdown } from '../components/find-show/artists/search-artist';
import { useState, useEffect } from 'react';
import { useRouter } from "expo-router";

export default function FindArtistScreen() {  

  const router = useRouter(); // Initialize the navigation hook

  const handleArtistSelected = (
    artistId: string,
    artistName: string,
    artistImageUri: string,
    artistSpotifyUrl: string
  ) => {
    router.push({
      // pathname: '/select-show',
      pathname: '/find-venue', // will use select-show once api problem fixed
      params: {
          artistId: artistId,
          artistName: artistName,
          artistImageUri: artistImageUri ? artistImageUri : 'https://www.jambase.com/wp-content/uploads/2021/08/jambase-default-band-image-bw-1480x832.png',
          artistSpotifyUrl: artistSpotifyUrl
      }
    })
  }

  const handleCustomArtistSelected = (
    artistName: string,
  ) => {
    router.push({
      pathname: '/find-venue',
      params: {
          artistId: '',
          artistName: artistName,
          artistImageUri: 'https://www.jambase.com/wp-content/uploads/2021/08/jambase-default-band-image-bw-1480x832.png',
          artistSpotifyUrl: ''
      }
    })
  }

    return (
    <View className='flex-1 justify-center'>
      <SearchArtistDropdown 
        handleArtistSelected={handleArtistSelected}
        handleCustomArtistSelected={handleCustomArtistSelected}/>
    </View>
  );
}