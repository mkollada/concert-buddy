import { View } from '../../components/Themed';
import ShowDetails from '../../components/show-details/ShowDetails';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

type DetailsRouteParams = {
  id: string;
}

const Details = () => {  
  const showId = useLocalSearchParams<DetailsRouteParams>().id  
  return (
    <View className='flex-1 justify-center p-3'>
      <ShowDetails showId={showId}/>
    </View>
  );
}

export default Details;