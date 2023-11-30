import { View } from '../components/Themed';
import React from 'react';
import { SearchVenueDropdown } from '../components/find-show/venues/search-venue';

// Selects show when artist is known by api
export default function FindVenueScreen() {  
  return (
    <View className='flex-1 justify-center'>
      <SearchVenueDropdown />
    </View>
  );
}