import React, { useState, useCallback } from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import debounce from 'lodash/debounce';
import { JamBaseArtist } from '../../../types/jambase';
import {  TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ArtistBlock from './artist-block';
import { searchArtistName } from '../../../api/jambase';

interface SearchArtistDropdownProps {
  handleArtistSelected: (
    artistId: string,
    artistName: string,
    artistImageUri: string,
    artistSpotifyUrl: string
  ) => void
  handleCustomArtistSelected: (artistName: string) => void
}


export function SearchArtistDropdown({
  handleArtistSelected, handleCustomArtistSelected
}: SearchArtistDropdownProps) {
  const [artists, setArtists] = useState<JamBaseArtist[]>([])
  const [nameText, setNameText] = useState('')

  // COMMENTING OUT FOR NOW WHILE JAMBASE API KEY IS SORTED
  // const debouncedInputChange = useCallback(
  //   debounce((text: string) => {
  //     // Handle the text input change after the user has stopped typing for 300ms
  //     async function fetchApiData() {
  //       if(text.length>0) {
  //         const response = await searchArtistName(text);
  //         if (response) {
  //           setArtists(response.artists);
  //         }
  //       }
  //     }

  //     fetchApiData();
  //     // console.log("User finished typing:", text);
  //   }, 300),
  //   []  // ensures that the debounce function isn't recreated on every render
  // );

  const getArtistSpotifyUrl = (artist: JamBaseArtist) => {

    const identifiers = artist['sameAs'];

    // Find the object where source is 'spotify'
    const spotifyObj = identifiers.find(identifier => identifier.identifier === 'spotify');

    let url = ''

    // Set the identifier if found, otherwise set empty string
    spotifyObj ? (url = spotifyObj.url) : (url = '')

    return url
  }

  const handleSubmitPress = (artist: JamBaseArtist) => {
    handleArtistSelected(
      artist.identifier,
      artist.name,
      getArtistSpotifyUrl(artist),
      artist.image)
  }

  const handleUseAsTypedPress = () => {
    handleCustomArtistSelected(nameText)
  }
  
  return (
    <KeyboardAwareScrollView 
      enableOnAndroid={true}
      extraHeight={100}
      keyboardShouldPersistTaps='handled' 
      className='flex-1'>
      <View className='bg-themeGray p-4'>
        <Text className='text-sm text-white'>Find an Artist</Text>
        <TextInput className='p-2 text-2xl text-white font-bold'
        onChangeText={(text) => {
            setNameText(text)
            // COMMENTING OUT FOR NOW WHILE JAMBASE API KEY IS SORTED
            // debouncedInputChange(text);
          }}
        placeholder='Search here...'/>
        
      </View>
      <View className='p-2 items-center'>
          <TouchableOpacity onPress={handleUseAsTypedPress}>
            <Text className='underline text-themePurple font-bold text-2xl text-ul'>Save</Text>
          </TouchableOpacity>
      </View>
      
      <View className='flex-1'>
       { artists.map((artist, ix) => (
         
          <View className='flex-row p-4' key={ix}>
            <TouchableOpacity className='flex-1'
              onPress={() => handleSubmitPress(artist)}
              >
              <ArtistBlock artist={artist} />
            </TouchableOpacity>          
          </View>
        
       ))}
      </View>
    </KeyboardAwareScrollView>
  );
}