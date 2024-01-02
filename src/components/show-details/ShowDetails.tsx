import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "../Themed";
import { Show } from "../../types/types";
import { getSupabaseShow } from "../../api";
import ShowDetailsHeader from "./ShowDetailsHeader";
import ShowDetailsCarousel from "./ShowDetailsCarousel";
import ShowNotesSummary from "./show-notes-summary";
import ShowDetailsRating from "./show-ratings/show-details-ratings";
import { ScrollView } from "react-native-gesture-handler";
import SpotifyButton from "./spotify-button";
import MemoryCarousel from "../memories/memory-carousel";

interface ShowDetailsProps {
    showId: string
}

const ShowDetails: React.FC<ShowDetailsProps> = ({
    showId
}) => {  

    const [show, setShow] = useState<Show|null>(null)
    const [showUnsavedChanges, setShowUnsavedChanges] = useState(false)
    // const [response, setResponse] = useState('')

    const initialLoad = useRef(true); // Ref to track initial load


    const setShowInitial = (show: Show|null) => {
      setShow(show)
      setShowUnsavedChanges(false)
      initialLoad.current = false; // Set to false after initial load
    }

  useEffect(() => {

      const fetchShows = async () => {
        try {
          console.log('Loading show from supabase')
          const s = await getSupabaseShow(showId);
          setShowInitial(s)
        } catch (error) {
          console.error('Error fetching shows', error);
        }
      };
  
      fetchShows();
    }, []);

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
          <ShowDetailsRating show={show} />
          <View>
            <Text className='text-white text-lg'>The Venue</Text>
          </View>
          <ShowDetailsRating show={show} />
          <Text className="py-4 items-left text-2xl text-white">Memories:</Text>
          <View className="items-center">
            {/* <MemoryBlock prompt="Tonight I met the band and..." setResponse={setResponse} /> */}
            <MemoryCarousel show={show} setShow={setShow} />
          </View>
          <Text className="py-4 items-left text-2xl">More Options:</Text>
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