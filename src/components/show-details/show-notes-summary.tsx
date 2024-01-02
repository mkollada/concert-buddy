import { View, Text } from "react-native";
import { Show } from "../../types/types";
import React from "react";
import SeeMoreButton from "./see-more-button";

interface ShowNotesSummaryProps {
    show: Show
}

export default function ShowNotesSummary({ show }: ShowNotesSummaryProps) {
    return (
            <View className=''>
                <Text className='text-4xl text-white'>{show.notes}</Text>
                <View className="flex-row justify-end mr-4 pt-2">
                    <SeeMoreButton text="View All Notes" />
                </View>
            </View>
    )
}