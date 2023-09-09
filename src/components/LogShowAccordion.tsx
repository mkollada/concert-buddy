import React from 'react';

import {
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
  } from 'react-native';

import { addSupabaseShow } from '../api';

import { useState } from 'react';

import { Show } from '../types/types';

import { AccordionWithBodyText, AccordionWithCalendar, AccordionWithRatings } from './AccordionItem';

export default function LogShowAccordion() {

    const [artistName, setArtistName] = useState('')
    const [date, setDate] = useState('')
    const [venue, setVenue] = useState('')
    const [overallRating, setOverallRating] = useState(0)
    const [notes, setNotes] = useState('')

    function submitShowLog( artistName: string,
        date: string,
        venue: string,
        overallRating: number,
        notes: string,
        stagePresenceRating?: number,
        musicalityRating?: number,
        productionRating?: number,
        
    ) {
        
        const show: Show = {
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
        submitShowLog(
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
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


