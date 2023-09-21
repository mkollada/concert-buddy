import { View, Image, Text } from "react-native";
import { Show } from "../types/types";
import React from "react";


interface ShowProps {
    show: Show
}

export const ShowBlock: React.FC<ShowProps> = ({
    show
}) => {
    
    return (
        // w-[90%] h-[10vh] justify-items-center place-items-center rounded-sm  p-5
        <View className='flex-row h-[10vh] p-2'>
            
            <View className="px-3 justify-center">
              <Text className="text-white font-bold">{show.date.substring(5,7)}.{show.date.substring(8,10)}</Text>
            </View>
            <View className='flex-row justify-items-center px-2'>
                <Image
                className='aspect-square px-2'
                source={{
                    uri: 'https://mcusercontent.com/f89c714d668e98a972a148b5b/images/d8ddef87-b281-b8c5-7b6f-9560c068ba2f.jpeg',
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

