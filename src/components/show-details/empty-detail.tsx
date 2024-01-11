import { View, Text, Pressable } from "react-native";
import React from "react";
import Icon from '@expo/vector-icons/FontAwesome';
import { useRouter } from "expo-router";
import { Show } from "../../types/types";

interface EmptyDetailProps {
    title: string
    subtitle: string
    iconName: 'pencil'
    link: 'show-details/edit-notes' | 'add-photos'
    show: Show
}

export default function EmptyDetail({ 
    title, subtitle, iconName, link, show
}: EmptyDetailProps) {

    const router = useRouter()

    const handlePlusPress =() => {
        console.log('pressed')
        router.push({
            pathname:`/${link}`,
            params:{
                showId: show.id
            }
        })
    }

    return (
        <Pressable onPress={handlePlusPress} style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1
            }
          ]}>
            <View className='flex-row h-[10vh] p-2 rounded-xl items-center'>
                
                <View className="px-3 w-[10vh] justify-center items-center">
                    <Icon name={iconName} color='#9069F4' size={30} />
                </View>
                <View className='flex-1'>
                    
                    <View className="flex-1 justify-center">
                        <Text className="text-white font-bold overflow-hidden truncate">{title}</Text>
                        <Text className="text-white text-xs">{subtitle}</Text>
                    </View>
                    
                </View>
                
                    <View className="justify-center">
                        <Icon name="plus" color='white' size={20}/>
                    </View>
                
            </View>
        </Pressable>
    )
}