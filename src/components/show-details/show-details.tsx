import React, { useEffect, useRef, useState } from "react";
import { View, Text, Button, TouchableOpacity, Modal, TouchableWithoutFeedback } from "react-native";
import { Show } from "../../types/types";
import { deleteSupabaseShow, getSupabaseSession, getSupabaseShow, updateSupabaseShow, updateSupabaseShowItem, uploadSupabasePhotos } from "../../api";
import ShowDetailsCarousel from "./show-details-carousel";
import ShowNotesSummary from "./show-notes-summary";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SpotifyButton from "./spotify-button";
import MemoryCarousel from "../memories/memory-carousel";
import EmojiRatingBar from "../utils/emoji-rating-bar";
import EmptyDetail from "./empty-detail";
import { useNavigation, useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { Entypo, Feather, FontAwesome } from "@expo/vector-icons";
import ExtraActionsModal from "./extra-actions-modal";
import { router } from "expo-router";
import AddShowDetails from "../show-logging/add-show-details";
import { Session } from "@supabase/supabase-js";

interface ShowDetailsProps {
    showId: string
}

const ShowDetails: React.FC<ShowDetailsProps> = ({
    showId
}) => {  

  const navigation = useNavigation()

  const [show, setShow] = useState<Show|null>(null)
  const [editShow, setEditShow] = useState<Show|null>(null)
  const [showUnsavedChanges, setShowUnsavedChanges] = useState(false)
  const [actionModalVisible, setActionModalVisible] = useState(false)
  const [editShowModalVisible, setEditShowModalVisible] = useState(false)
  const [submitReady, setSubmitReady] = useState(false)

  const setlist = null
  
  const initialLoad = useRef(true); // Ref to track initial load


  const setShowInitial = (s: Show) => {
    setShow(s)
    setEditShow({...s})
    setShowUnsavedChanges(false)
    initialLoad.current = false; // Set to false after initial load
  }

  const setOverallShowRatingUpdateShow = (newOverallShowRating: number) => {
    if(show) {
      const updatedShow = {
        ...show,
        overallRating: newOverallShowRating
      }
      setShow(updatedShow);
    } else {
      console.error('Cannot update show rating if show is null')
    }
    
  }

  const setVenueRatingUpdateShow = (newVenueRating: number) => {
    if(show) {
      const updatedShow = {
        ...show,
        venueRating: newVenueRating
      }
      setShow(updatedShow);
    } else {
      console.error('Cannot update show rating if show is null')
    }
    
  }

  const setPhotosUpdateShow = (photoUrls: string[]) => {
    if(show) {
      const updatedShow = {
        ...show,
        photoUrls: photoUrls
      }
      setShow(updatedShow);
    } else {
      console.error('Cannot update show photos if show is null')
    }
    
  }

  const pickImageAsync = async () => {
    if(show){
      const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
          allowsMultipleSelection: true
      });

      if (!result.canceled) {
        const uris: string[] = []
        result.assets.forEach(asset => {
          uris.push(asset.uri)
        })
        const newPhotoUrls = await uploadSupabasePhotos(uris)
        const photoUrls = [...show.photoUrls, ...newPhotoUrls]
        await updateSupabaseShowItem(show.id,'photo_urls',photoUrls)

        setPhotosUpdateShow(photoUrls)
      } else {
        alert('You did not select any image.');
      }
    } else {
      console.error('cannot add photos if show is null')
    }
  };

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      // Do something when the screen is focused

      const fetchShow = async () => {
        try {
          console.log('Loading show from supabase')
          const s = await getSupabaseShow(showId);
          initialLoad.current = true
          if (s) {
            setShowInitial(s)
          } else {
            console.error('Show is null');
          }
          
          
        } catch (error) {
          console.error('Error fetching shows', error);
        }
      };
  
      fetchShow();
    });

    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);

  useEffect(() => {
    if (!initialLoad.current) {
      setShowUnsavedChanges(true)
    }
  }, [show])



  useEffect(() => {
    if(submitReady){
      if(editShow && show){
        setShow(editShow)
        updateSupabaseShow(show)
        setEditShowModalVisible(false)
      }
      
    }
  }, [submitReady])

  const handleXPress = () => {
    navigation.goBack()
  }

  const handleDotsPress = () => {
    setActionModalVisible(true)
  }


  const onDelete = async (showId: string) => {
    const {data, error} = await deleteSupabaseShow(showId)
    if (error) {
      alert('Error deleting row: error')
    } else {
      console.log('Deleted:', data)
      router.replace('/')
    }
    
  }

  const onEdit = async () => {
    console.log('editing...')
    setEditShowModalVisible(true)
    setActionModalVisible(false)
}

  const handleEditXPress = () => {
    setEditShowModalVisible(false)
  }


  return (
    
       <View className="flex-1 items-center">
    { (show && editShow) ? (
      <View className="flex-1 items-center">
        
        {/* <ShowDetailsHeader show={show} showUnsavedChanges={showUnsavedChanges} setShowUnsavedChanges={setShowUnsavedChanges} /> */}
        <KeyboardAwareScrollView 
          enableOnAndroid={true}
          extraHeight={100}
          keyboardShouldPersistTaps='handled'
          className="flex-1">
        <View>
          <ShowDetailsCarousel show={show} />
          <View className="absolute top-0 left-0 right-0 p-4 flex-row justify-between items-center">
            {/* Left Button with X Icon */}
            <TouchableOpacity className="p-2 rounded-full" onPress={handleXPress}>
              <Feather size={25} color='white' name="x"/>
            </TouchableOpacity>

            {/* Right Button with Vertical Dots Icon */}
            <TouchableOpacity className="p-2 rounded-full" onPress={handleDotsPress}>
              <Entypo size={20} color='white' name="dots-three-vertical" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="px-6 py-2">
          <Text className="text-white text-lg pb-1">{show.artistName}</Text>
          <Text className="text-gray-300 text-md">{show.date} {'\u00B7'} {show.venue}{show.venueLoc ? `, ${show.venueLoc}` : ''}</Text>
        </View>
        <View className="p-2">
          <View className="py-4 px-2">
            { show.notes ? (
              <View className="p-2">
                <ShowNotesSummary show={show} />
              </View>
              
            ) : (
              <></>
            )}
            {/* Ratings view */}
            <View className="px-2">
              <Text className="py-4  items-left text-3xl text-white">Ratings</Text>
              {/* Show Ratings View */}
              <View className="py-2">
                <View>
                  <Text className='text-white text-lg'>The Show</Text>
                </View>
                <EmojiRatingBar rating={show.overallRating} setRating={setOverallShowRatingUpdateShow} />
              </View>
              {/* Venue Ratings View  */}
              <View className="py-2">
                <View>
                  <Text className='text-white text-lg'>The Venue</Text>
                  <Text className='text-gray-400 text-md'>{show.venue}{show.venueLoc ? `, ${show.venueLoc}` : ''}</Text>
                </View>
                <EmojiRatingBar rating={show.venueRating} setRating={setVenueRatingUpdateShow} />
              </View>
              
            </View>
            
            { Object.values(show.memories).every(value => value === "") ? (
              <></>
              ):(
              <View>
                <Text className="py-4 items-left text-2xl text-white">Memories:</Text>

                <View className="items-center">
                  <MemoryCarousel show={show} setShow={setShow} />
                </View>
              </View>
            )}
            <View>
            { show.photoUrls && show.photoUrls.length > 0 ? (
               <EmptyDetail 
               title="Photos" 
               subtitle="Manage your pictures from the show" 
               iconName="picture-o" 
               link='show-details/manage-photos-page'
               show={show}/>
              
            ) : (
              <EmptyDetail 
                title="Photos" 
                subtitle="Add your pictures from the show" 
                iconName="picture-o" 
                link={pickImageAsync}
                show={show}/>
            )}
            </View>
            <View>
            { show.notes ? (
               <></>
              
            ) : (
              <EmptyDetail 
                title="Notes" 
                subtitle="Add your thoughts from the show" 
                iconName="pencil" 
                link="show-details/edit-notes"
                show={show}/>
            )}
            </View>
            <View>
            { Object.values(show.memories).every(value => value === "") ? (
               
               <EmptyDetail 
               title="Memories" 
               subtitle="Add your thoughts from the show" 
               iconName="star" 
               link="show-details/edit-notes"
               show={show}/>
            ) : (
              <></>
            )}
            </View>
            <View>
            { setlist ? (
               <></>
              
            ) : (
              <EmptyDetail 
                title="Setlist" 
                subtitle="Add the setlist for the night" 
                iconName="list-ul" 
                link="show-details/edit-notes"
                show={show}/>
            )}
            </View>
            { show.artistSpotifyUrl ? (
              <View>
                <SpotifyButton spotifyUrl={show.artistSpotifyUrl} />
              </View>
            ) : (
              <></>
            )}
          </View>
        </View>

        <Modal
          animationType="slide"
          visible={actionModalVisible}
          transparent={true}
          className="flex-1"

        >  
          <ExtraActionsModal setActionModalVisible={setActionModalVisible} setEditShowModalVisible={setEditShowModalVisible} showId={showId} onEdit={onEdit}/>
        </Modal>
        <Modal
          animationType="slide"
          visible={editShowModalVisible}
          transparent={true} >
            <View className='flex-1 bg-black'>
            <View className="">
            {/* Left Button with X Icon */}
            <TouchableOpacity className=" rounded-full" onPress={handleEditXPress}>
              <Text className="text-white text-lg pl-6 pt-6">Cancel</Text>
            </TouchableOpacity>

            
          </View>
            <AddShowDetails 
                show={editShow}
                setShow={setEditShow}
                edit={false}
                setSubmitReady={setSubmitReady}
              /> 
            </View>
                
        </Modal>

        
        </KeyboardAwareScrollView>
      </View> 
    ) : (
      <View>
        <Text>Loading...</Text>
      </View>
    )
    
    }
  </View>
   
  )
}

export default ShowDetails;