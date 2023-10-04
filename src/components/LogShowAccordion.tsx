import React, { useEffect } from 'react';

import {
    Button,
    SafeAreaView,
    ScrollView,
    Text,
    View,
  } from 'react-native';

import { addSupabaseShow, uploadSupabasePhotos } from '../api';

import { useState } from 'react';

import { Show } from '../types/types';

import { 
    AccordionWithBodyText, 
    AccordionWithCalendar, 
    AccordionWithRatings, 
    AccordionWithPhotos 
} from './AccordionItem';

import { getSupabaseSession } from '../api';
import { Session } from '@supabase/supabase-js';
import { useNavigation } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';


export default function LogShowAccordion() {

    const [session, setSession] = useState<Session | null>(null);
    const [artistName, setArtistName] = useState('')
    const [date, setDate] = useState('')
    const [venue, setVenue] = useState('')
    const [photos, setPhotos] = useState<ImagePicker.ImagePickerAsset[]>([])
    // const [overallRating, setOverallRating] = useState(0)
    const [notes, setNotes] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation()
    

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
        stagePresenceRating?: number,
        musicalityRating?: number,
        productionRating?: number
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
            photoUrls: photoUrls
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
            venue,
            5,
            notes,
            photos,
            5,
            5,
            5,
            
        )

        navigation.goBack()
    }

    return (
        

        <SafeAreaView className='flex-1'>
            { isLoading ? <View><Text>Loading... </Text></View> :
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            className='flex-1'>
            <AccordionWithBodyText 
                    title="Artist Name"
                    headerIcons={['chevron-down', 'chevron-up']}
                    placeholderText='Enter Artist Name...' 
                    setValue={setArtistName} />
            <AccordionWithCalendar
                title="Date"
                headerIcons={['plus-circle','close']}
                setDate={setDate} 
                date={date} />
            <AccordionWithBodyText 
                title="Venue" 
                headerIcons={['chevron-down','chevron-up']} 
                placeholderText='Enter Venue Name...'
                setValue={setVenue} />
            <AccordionWithPhotos
                title="Photos"
                headerIcons={['chevron-down','chevron-up']}
                setPhotos={setPhotos} 
            />
            <AccordionWithRatings
                title="Show Rating" 
                headerIcons={['chevron-down','chevron-up']} />
            {/* <AccordionWithBodyText 
                title="Photos" 
                headerIcons={['chevron-down','chevron-up']} 
                placeholderText='Select Photos'/>
            <AccordionWithBodyText 
                title="Memories" 
                headerIcons={['chevron-down','chevron-up']} 
                placeholderText='What mems did you have?'/> */}
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

