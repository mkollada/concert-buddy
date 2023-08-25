import React, { useState } from 'react';

import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
  } from 'react-native';

import { AccordionWithBodyText, AccordionWithCalendar, AccordionWithRatings } from './AccordionItem';

export default function LogShowAccordion() {
    return (
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.container}>
            <AccordionWithBodyText 
                title="Artist Name" 
                headerIcons={['chevron-down','chevron-up']} 
                placeholderText='Enter Artist Name...'/>
            <AccordionWithCalendar
                title="Date"
                headerIcons={['plus-circle','close']} />
            <AccordionWithBodyText 
                title="Venue" 
                headerIcons={['chevron-down','chevron-up']} 
                placeholderText='Enter Venue Name...'/>
            <AccordionWithRatings
                title="Show Rating" 
                headerIcons={['chevron-down','chevron-up']} />
            <AccordionWithBodyText 
                title="Photos" 
                headerIcons={['chevron-down','chevron-up']} 
                placeholderText='Select Photos'/>
            <AccordionWithBodyText 
                title="Memories" 
                headerIcons={['chevron-down','chevron-up']} 
                placeholderText='What mems did you have?'/>
            <AccordionWithBodyText 
                title="Notes" 
                headerIcons={['chevron-down','chevron-up']} 
                placeholderText='Enter other thoughts from the show...'/>
          </ScrollView>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


