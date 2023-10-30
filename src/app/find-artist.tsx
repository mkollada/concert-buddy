import { View } from '../components/Themed';
import React from 'react';
import { SearchArtistDropdown } from '../components/find-show/artists/search-artist';



export default function FindArtistScreen() {  
    return (
    <View className='flex-1 justify-center'>
      <SearchArtistDropdown />
    </View>
  );
}