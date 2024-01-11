import { View } from '../components/Themed';
import React from 'react';
import { DatePicker } from '../components/find-show/show-date-picker'
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from 'react';

export default function DatePickerScreen() {  
    const router = useRouter(); // Initialize the navigation hook
    const params = useLocalSearchParams()
    const [dateSelected, setDateSelected] = useState(false)

    const [date, setDate] = useState('')

    useEffect(() => { 
        console.log(`date: ${date}`)
        if(dateSelected) {
          setDateSelected(false)
          router.push({
              pathname: '/log-show',
              params: {
                  artistId: params.artistId,
                  artistName: params.artistName,
                  artistImageUri: params.artistImageUri,
                  venueId: params.venueId,
                  venueName: params.venueName,
                  venueLoc: params.venueLoc,
                  date: date
              }
          })
        }
      }, [dateSelected]);

  return (
    <View className='flex-1 justify-center'>
      <DatePicker setDate={setDate} setDateSelected={setDateSelected} />
    </View>
  );
}