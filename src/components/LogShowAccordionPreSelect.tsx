import React, { useEffect } from 'react';

import {
    Button,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    Image
  } from 'react-native';

import { addSupabaseShow, uploadSupabasePhotos } from '../api';

import { useState } from 'react';

import { Show } from '../types/types';

import { 
    AccordionWithBodyText, 
    AccordionWithRatings, 
    AccordionWithPhotos,
    AccordionHeaderNoComponent
} from './AccordionItem';

import { getSupabaseSession } from '../api';
import { Session } from '@supabase/supabase-js';

import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

interface LogShowAccordionPreSelectProps {
    artistId: string
    artistName: string
    artistImageUri: string
    venueId: string
    venueName: string
    venueLoc: string
    date: string
}

export default function LogShowAccordionPreSelect({ 
    artistId, 
    artistImageUri, 
    artistName, 
    venueId,
    venueName,
    venueLoc,
    date
}: LogShowAccordionPreSelectProps) {

    // console.log(artistImageUri)
    const router = useRouter(); // Initialize the navigation hook


    const [session, setSession] = useState<Session | null>(null);
    // const [artistName, setArtistName] = useState('')
    // const [date, setDate] = useState('')
    // const [venue, setVenue] = useState('')
    const [photos, setPhotos] = useState<ImagePicker.ImagePickerAsset[]>([])
    const [overallRating, setOverallRating] = useState(0)
    const [notes, setNotes] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    // const navigation = useNavigation()
    const [musicalityRating, setMusicalityRating] = useState(0)
    const [productionRating, setProductionRating] = useState(0)
    const [stagePresenceRating, setStagePresenceRating] = useState(0)
    

    const {data, error} = getSupabaseSession()

    if (error) {
        // handle error here
        return <View><Text>Error loading session</Text></View>;
    }

    useEffect(() => { 
        if (!data?.session) {
          setIsLoading(true);
        } else {
          setSession(data.session);
          setIsLoading(false);
        }
      }, [data, error]);

    async function submitShowLog( 
        userId: string,
        artistName: string,
        date: string,
        venue: string,
        overallRating: number,
        notes: string,
        photos: ImagePicker.ImagePickerAsset[],
        artistId: string,
        artistImageUri: string,
        venueId: string,
        venueLoc: string,
        stagePresenceRating?: number,
        musicalityRating?: number,
        productionRating?: number,
    ) {

        const photoUrls = await uploadSupabasePhotos(photos)
        
        const show: Show = {
            userId: userId,
            artistName: artistName,
            date: date,
            venue: venue,
            overallRating: overallRating,
            stagePresenceRating: stagePresenceRating,
            musicalityRating: musicalityRating,
            productionRating: productionRating,
            notes: notes,
            photoUrls: photoUrls,
            venueId: venueId,
            venueLoc: venueLoc,
            artistId: artistId,
            artistImageUri: artistImageUri
        }

        addSupabaseShow(show)
    }

    function handleSubmitPress() {
        if (!session) {
            setIsLoading(true)
            return
        }

        
        submitShowLog(
            session.user.id,
            artistName,
            date,
            venueName,
            overallRating,
            notes,
            photos,
            artistId,
            artistImageUri,
            venueId,
            venueLoc,
            stagePresenceRating,
            musicalityRating,
            productionRating,
            
        )

        router.push({ pathname: "/"})
    }

    return (
        

        <SafeAreaView className='flex-1'>
            { isLoading ? <View><Text>Loading... </Text></View> :
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            className='flex-1 p-3'>
            <View className='h-[20vh] p-3 pr-10 pl-10 rounded-xl'>
                <Image className="h-full w-full rounded-xl" source={{ uri: artistImageUri }} />
            </View>
            <AccordionHeaderNoComponent
                    title="Artist Name"
                    subtitle={artistName} />
            <AccordionHeaderNoComponent
                    title="Venue Name"
                    subtitle={venueName} />
            <AccordionHeaderNoComponent
                    title="Date"
                    subtitle={date} />
            <AccordionWithPhotos
                title="Photos"
                headerIcons={['chevron-down','chevron-up']}
                setPhotos={setPhotos} 
            />
            <AccordionWithRatings
                title="Show Rating" 
                headerIcons={['chevron-down','chevron-up']} 
                setOverallRating={setOverallRating}
                setMusicalityRating={setMusicalityRating}
                setStagePresenceRating={setStagePresenceRating}
                setProductionRating={setProductionRating}/>
            <AccordionWithBodyText 
                title="Notes" 
                headerIcons={['chevron-down','chevron-up']} 
                placeholderText='Enter other thoughts from the show...'
                setValue={setNotes} />
            <Button title='Save' onPress={handleSubmitPress} />

          </ScrollView>
        }
        </SafeAreaView> 
      );
}

