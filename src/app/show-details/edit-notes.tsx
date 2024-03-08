import { View } from 'react-native';
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

  return (
    <View className='flex-1 justify-center'>
        <EditNotes initialNotes={params.initialNotes} showId={params.showId}/>
    </View>
  );
}

export default EditNotesPage;