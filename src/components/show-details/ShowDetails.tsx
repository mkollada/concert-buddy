import React, { useEffect, useState } from "react";
import { View, Text } from "../Themed";
import { Show, isShow } from "../../types/types";
import { getSupabaseShow } from "../../api";
import ShowDetailsHeader from "./ShowDetailsHeader";
import ShowDetailsCarousel from "./ShowDetailsCarousel";

interface ShowDetailsProps {
    showId: string
}

const ShowDetails: React.FC<ShowDetailsProps> = ({
    showId
}) => {  

    const [show, setShow] = useState<Show|null>(null)
    const showLoaded = isShow(show)

  useEffect(() => {

      const fetchShows = async () => {
        try {
          const show = await getSupabaseShow(showId);
          setShow(show);
        } catch (error) {
          console.error('Error fetching shows', error);
        }
      };
  
      fetchShows();
    }, []);

  return (
    <View className="flex-1 items-center">
    { showLoaded ? (
      <View className="flex-1 items-center">
        
        <ShowDetailsHeader show={show} />
        <View>
          <ShowDetailsCarousel show={show} />
        </View>
        <View className='flex-1 items-center'>
          <Text className="font-bold text-2xl p-2">{show?.notes}</Text>
          <Text className='text-xl'>Rating: {show?.overallRating}/5</Text>          
        </View>
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