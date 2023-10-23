import React, { useState } from 'react';
import { View } from '../../components/Themed';
import { searchArtistName } from '../../api/jambase';
import SearchArtistDropdown from '../../components/find-show/artists/search-artist-dropdown';
import { JamBaseArtist } from '../../types/jambase';
import ArtistBlock from '../../components/find-show/artists/artist-block';

export default function FeedScreen() {
  const [selectedArtist, setSelectedArtist] = useState<JamBaseArtist>()
  function handleSelectingArtist(artist: JamBaseArtist) {
    setSelectedArtist(artist)
    console.log('Selected:', artist.name)
  }
  return ( 
     <SearchArtistDropdown query_func={searchArtistName} selectArtist={handleSelectingArtist}/>
  )
}



