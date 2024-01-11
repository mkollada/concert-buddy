import { View } from '../../components/Themed';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ensureString } from '../../utils';
import EditNotes from '../../components/show-details/notes/edit-notes';


function EditNotesPage() { 
  const rawParams = useLocalSearchParams()

  const params = {
    initialNotes: ensureString(rawParams.initialNotes),
    showId: ensureString(rawParams.showId),
  };

//   router.back(params:{'1':'1'})
  return (
    <View className='flex-1 justify-center'>
        <EditNotes initialNotes={params.initialNotes} showId={params.showId}/>
    </View>
  );
}

export default EditNotesPage;