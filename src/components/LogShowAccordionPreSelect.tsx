import React, { useEffect } from 'react';

import {
    Button,
    SafeAreaView,
    Text,
    View,
    Image,
    Modal,
    
  } from 'react-native';

import { addSupabaseShow, uploadSupabasePhotos } from '../api';

import { useState } from 'react';
import uuid from 'react-native-uuid';

import { Memories, Show } from '../types/types';

import { 
    AccordionHeaderNoComponent,
    AccordionEmojiRating,
    EditItem,
} from './AccordionItem';

import { getSupabaseSession } from '../api';
import { Session } from '@supabase/supabase-js';

import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ManagePhotos from './show-details/photos/manage-photos';
import EditNotes from './show-details/notes/edit-notes';

interface LogShowAccordionPreSelectProps {
    artistId: string
    artistName: string
    artistImageUri: string
    artistSpotifyUrl: string
    venueId: string
    venueName: string
    venueLoc: string
    date: string
    eventId: string
}

export default function LogShowAccordionPreSelect({ 
    artistId, 
    artistImageUri, 
    artistName, 
    artistSpotifyUrl,
    venueId,
    venueName,
    venueLoc,
    date,
    eventId
}: LogShowAccordionPreSelectProps) {

    // console.log(artistImageUri)
    const router = useRouter(); // Initialize the navigation hook

    // Setting initial memories
    const memories = {
        'Tonight I met the band and...':'',
        'My favorite part of the show was...':'',
        'I\'ll never forget...':''
    }

    const [session, setSession] = useState<Session | null>(null);
    // const [artistName, setArtistName] = useState('')
    // const [date, setDate] = useState('')
    // const [venue, setVenue] = useState('')
    // const [photos, setPhotos] = useState<ImagePicker.ImagePickerAsset[]>([])
    const [photoUrls, setPhotoUrls] = useState<string[]>([])
    const [overallRating, setOverallRating] = useState<number|null>(null)
    const [venueRating, setVenueRating] = useState<number|null>(null)
    const [notes, setNotes] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    // const navigation = useNavigation()
    const [musicalityRating, setMusicalityRating] = useState(0)
    const [productionRating, setProductionRating] = useState(0)
    const [stagePresenceRating, setStagePresenceRating] = useState(0)
    const [photoModalVisible, setPhotoModalVisible] = useState(false)
    const [notesModalVisible, setNotesModalVisible] = useState(false)


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
        id: string,
        createdAt: string,
        userId: string,
        artistName: string,
        date: string,
        venue: string,
        overallRating: number|null,
        notes: string,
        photoUrls: string[],
        artistId: string,
        artistImageUri: string,
        venueId: string,
        venueLoc: string,
        eventId: string,
        artistSpotifyUrl: string,
        memories: Memories,
        venueRating: number|null,
        stagePresenceRating?: number,
        musicalityRating?: number,
        productionRating?: number,
        
    ) {
        if(!overallRating) {
            alert('Please select a rating for the show to submit!')
            return false
        }

        if(!venueRating) {
            alert('Please select a rating for the venue to submit!')
            return false
        }

        const newPhotoUrls = await uploadSupabasePhotos(photoUrls)
        setPhotoUrls(newPhotoUrls)
        
        const show: Show = {
            id: id,
            createdAt: createdAt,
            userId: userId,
            artistName: artistName,
            date: date,
            venue: venue,
            overallRating: overallRating,
            stagePresenceRating: stagePresenceRating,
            musicalityRating: musicalityRating,
            productionRating: productionRating,
            notes: notes,
            photoUrls: newPhotoUrls,
            venueId: venueId,
            venueLoc: venueLoc,
            artistId: artistId,
            artistImageUri: artistImageUri,
            eventId: eventId,
            artistSpotifyUrl: artistSpotifyUrl,
            memories: memories,
            venueRating: venueRating,
        }

        addSupabaseShow(show)
        return true
    }

    async function handleSubmitPress() {
        if (!session) {
            setIsLoading(true)
            return
        }
        
        const newUuid = uuid.v4().toString()

        console.log(Date().toString())

        const showSubmitted = await submitShowLog(
            newUuid,
            Date().toString(),
            session.user.id,
            artistName,
            date,
            venueName,
            overallRating,
            notes,
            photoUrls,
            artistId,
            artistImageUri,
            venueId,
            venueLoc,
            eventId,
            artistSpotifyUrl,
            memories,
            venueRating,
            stagePresenceRating,
            musicalityRating,
            productionRating
        )
        if (showSubmitted) {
            router.push({ pathname: "/"})
        }
        
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

