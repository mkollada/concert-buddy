import React, { useEffect } from 'react';

import {
    Button,
    SafeAreaView,
    Text,
    View,
    Image,
    Modal,
    
  } from 'react-native';

import { addSupabaseShow, updateSupabaseRow, updateSupabaseShow, uploadSupabasePhotos } from '../../api';

import { useState } from 'react';
import uuid from 'react-native-uuid';

import { Memories, Show } from '../../types/types';

import { 
    AccordionHeaderNoComponent,
    AccordionEmojiRating,
    EditItem,
} from './AccordionItem';

import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ManagePhotos from '../show-details/photos/manage-photos';
import EditNotes from '../show-details/notes/edit-notes';

interface LogShowAccordionPreSelectProps {
    show: Show
    setShow: (value: Show) => void
    edit: boolean
    setSubmitReady: (value: boolean) => void
}

export default function LogShowAccordionPreSelect({ 
    show, setShow, edit, setSubmitReady
}: LogShowAccordionPreSelectProps) {

    // console.log(artistImageUri)
    const router = useRouter(); // Initialize the navigation hook

    // Setting initial memories
    const memories = {
        'Tonight I met the band and...':'',
        'My favorite part of the show was...':'',
        'I\'ll never forget...':''
    }

    const [isLoading, setIsLoading] = useState(false)
    const [photoModalVisible, setPhotoModalVisible] = useState(false)
    const [notesModalVisible, setNotesModalVisible] = useState(false)


    const [photoUrls, setPhotoUrls] = useState(show.photoUrls)
    const [overallRating, setOverallRating] = useState(show.overallRating)
    const [venueRating, setVenueRating] = useState(show.venueRating)
    const [musicalityRating, setMusicalityRating] = useState(show.musicalityRating)
    const [productionRating, setProductionRating] = useState(show.stagePresenceRating)
    const [stagePresenceRating, setStagePresenceRating] = useState(show.stagePresenceRating)
    const [notes, setNotes] = useState(show.notes)
    
    useEffect(() => {
        setShow({
            ...show,
            photoUrls: photoUrls,
            overallRating: overallRating,
            venueRating: venueRating,
            musicalityRating: musicalityRating,
            productionRating: productionRating,
            stagePresenceRating: stagePresenceRating,
            notes: notes
        })

    }, [photoUrls, overallRating, venueRating, musicalityRating, productionRating,
    stagePresenceRating, notes])
    
    


    async function handleSubmitPress() {
        if(!show.overallRating) {
            alert('Please select a rating for the show to submit!')
            return false
        }

        if(!show.venueRating) {
            alert('Please select a rating for the venue to submit!')
            return false
        }

        const newPhotoUrls = await uploadSupabasePhotos(show.photoUrls)
        setShow({
            ...show,
            photoUrls: newPhotoUrls
        })
        
        setShow({
            ...show,
            createdAt: Date().toString()
        })

        setSubmitReady(true)

        
    }

    return (
        

        <SafeAreaView className='flex-1'>
            { isLoading ? <View><Text>Loading... </Text></View> :
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            extraHeight={100}
            keyboardShouldPersistTaps='handled'
            className='flex-1 px-3'>
            <View className='h-[20vh] p-3 pr-10 pl-10 rounded-xl'>
                <Image className="h-full w-full rounded-xl" source={{ uri: show.artistImageUri }} />
            </View>
            <AccordionHeaderNoComponent
                    title="Artist Name"
                    subtitle={show.artistName} />
            <AccordionHeaderNoComponent
                    title="Venue Name"
                    subtitle={show.venue} />
            <AccordionHeaderNoComponent
                    title="Date"
                    subtitle={show.date} />

            {/* Photos Item */}
            <EditItem title='Photos' subtitle='' setModalVisible={setPhotoModalVisible}/>

            <AccordionEmojiRating title='Show Rating' setRating={setOverallRating} rating={overallRating} />

            <AccordionEmojiRating title='Venue Rating' setRating={setVenueRating} rating={venueRating} />
            <EditItem title='Notes' subtitle='' setModalVisible={setNotesModalVisible} />
            <Button title='Save' onPress={handleSubmitPress} />
            <Modal 
                animationType="slide"
                visible={photoModalVisible}
                onRequestClose={() => {
                //   Alert.alert('Modal has been closed.')
                  setPhotoModalVisible(!photoModalVisible)
                }}
            >
                <ManagePhotos photoUrls={photoUrls} setPhotoUrls={setPhotoUrls} setModalVisible={setPhotoModalVisible}/>

            </Modal>
            <Modal 
                animationType="slide"
                visible={notesModalVisible}
                onRequestClose={() => {
                //   Alert.alert('Modal has been closed.')
                  setNotesModalVisible(!notesModalVisible)
                }}
            >
                <EditNotes notes={notes} setNotes={setNotes} setModalVisible={setNotesModalVisible}/>

            </Modal>
            

          </KeyboardAwareScrollView>
        }
        </SafeAreaView> 
      );
}

