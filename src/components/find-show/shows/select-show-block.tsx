import { JamBaseEvent } from "../../../types/jambase";
import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";


interface SelectShowBlockProps {
    event: JamBaseEvent
}

export default function SelectShowBlock({ event }: SelectShowBlockProps) {
    const [addressLocality, setAddressLocality] = useState('')
    const [venueName, setVenueName] = useState('')

    useEffect(() => {
        if(event.location.address){
            setAddressLocality(event.location.address.addressLocality)
        }
        if(event.location.name){
            setVenueName(event.location.name)
        } else {
            setVenueName('Unknown')
        }
    })

    return (
        <View className='flex-row h-[10vh] p-2 bg-themeGray rounded-xl'>
            
            <View className="px-3 w-[10vh] justify-center bg-themeGray">
                <Text className="text-white font-bold">{event.startDate.substring(5,7)}.{event.startDate.substring(8,10)}</Text>
            </View>
            <View className='flex-1 justify-items-center px-2 bg-themeGray'>
                
                <View className="flex-1 justify-center px-2 bg-themeGray">
                    <Text className="text-white font-bold overflow-hidden truncate">{venueName}</Text>
                    <Text className="text-white truncate">{addressLocality}</Text>
                </View>
                
            </View>
        </View>
    )
}