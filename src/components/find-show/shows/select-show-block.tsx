import { JamBaseEvent } from "../../../types/jambase";
import { View, Text } from "../../Themed";
import React from "react";


interface SelectShowBlockProps {
    event: JamBaseEvent
}

export default function SelectShowBlock({ event }: SelectShowBlockProps) {
    return (
        <View className='flex-row h-[10vh] p-2 bg-themeGray rounded-xl'>
            
            <View className="px-3 w-[10vh] justify-center bg-themeGray">
                <Text className="text-white font-bold">{event.startDate.substring(5,7)}.{event.startDate.substring(8,10)}</Text>
            </View>
            <View className='flex-1 justify-items-center px-2 bg-themeGray'>
                
                <View className="flex-1 justify-center px-2 bg-themeGray">
                    <Text className="text-white font-bold overflow-hidden truncate">{event.location.name}</Text>
                    <Text className="text-white truncate">{event.location.address.addressLocality}</Text>
                </View>
                
            </View>
        </View>
    )
}