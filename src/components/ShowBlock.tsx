import { Image } from "react-native";
import { Text, View } from "../components/Themed"
import { Show } from "../types/types";
import React from "react";


interface ShowProps {
    show: Show
}

export const ShowBlock: React.FC<ShowProps> = ({
    show
}) => {

    return (
        <View className='flex-row h-[10vh] p-2'>
            
            <View className="px-3 w-[10vh] justify-center">
              <Text className="text-white font-bold">{show.date.substring(5,7)}.{show.date.substring(8,10)}</Text>
            </View>
            <View className='flex-row justify-items-center px-2'>
                <Image
                className='aspect-square px-2'
                source={{
                    uri: show.artistImageUri,
                }}
                />
                <View className="flex-column justify-center px-2">
                  <Text className="text-white font-bold">{show.artistName}</Text>
                  <Text className="text-white">{show.venue}</Text>
                </View>
                
            </View>
        </View>
    )
}

