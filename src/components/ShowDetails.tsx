import React, { useEffect, useState } from "react";
import { View, Text } from "./Themed";
import { Show } from "../types/types";
import { getSupabaseShow } from "../api";
// import { Show } from "../types/types";

interface ShowDetailsProps {
    showId: string
}

const ShowDetails: React.FC<ShowDetailsProps> = ({
    showId
}) => {  

    const [show, setShow] = useState<Show|null>(null)

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
    <View className='flex-1 justify-center items-center'>
      <Text>{show?.artistName}</Text>
      <Text>{show?.venue}</Text>
      <Text>{show?.date}</Text>
      <Text>Notes: {show?.notes}</Text>
    </View>
  );
}

export default ShowDetails;