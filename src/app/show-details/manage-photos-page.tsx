import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ensureString } from '../../utils';
import ManagePhotos from '../../components/show-details/photos/manage-photos';
import { getSupabaseShow } from '../../api';
import { Show } from '../../types/types';

function ManagePhotosPage() {
  const rawParams = useLocalSearchParams();
  const params = {
    showId: ensureString(rawParams.showId),
  };

  const [show, setShow] = useState<Show|null>();
  const [isLoading, setIsLoading] = useState(true);

  console.log('thispage')

  useEffect(() => {
    async function fetchShow() {
      try {
        const fetchedShow = await getSupabaseShow(params.showId);
        if(fetchedShow){
          setShow(fetchedShow)
          setIsLoading(false);
        }
        
      } catch (error) {
        console.error("Failed to fetch show:", error);
        // Handle the error appropriately
      }
    }

    fetchShow()
    console.log(isLoading)
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  console.log('here')

  return (
    <View className='flex-1 justify-center'>

      {show ? (
        <ManagePhotos show={show} />
      ) : (
        <Text className='text-white'>Show not found :/</Text>
      )
      }
    </View>
  );
}

export default ManagePhotosPage;
