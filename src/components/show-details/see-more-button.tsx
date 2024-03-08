import { View, Text, Pressable } from "react-native";
import React from "react";
import Icon from '@expo/vector-icons/FontAwesome';
import { useRouter } from "expo-router";
import { Show } from "../../types/types";

interface SeeMoreButtonProps {
    show: Show
    text: string
    link: string
}

export default function SeeMoreButton({ show, text, link }: SeeMoreButtonProps) {
    
    const router = useRouter()

    const handlePress = () => {
        router.push({
            pathname: `/${link}`,
            params: {
                initialNotes: show.notes,
                showId: show.id
            }
        })
    }
    
    return (
        <Pressable onPress={handlePress} style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1
            }
          ]}>
            <View className="flex-row items-center">
                
                <Text className="text-white text-sm">{text}</Text>
                <View className="p-1">
                    <Icon name='arrow-circle-o-right' size={20} color={'#9069F4'} />
                </View>
            </View>
        </Pressable>

    )
}