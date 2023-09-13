import React, { useEffect } from 'react';

import {
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';

import { addSupabaseShow } from '../api';

import { useState } from 'react';

import { Show } from '../types/types';

import { AccordionWithBodyText, AccordionWithCalendar, AccordionWithRatings } from './AccordionItem';

import { getSupabaseSession } from '../api';
import { Session } from '@supabase/supabase-js';

export default function LogShowAccordion() {

    const [session, setSession] = useState<Session | null>(null);
    const [artistName, setArtistName] = useState('')
    const [date, setDate] = useState('')
    const [venue, setVenue] = useState('')
    // const [overallRating, setOverallRating] = useState(0)
    const [notes, setNotes] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    

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

    function submitShowLog( 
        user_id: string,
        artistName: string,
        date: string,
        venue: string,
        overallRating: number,
        notes: string,
        stagePresenceRating?: number,
        musicalityRating?: number,
        productionRating?: number,
        
    ) {
        
        const show: Show = {
            user_id: user_id,
            artistName: artistName,
            date: date,
            venue: venue,
            overallRating: overallRating,
            stagePresenceRating: stagePresenceRating,
            musicalityRating: musicalityRating,
            productionRating: productionRating,
            notes: notes
        }

        console.log(show)

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
            5,
            5,
            5,
            
        )
    }

    return (
        

        <SafeAreaView style={styles.container}>
            { isLoading ? <View><Text>Loading... </Text></View> :
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.container}>
            <AccordionWithBodyText 
                    title="Artist Name"
                    headerIcons={['chevron-down', 'chevron-up']}
                    placeholderText='Enter Artist Name...' 
                    setValue={setArtistName} />
            <AccordionWithCalendar
                title="Date"
                headerIcons={['plus-circle','close']}
                setDate={setDate} />
            <AccordionWithBodyText 
                title="Venue" 
                headerIcons={['chevron-down','chevron-up']} 
                placeholderText='Enter Venue Name...'
                setValue={setVenue} />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


