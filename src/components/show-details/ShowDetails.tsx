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
          const result = await getSupabaseShow(showId);
          setShow(result);
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
          <ShowDetailsCarousel />
        </View>
        <View className='flex-1 justify-center items-center'>
          <Text className="font-bold">{show?.notes}</Text>
          <Text>{show?.artistName}</Text>
          <Text>{show?.venue}</Text>
          <Text>{show?.date}</Text>
          
        </View>
      </View> 
    ) : (
      <View>
        <Text>Show did not load</Text>
      </View>
    )
    
    }
  </View>
  )
}

export default ShowDetails;