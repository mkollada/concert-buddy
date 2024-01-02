import { View, Text } from "react-native";
import React from "react";
import Icon from '@expo/vector-icons/FontAwesome';

interface SeeMoreButtonProps {
    text: string
}

export default function SeeMoreButton({ text }: SeeMoreButtonProps) {
    return (
            
        <View className="flex-row items-center">
            
            <Text className="text-white">{text}</Text>
            <View className="p-1">
                <Icon name='arrow-circle-o-right' size={20} color={'#9069F4'} />
            </View>
        </View>

    )
}