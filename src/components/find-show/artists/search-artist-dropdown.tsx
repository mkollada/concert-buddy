import React, { useState, useCallback } from 'react';
import { View } from '../../../components/Themed';
import { TextInput } from 'react-native-gesture-handler';
import debounce from 'lodash/debounce';
import { JamBaseApiResponse, JamBaseArtist } from '../../../types/jambase';
// import { Image } from 'react-native-elements';
import {  ScrollView, TouchableOpacity } from 'react-native';
import ArtistBlock from './artist-block';

interface SearchArtistDropdownProps {
    query_func: (query: string) => Promise<JamBaseApiResponse>
    selectArtist: (artist: JamBaseArtist) => void
}

export default function SearchArtistDropdown({ query_func, selectArtist }: SearchArtistDropdownProps) {
  const [artists, setArtists] = useState<JamBaseArtist[]>([])

  const debouncedInputChange = useCallback(
    debounce((text: string) => {
      // Handle the text input change after the user has stopped typing for 300ms
      async function fetchApiData() {
        if(text.length>0) {
          const response = await query_func(text);
          if (response) {
            setArtists(response.artists);
          }
        }
      }

      fetchApiData();
      console.log("User finished typing:", text);
    }, 300),
    []  // ensures that the debounce function isn't recreated on every render
  );
  
  return (
    <ScrollView className='flex-1'>
      <TextInput className='bg-white text-4xl font-bold'
      onChangeText={(text) => {
          debouncedInputChange(text);
        }}
      placeholder='HELLO'/>
      <View className='flex-column'>
       { artists.map((artist, ix) => (
        <View className='p-5' key={ix}>
          <TouchableOpacity onPress={() => selectArtist(artist)}>
            <ArtistBlock artist={artist} />
          </TouchableOpacity>          
        </View>
       ))}
      </View>
    </ScrollView>
  );
}

