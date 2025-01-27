import React, { useEffect } from 'react';

import {
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
import ManageSetlist from '../show-details/setlist/manage-setlist';
import ManageSupportingActs from '../show-details/supporting-acts/manage-supporting-acts';

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
    handleShowSubmit: (show: Show) => Promise<void>
}

export default function AddShowDetails({ 
    title, show, edit, handleShowSubmit, handleEditCancel, unsavedChanges, setUnsavedChanges
}: AddShowDetailsProps) {

    const [isLoading, setIsLoading] = useState(false)
    const [photoModalVisible, setPhotoModalVisible] = useState(false)
    const [notesModalVisible, setNotesModalVisible] = useState(false)
    const [memoriesModalVisible, setMemoriesModalVisible] = useState(false)
    const [setlistModalVisible, setSetlistModalVisible] = useState(false)
    const [supportingActsModalVisible, setSupportingActsModalVisible] = useState(false)

    const [editedShow, setEditedShow] = useState(show)


    const [photosSubtitle, setPhotosSubtitle] = useState('')
    const [memoriesSubtitle, setMemoriesSubtitle] = useState('')
    const [notesSubtitle, setNotesSubtitle] = useState('')
    const [setlistSubtitle, setSetlistSubtitle] = useState('')
    const [supportingActsSubtitle, setSupportingActsSubtitle] = useState('')

    

    useEffect(() => {
        handleSetPhotoSubtitle(editedShow.photoUrls)
        handleSetNotesSubtitle(editedShow.notes)
        handleSetSetlistSubtitle(editedShow.setlist)
        handleSetMemoriesSubtitile(editedShow.memories)
        handleSetSupportingActsSubtitle(editedShow.supportingActs)
    }, [editedShow])

    const [saving, setSaving] = useState(false)

    const handleSetNotesSubtitle = (notes: string) => {
        if(notes != ''){
            setNotesSubtitle('Saved')
        } else {
            setNotesSubtitle('')
        }
    }

    const handleSetNotes = (notes: string) => {
        handleSetNotesSubtitle(notes)

        setEditedShow({
            ...editedShow,
            notes: notes
        })
        setUnsavedChanges(true)
    }

    const handleSetPhotoSubtitle = (photoUrls: string[]) => {
        if(photoUrls.length == 0){
            setPhotosSubtitle('')
        } else if (photoUrls.length == 1){
            setPhotosSubtitle('1 Photo')
        } else {
            setPhotosSubtitle(`${photoUrls.length} Photos`)
        }
    }

    const handleSetSupportingActsSubtitle = (supportingActs: [string, string][]) => {
        if(supportingActs.length == 0){
            setSupportingActsSubtitle('')
        } else if (supportingActs.length == 1){
            setSupportingActsSubtitle('1 Act Added')
        } else {
            setSupportingActsSubtitle(`${supportingActs.length} Acts Added`)
        }
    }

    const handleSetPhotoUrls = (photoUrls: string[]) => {
        handleSetPhotoSubtitle(photoUrls)
        console.log('handle')
        console.log(photoUrls)
        setEditedShow({
            ...editedShow,
            photoUrls: photoUrls
        })
        setUnsavedChanges(true)
    }

    const handleSetMemoriesSubtitile = (memories: Memories) => {
        let numMems = 0
        for (const i in memories) {
            if(memories[i]['response'] != ''){
                numMems += 1
            }
        }

        if(numMems == 0){
            setMemoriesSubtitle('')
        } else if (numMems == 1) {
            setMemoriesSubtitle('1 Memory Saved')
        } else {
            setMemoriesSubtitle(`${numMems} Memories Saved`)
        }
    }

    const handleSetMemories = (memories: Memories) => {
        handleSetMemoriesSubtitile(memories)
        
        setEditedShow({
            ...editedShow,
            memories: memories
        })
        setUnsavedChanges(true)
    }

    const handleSetSetlistSubtitle = (setlist: string[]) => {
        if(setlist.length == 0){
            setSetlistSubtitle('')
        } else if (setlist.length == 1) {
            setSetlistSubtitle('1 Song Saved')
        } else {
            setSetlistSubtitle(`${setlist.length} Songs Saved`)
        }
    }

    const handleSetSetlist = (setlist: string[]) => {
        // console.log(setlist)
        // setSetlist(setlist)
        handleSetSetlistSubtitle(setlist)
        setEditedShow({
            ...editedShow,
            setlist: setlist
        })
        setUnsavedChanges(true)
    }

    const handleSetSupportingActs = (supportingActs: [string, string][]) => {
        // console.log(setlist)
        // setSetlist(setlist)
        handleSetSupportingActsSubtitle(supportingActs)
        setEditedShow({
            ...editedShow,
            supportingActs: supportingActs
        })
        setUnsavedChanges(true)
    }

    const handleSetOverallRating = (overallRating: number) => {
        setEditedShow({
            ...editedShow,
            overallRating: overallRating
        })
        setUnsavedChanges(true)
    }

    const handleSetVenueRating = (venueRating: number) => {
        setEditedShow({
            ...editedShow,
            venueRating: venueRating
        })
        setUnsavedChanges(true)
    }

    const handleSetMusicalityRating = (musicalityRating: number) => {
        setEditedShow({
            ...editedShow,
            musicalityRating: musicalityRating
        })
        setUnsavedChanges(true)
    }

    const handleSetStagePresenceRating = (stagePresenceRating: number) => {
        setEditedShow({
            ...editedShow,
            stagePresenceRating: stagePresenceRating
        })
        setUnsavedChanges(true)
    }

    const handleSetProductionRating = (productionRating: number) => {
        setEditedShow({
            ...editedShow,
            productionRating: productionRating
        })
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

        setSaving(true)
        await handleShowSubmit(editedShow)
        setSaving(false)        
    }

    return (
        

        <SafeAreaView className='flex-1 bg-black'>
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
            {/* <View className='h-[30vh] p-3 rounded-xl'>
                <Image className="h-full w-full rounded-xl" source={{ uri: show.artistImageUri }} />
            </View> */}

            <EditItem title="Artist" subtitle={show.artistName} setModalVisible={null}/>
            <EditItem title="Venue" subtitle={show.venue} setModalVisible={null}/>
            <EditItem title="Date" subtitle={show.date} setModalVisible={null}/>



            {/* Photos Item */}
            <EditItem title='Photos' subtitle={photosSubtitle} setModalVisible={setPhotoModalVisible} />

            <AccordionEmojiRating title='Show Rating' setRating={handleSetOverallRating} rating={editedShow.overallRating} editEnabled={true}/>

            <AccordionStarRating title='Venue Rating' setRating={handleSetVenueRating} rating={editedShow.venueRating} editEnabled={true}/>
            <EditItem title='Memories' subtitle={memoriesSubtitle} setModalVisible={setMemoriesModalVisible} />
            <EditItem title='Notes' subtitle={notesSubtitle} setModalVisible={setNotesModalVisible} />
            <EditItem title='Supporting Acts' 
                subtitle={supportingActsSubtitle} 
                setModalVisible={setSupportingActsModalVisible} />
            <EditItem title='Setlist' subtitle={setlistSubtitle} setModalVisible={setSetlistModalVisible} />
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
                <ManagePhotos photoUrls={editedShow.photoUrls} setPhotoUrls={handleSetPhotoUrls} setModalVisible={setPhotoModalVisible}/>

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
                <EditNotes notes={editedShow.notes} setNotes={handleSetNotes} setModalVisible={setNotesModalVisible}/>
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
                        memories={editedShow.memories} 
                        setMemories={handleSetMemories} 
                        setModalVisible={setMemoriesModalVisible} />
            </Modal>
            {/* Supporting Acts Modal */}
            <Modal
                animationType="slide"
                visible={supportingActsModalVisible}
                transparent={true}
                onRequestClose={() => {
                //   Alert.alert('Modal has been closed.')
                setSupportingActsModalVisible(false)
                }}>
                    <View className='h-[3%]'/>
                    <ManageSupportingActs     
                        supportingActs={editedShow.supportingActs} 
                        setSupportingActs={handleSetSupportingActs} 
                        setModalVisible={setSupportingActsModalVisible} />
            </Modal>
            {/* Setlist Modal */}
            <Modal
                animationType="slide"
                visible={setlistModalVisible}
                transparent={true}
                onRequestClose={() => {
                //   Alert.alert('Modal has been closed.')
                setSetlistModalVisible(false)
                }}>
                    <View className='h-[3%]'/>
                    <ManageSetlist     
                        setlist={editedShow.setlist} 
                        setSetlist={handleSetSetlist} 
                        setModalVisible={setSetlistModalVisible} />
            </Modal>
            {/* Saving Indicator Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={saving} 
                onRequestClose={() => {
                    // Handle the case when the modal is requested to be closed
                    setSaving(false);
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

