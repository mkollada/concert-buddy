import { View } from '../components/Themed';
import React from 'react';
import { SearchVenueDropdown } from '../components/find-show/venues/search-venue';

export default function AddArtistScreen() {  
  return (
    <View className='flex-1 justify-center'>
      <SearchVenueDropdown />
    </View>
  );
}