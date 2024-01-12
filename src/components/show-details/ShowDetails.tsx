import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "../Themed";
import { Show } from "../../types/types";
import { getSupabaseShow } from "../../api";
import ShowDetailsHeader from "./ShowDetailsHeader";
import ShowDetailsCarousel from "./ShowDetailsCarousel";
import ShowNotesSummary from "./show-notes-summary";
import { ScrollView } from "react-native-gesture-handler";
import SpotifyButton from "./spotify-button";
import MemoryCarousel from "../memories/memory-carousel";
import EmojiRatingBar from "../utils/emoji-rating-bar";
import EmptyDetail from "./empty-detail";
import { useNavigation } from "expo-router";


interface ShowDetailsProps {
    showId: string
}

const ShowDetails: React.FC<ShowDetailsProps> = ({
    showId
}) => {  

  const navigation = useNavigation()

  const [show, setShow] = useState<Show|null>(null)
  const [showUnsavedChanges, setShowUnsavedChanges] = useState(false)

  const setlist = null
  
  const initialLoad = useRef(true); // Ref to track initial load


  const setShowInitial = (s: Show) => {
    setShow(s)
    // setShowRating(s.overallRating)
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



  return (
    
       <View className="flex-1 items-center">
    { show ? (
      <View className="flex-1 items-center">
        
        <ShowDetailsHeader show={show} showUnsavedChanges={showUnsavedChanges} setShowUnsavedChanges={setShowUnsavedChanges} />
        <ScrollView className="flex-1">
        <View>
          <ShowDetailsCarousel show={show} />
        </View>
        <View className="p-2">
          <View className="p-2">
            { show.notes ? (
              <View className="p-2">
                <ShowNotesSummary show={show} />
              </View>
              
            ) : (
              <></>
            )}
            
            <Text className="py-4 items-left text-2xl">Ratings:</Text>
            <View>
              <Text className='text-white text-lg'>The Show</Text>
            </View>
            <EmojiRatingBar rating={show.overallRating} setRating={setOverallShowRatingUpdateShow} />
            <View>
              <Text className='text-white text-lg'>The Venue</Text>
            </View>
            <EmojiRatingBar rating={show.venueRating} setRating={setVenueRatingUpdateShow} />
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
            { show.photoUrls && show.photoUrls.length > 0 ? (
               <></>
              
            ) : (
              <EmptyDetail 
                title="Photos" 
                subtitle="Add your thoughts from the show" 
                iconName="picture-o" 
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

        
        </ScrollView>
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