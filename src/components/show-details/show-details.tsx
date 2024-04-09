import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Modal, ActivityIndicator} from "react-native";
import { Show } from "../../types/types";
import { getSupabaseShow, updateSupabaseShow, uploadSupabasePhotos } from "../../api";
import ShowDetailsCarousel from "./show-details-carousel";
import ShowNotesSummary from "./notes/show-notes-summary";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SpotifyButton from "./spotify-button";
import EmojiRatingBar from "../utils/emoji-rating-bar";
import { useNavigation, useRouter } from "expo-router";
import { Entypo, Feather, FontAwesome } from "@expo/vector-icons";
import ExtraActionsModal from "./extra-actions-modal";
import AddShowDetails from "../show-logging/add-show-details";
import ViewAllNotes from "./notes/view-all-notes";
import MemoryCarousel from "../show-details/memories/memory-carousel";
import StarRatingBar from "../utils/star-rating-bar";

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
  const [notesModalVisible, setNotesModalVisible] = useState(false)
  const [submitReady, setSubmitReady] = useState(false)
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  const setlist = null
  
  const initialLoad = useRef(true); // Ref to track initial load


  const handleSetShow = (s: Show) => {
    setShow(s)
    setEditShow({...s})
    setShowUnsavedChanges(false)
    initialLoad.current = false; // Set to false after initial load
  }
  

  useEffect(() => {
    
    const fetchShow = async () => {
      try {
        console.log('Loading show from supabase')
        const s = await getSupabaseShow(showId);
        console.log('loaded show from supabase')
        initialLoad.current = true
        if (s) {
          handleSetShow(s)
        } else {
          console.error('Show is null');
        }
        
        
      } catch (error) {
        console.error('Error fetching shows', error);
      }
    };
  
      fetchShow();

  }, []);

  useEffect(() => {
    if (!initialLoad.current) {
      setShowUnsavedChanges(true)
    }
  }, [show])

  const handleShowSubmit = async (submitShow: Show) => {
    console.log('submit')
    console.log(submitShow.photoUrls)
    const newPhotoUrls = await uploadSupabasePhotos(submitShow.photoUrls)
    console.log('new')
    console.log(newPhotoUrls)
    const newSubmitShow = {
      ...submitShow,
      photoUrls: newPhotoUrls
    }

    await updateSupabaseShow(newSubmitShow)
    handleSetShow(newSubmitShow)
    setUnsavedChanges(false)
    setEditShowModalVisible(false)
    // setShowReload(false)
  }

  const handleXPress = () => {
    navigation.goBack()
  }

  const handleDotsPress = () => {
    setActionModalVisible(true)
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
                <ShowNotesSummary show={show} setModalVisible={setNotesModalVisible}/>
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
                <EmojiRatingBar rating={show.overallRating} setRating={()=>{}} editEnabled={false}/>
              </View>
              {/* Venue Ratings View  */}
              <View className="py-2">
                <View>
                  <Text className='text-white text-lg'>The Venue</Text>
                  <Text className='text-gray-400 text-md'>{show.venue}{show.venueLoc ? `, ${show.venueLoc}` : ''}</Text>
                </View>
                <StarRatingBar rating={show.venueRating} setRating={()=>{}} editEnabled={false}/>
              </View>
              
            </View>
            
            {
  Object.entries(show.memories).some(([_, { response }]) => response.trim() !== "") ? (
    <View>
      <Text style={{ paddingVertical: 16, textAlign: 'left', fontSize: 24, color: 'white' }}>Memories:</Text>
      <View style={{ alignItems: 'center' }}>
        <MemoryCarousel show={show} />
      </View>
    </View>
  ) : null
}

            {/* <View>
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
            </View> */}
            {/* <View>
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
            </View> */}
            {/* <View>
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
            </View> */}
            {/* <View>
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
            </View> */}
            { show.artistSpotifyUrl ? (
              <View className="p-2">
                <SpotifyButton spotifyUrl={show.artistSpotifyUrl} />
              </View>
            ) : (
              <></>
            )}
          </View>
        </View>
        {/* Extra Actions Modal */}
        <Modal
          animationType="slide"
          visible={actionModalVisible}
          transparent={true}
          className="flex-1"

        >  
          <ExtraActionsModal setActionModalVisible={setActionModalVisible} setEditShowModalVisible={setEditShowModalVisible} showId={showId} onEdit={onEdit}/>
        </Modal>
        {/* Edit show modal */}
        <Modal
          animationType="slide"
          visible={editShowModalVisible}
          transparent={true} >
            <View className='flex-1 bg-black'>
              <AddShowDetails 
                  show={editShow}
                  setShow={setEditShow}
                  edit={false}
                  submitReady={submitReady}
                  setSubmitReady={setSubmitReady}
                  handleEditCancel={handleEditXPress}
                  title={show.artistName}
                  unsavedChanges={unsavedChanges}
                  setUnsavedChanges={setUnsavedChanges}
                  handleShowSubmit={handleShowSubmit}
                /> 
            </View>
        </Modal>
        {/* View All Notes Modal */}
        <Modal
          animationType="slide"
          visible={notesModalVisible}
          transparent={true}>
          <View className="flex-1 mt-[5%]">
            <ViewAllNotes notes={show.notes} setModalVisible={setNotesModalVisible} />
          </View>
        </Modal>
        {/* Loading modal 
        <Modal
                animationType="fade"
                transparent={true}
                visible={showReload} 
                onRequestClose={() => {
                    // Handle the case when the modal is requested to be closed
                    setShowReload(false);
                }}
            >
                <View  className='flex-1 justify-center items-center'>
                    <View className='flex-row p-4 rounded-xl items-center bg-themeGray' >
                        <ActivityIndicator size="large" color="white" />
                        <Text className='pl-2 text-white'>Loading...</Text>
                    </View>
                </View>
            </Modal> */}

        
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