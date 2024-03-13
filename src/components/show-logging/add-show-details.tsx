import React, { useEffect } from 'react';

import {
    Button,
    SafeAreaView,
    Text,
    View,
    Image,
    Modal,
    
  } from 'react-native';

import { uploadSupabasePhotos } from '../../api';

import { useState } from 'react';

import { Memories, Show } from '../../types/types';

import { 
    AccordionEmojiRating,
    EditItem,
} from './add-show-details-components';

import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ManagePhotos from '../show-details/photos/manage-photos';
import EditNotes from '../show-details/notes/edit-notes';
import AddShowDetailsHeader from './add-show-details-header';

interface AddShowDetailsProps {
    title: string
    show: Show
    setShow: (value: Show) => void
    edit: boolean
    setSubmitReady: (value: boolean) => void
    handleEditCancel: () => void
}

export default function AddShowDetails({ 
    title, show, setShow, edit, setSubmitReady, handleEditCancel
}: AddShowDetailsProps) {

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

    const [photosSubtitle, setPhotosSubtitle] = useState('')
    const [notesSubtitle, setNotesSubtitle] = useState('')
    
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

        if(photoUrls.length == 0){
            setPhotosSubtitle('')
        } else if (photoUrls.length == 1){
            setPhotosSubtitle('1 Photo')
        } else {
            setPhotosSubtitle(`${photoUrls.length} Photos`)
        }

        if(notes != ''){
            setNotesSubtitle('Saved')
        } else {
            setNotesSubtitle('')
        }

    }, [photoUrls, overallRating, venueRating, musicalityRating, productionRating,
    stagePresenceRating, notes])
    
    


    async function handleSavePress() {
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
            <AddShowDetailsHeader title={title} handleSavePress={handleSavePress} handleCancelPress={handleEditCancel}/>
            { isLoading ? <View><Text>Loading... </Text></View> :
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            extraHeight={100}
            keyboardShouldPersistTaps='handled'
            className='flex-1 px-3'>
            <View className='h-[30vh] p-3 rounded-xl'>
                <Image className="h-full w-full rounded-xl" source={{ uri: show.artistImageUri }} />
            </View>

            <EditItem title="Artist" subtitle={show.artistName} setModalVisible={null}/>
            <EditItem title="Venue" subtitle={show.venue} setModalVisible={null}/>
            <EditItem title="Date" subtitle={show.date} setModalVisible={null}/>



            {/* Photos Item */}
            <EditItem title='Photos' subtitle={photosSubtitle} setModalVisible={setPhotoModalVisible} />

            <AccordionEmojiRating title='Show Rating' setRating={setOverallRating} rating={overallRating} />

            <AccordionEmojiRating title='Venue Rating' setRating={setVenueRating} rating={venueRating} />
            <EditItem title='Notes' subtitle={notesSubtitle} setModalVisible={setNotesModalVisible} />
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

