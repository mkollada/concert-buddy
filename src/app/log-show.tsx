import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AddShowDetails from '../components/show-logging/add-show-details';
import { ensureString } from '../utils';
import uuid from 'react-native-uuid';
import { Show } from '../types/types';
import { addSupabaseShow, getSupabaseSession, uploadSupabasePhotos } from '../api';
import { Session } from '@supabase/supabase-js';
import { Alert } from 'react-native';


export default function LogShowScreen() { 
  
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null);
  const [sessErr, setSessErr] = useState(false)
  const [show, setShow] = useState<Show|null>(null)
  const [submitReady, setSubmitReady] = useState(false)
  const [unsavedChanges, setUnsavedChanges] = useState(true)

  const router = useRouter()

  const rawParams = useLocalSearchParams();


  const {data, error} = getSupabaseSession()
  useEffect(() => { 
    
    if(error){
      setSessErr(true)
    } else if (data?.session) {
        setSession(data.session)
        setIsLoading(false)
        createNewShow(data.session)
    }
  }, [data, error]);

  const handleShowSubmit = async (submitShow: Show) => {
    setUnsavedChanges(false)
    const createdAt = Date().toString()
    const newPhotoUrls = await uploadSupabasePhotos(submitShow.photoUrls)

    const newSubmitShow = {
      ...submitShow,
      createdAt: createdAt,
      photoUrls: newPhotoUrls
    }

    try {
      await addSupabaseShow(newSubmitShow)
    } catch (error) {
      Alert.alert('Error uploading show')
      console.error('error uploading to supabase')
    }
    console.log(0)

    router.navigate({pathname:'/'})
    console.log(1)

  }

  const createNewShow = (session: Session) => {

    // Ensuring all parameters are treated as strings
    const params = {
      artistId: ensureString(rawParams.artistId),
      artistImageUri: ensureString(rawParams.artistImageUri),
      artistName: ensureString(rawParams.artistName),
      artistSpotifyUrl: ensureString(rawParams.artistSpotifyUrl),
      venueId: ensureString(rawParams.venueId),
      venueName: ensureString(rawParams.venueName),
      venueLoc: ensureString(rawParams.venueLoc),
      eventId: ensureString(rawParams.eventId),
      date: ensureString(rawParams.date),
    };

    

    const newUuid = uuid.v4().toString();

    const initialMemories = {
      "Tonight I met the band and...": {
        color: "#928CD7", response: ""
      },
      "Before the show I...": {
        color: "#EA7876", response: ""
      },
      "The best moment of the show was...":{
        color: "#48769E", response: ""
      },
      "After the show I...":{
        color: "#6AB99B", response: ""
      }
    };

    const newShow: Show = {
      id: newUuid,
      createdAt: new Date().toISOString(),
      userId: session.user.id, // Ensure session is loaded and user id is available
      artistName: params.artistName,
      date: params.date,
      venue: params.venueName,
      overallRating: 2,
      stagePresenceRating: 2,
      musicalityRating: 3,
      productionRating: 3,
      notes: '',
      photoUrls: [],
      venueId: params.venueId,
      venueLoc: params.venueLoc,
      artistId: params.artistId,
      artistImageUri: params.artistImageUri,
      eventId: params.eventId,
      memories: initialMemories,
      venueRating: 2,
      setlist: [],
      supportingActs: []
    };

    setShow(newShow);
  };

  if (isLoading || !show) { // Checks if still loading or show is null
    return 
  }

  if (sessErr) {
    return <View><Text>Error loading session</Text></View>
  }

  return (
    <View className='flex-1 justify-center'>
      <AddShowDetails 
        title='Log Show'
        show={show}
        setShow={setShow}
        edit={false}
        submitReady={submitReady}
        setSubmitReady={setSubmitReady}
        handleEditCancel={router.back}
        unsavedChanges={unsavedChanges}
        setUnsavedChanges={setUnsavedChanges}
        handleShowSubmit={handleShowSubmit}
      /> 
    </View>
  );
}
