import React, { useState, useCallback } from 'react';
import { Text, View } from '../../../components/Themed';
import { TextInput } from 'react-native-gesture-handler';
import debounce from 'lodash/debounce';
import { JamBaseArtist } from '../../../types/jambase';
import {  ScrollView, TouchableOpacity } from 'react-native';
import ArtistBlock from './artist-block';
import { searchArtistName } from '../../../api/jambase';

interface SearchArtistDropdownProps {
  setArtistName: (value: string) => void
  setArtistId: (value: string) => void
  setArtistImageUri: (value: string) => void
}


export function SearchArtistDropdown({
  setArtistName, setArtistId, setArtistImageUri
}: SearchArtistDropdownProps) {
  const [artists, setArtists] = useState<JamBaseArtist[]>([])

  const debouncedInputChange = useCallback(
    debounce((text: string) => {
      // Handle the text input change after the user has stopped typing for 300ms
      async function fetchApiData() {
        if(text.length>0) {
          const response = await searchArtistName(text);
          if (response) {
            setArtists(response.artists);
            console.log(artists[0])
          }
        }
      }

      fetchApiData();
      console.log("User finished typing:", text);
    }, 300),
    []  // ensures that the debounce function isn't recreated on every render
  );

  const handleSubmitPress = (artist: JamBaseArtist) => {
    setArtistImageUri(artist.image)
    setArtistId(artist.identifier)
    setArtistName(artist.name)
  }
  
  return (
    <ScrollView className='flex-1'>
      <View className='bg-themeGray p-3'>
        <Text className='text-sm text-white'>Find an Artist</Text>
        <TextInput className='p-2 text-2xl text-white font-bold'
        onChangeText={(text) => {
            debouncedInputChange(text);
          }}
        placeholder='Search here...'/>
      </View>
      
      <View className='flex-1'>
       { artists.map((artist, ix) => (
         
          <View className='flex-row p-5' key={ix}>
            <TouchableOpacity className='flex-1'
              // onPress={() => {
                // router.push({ pathname: "/find-venue", 
                // params: { 
                //   artistId: artist.identifier,
                //   artistName: artist.name,
                //   artistImageUri: artist.image } });
              // }}
              onPress={() => handleSubmitPress(artist)}
              >
              <ArtistBlock artist={artist} />
            </TouchableOpacity>          
          </View>
        
       ))}
      </View>
    </ScrollView>
  );
}