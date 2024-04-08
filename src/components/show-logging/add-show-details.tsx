import React, { useEffect } from 'react';

import {
    Button,
    SafeAreaView,
    Text,
    View,
    Image,
    Modal,
    ActivityIndicator,
    Alert,
    
  } from 'react-native';

import { uploadSupabasePhotos } from '../../api';

import { useState } from 'react';

import { Memories, Show } from '../../types/types';

import { 
    AccordionEmojiRating,
    AccordionStarRating,
    EditItem,
} from './add-show-details-components';

import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ManagePhotos from '../show-details/photos/manage-photos';
import EditNotes from '../show-details/notes/edit-notes';
import ManageMemories from '../show-details/memories/manage-memories';
import PageHeader from '../utils/page-header';

interface AddShowDetailsProps {
    title: string
    show: Show
    setShow: (value: Show) => void
    edit: boolean
    submitReady: boolean
    setSubmitReady: (value: boolean) => void
    handleEditCancel: () => void
    unsavedChanges: boolean
    setUnsavedChanges: (value: boolean) => void
}

export default function AddShowDetails({ 
    title, show, setShow, edit, submitReady, setSubmitReady, handleEditCancel, unsavedChanges, setUnsavedChanges
}: AddShowDetailsProps) {

    // console.log(artistImageUri)
    const router = useRouter(); // Initialize the navigation hook

    const [isLoading, setIsLoading] = useState(false)
    const [photoModalVisible, setPhotoModalVisible] = useState(false)
    const [notesModalVisible, setNotesModalVisible] = useState(false)
    const [memoriesModalVisible, setMemoriesModalVisible] = useState(false)


    const [photoUrls, setPhotoUrls] = useState(show.photoUrls)
    const [overallRating, setOverallRating] = useState(show.overallRating)
    const [venueRating, setVenueRating] = useState(show.venueRating)
    const [musicalityRating, setMusicalityRating] = useState(show.musicalityRating)
    const [productionRating, setProductionRating] = useState(show.stagePresenceRating)
    const [stagePresenceRating, setStagePresenceRating] = useState(show.stagePresenceRating)
    const [notes, setNotes] = useState(show.notes)
    const [memories, setMemories] = useState(show.memories)


    const [photosSubtitle, setPhotosSubtitle] = useState('')
    const [notesSubtitle, setNotesSubtitle] = useState('')
    const [saving, setSaving] = useState(false)

    // const [unsavedChanges, setUnsavedChanges] = useState(false)
    
    useEffect(() => {

        // if(photoUrls.length == 0){
        //     setPhotosSubtitle('')
        // } else if (photoUrls.length == 1){
        //     setPhotosSubtitle('1 Photo')
        // } else {
        //     setPhotosSubtitle(`${photoUrls.length} Photos`)
        // }

        // if(notes != ''){
        //     setNotesSubtitle('Saved')
        // } else {
        //     setNotesSubtitle('')
        // }

    }, [photoUrls, overallRating, venueRating, musicalityRating, productionRating,
    stagePresenceRating, notes, memories])

    const handleSetNotes = (notes: string) => {
        if(notes != ''){
            setNotesSubtitle('Saved')
        } else {
            setNotesSubtitle('')
        }

        setNotes(notes)
        setUnsavedChanges(true)
    }

    const handleSetPhotoUrls = (photoUrls: string[]) => {
        if(photoUrls.length == 0){
            setPhotosSubtitle('')
        } else if (photoUrls.length == 1){
            setPhotosSubtitle('1 Photo')
        } else {
            setPhotosSubtitle(`${photoUrls.length} Photos`)
        }

        setPhotoUrls(photoUrls)
        setUnsavedChanges(true)
    }

    const handleSetMemories = (memories: Memories) => {
        setMemories(memories)
        setUnsavedChanges(true)
    }

    const handleSetOverallRating = (overallRating: number) => {
        setOverallRating(overallRating)
        setUnsavedChanges(true)
    }

    const handleSetVenueRating = (venueRating: number) => {
        setVenueRating(overallRating)
        setUnsavedChanges(true)
    }

    const handleSetMusicalityRating = (musicalityRating: number) => {
        setMusicalityRating(musicalityRating)
        setUnsavedChanges(true)
    }

    const handleSetStagePresenceRating = (stagePresenceRating: number) => {
        setStagePresenceRating(stagePresenceRating)
        setUnsavedChanges(true)
    }

    const handleSetProductionRating = (productionRating: number) => {
        setProductionRating(productionRating)
        setUnsavedChanges(true)
    }
    
    
    const handleCancelPress = () => {
        if(unsavedChanges){
            Alert.alert(
                "Unsaved Changes", // Title
                "You have unsaved changes. Are you sure you want to go back without saving?", // Message
                [
                    {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                    },
                    { text: "Confirm", style: "destructive", onPress: () => handleEditCancel() },
                ],
                {
                    cancelable: true, // Whether to close the dialog on outside touch or not
                    onDismiss: () => console.log("Dialog dismissed"), // Callback when the alert is dismissed
                }
                );
        } else {
            handleEditCancel()
        }

    }

    async function handleSavePress() {
        if(!show.overallRating) {
            alert('Please select a rating for the show to submit!')
            return false
        }

        if(!show.venueRating) {
            alert('Please select a rating for the venue to submit!')
            return false
        }

        setSaving(true)

        setShow({
            ...show,
            photoUrls: photoUrls,
            overallRating: overallRating,
            venueRating: venueRating,
            musicalityRating: musicalityRating,
            productionRating: productionRating,
            stagePresenceRating: stagePresenceRating,
            notes: notes,
            memories: memories
        })

        const newPhotoUrls = await uploadSupabasePhotos(show.photoUrls)
        setShow({
            ...show,
            photoUrls: newPhotoUrls
        })
        
        if(!edit) {
            setShow({
                ...show,
                createdAt: Date().toString()
            })
        }

        setSubmitReady(true)
        setSaving(false)        
    }

    return (
        

        <SafeAreaView className='flex-1'>
            {/* <AddShowDetailsHeader title={title} handleSavePress={handleSavePress} handleCancelPress={handleEditCancel}/> */}
            <PageHeader title={title} 
                handleDonePress={handleSavePress} 
                doneText='Save' 
                handleCancelPress={handleCancelPress} 
                doneEnabled={unsavedChanges}/>
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

            <AccordionEmojiRating title='Show Rating' setRating={handleSetOverallRating} rating={overallRating} editEnabled={true}/>

            <AccordionStarRating title='Venue Rating' setRating={handleSetVenueRating} rating={venueRating} editEnabled={true}/>
            <EditItem title='Memories' subtitle='' setModalVisible={setMemoriesModalVisible} />
            <EditItem title='Notes' subtitle={notesSubtitle} setModalVisible={setNotesModalVisible} />
            <Modal 
                animationType="slide"
                visible={photoModalVisible}
                transparent={true}
                onRequestClose={() => {
                //   Alert.alert('Modal has been closed.')
                  setPhotoModalVisible(false)
                }}
            >
                <View className='h-[3%]'/>
                <ManagePhotos photoUrls={photoUrls} setPhotoUrls={handleSetPhotoUrls} setModalVisible={setPhotoModalVisible}/>

            </Modal>
            {/* Notes Modal */}
            <Modal 
                animationType="slide"
                visible={notesModalVisible}
                transparent={true}
                onRequestClose={() => {
                //   Alert.alert('Modal has been closed.')
                  setNotesModalVisible(false)
                }}
            >   
                <View className='h-[3%]'/>
                <EditNotes notes={notes} setNotes={handleSetNotes} setModalVisible={setNotesModalVisible}/>
            </Modal>
            {/* Memories Modal */}
            <Modal
                animationType="slide"
                visible={memoriesModalVisible}
                transparent={true}
                onRequestClose={() => {
                //   Alert.alert('Modal has been closed.')
                setMemoriesModalVisible(false)
                }}>
                    <View className='h-[3%]'/>
                    <ManageMemories     
                        memories={memories} 
                        setMemories={handleSetMemories} 
                        setModalVisible={setMemoriesModalVisible} />
            </Modal>
            {/* Saving Indicator Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={submitReady || saving} 
                onRequestClose={() => {
                    // Handle the case when the modal is requested to be closed
                    setSubmitReady(false);
                }}
            >
                <View  className='flex-1 justify-center items-center'>
                    <View className='flex-row p-4 rounded-xl items-center bg-themeGray' >
                        <ActivityIndicator size="large" color="white" />
                        <Text className='pl-2 text-white'>Saving...</Text>
                    </View>
                </View>
            </Modal>
            

          </KeyboardAwareScrollView>
        }
        </SafeAreaView> 
      );
}

