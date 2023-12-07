import { JamBaseEvent } from "../../../types/jambase";
import { View, Text } from "../../Themed";
import React from "react";


interface SelectShowBlockProps {
    event: JamBaseEvent
}

export default function SelectShowBlock({ event }: SelectShowBlockProps) {
    return (
        <View className='flex-row h-[10vh] p-2'>
            
            <View className="px-3 w-[10vh] justify-center">
            <Text className="text-white font-bold">{event.startDate.substring(5,7)}.{event.startDate.substring(8,10)}</Text>
            </View>
            <View className='flex-row justify-items-center px-2 rounded'>
                
                <View className="flex-column justify-center px-2">
                <Text className="text-white font-bold">{event.location.name}</Text>
                {/* <Text className="text-white">{event.location.address.addressLocality}</Text> */}
                </View>
                
            </View>
        </View>
    )
}