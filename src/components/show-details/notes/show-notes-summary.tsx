import { View, Text } from "react-native";
import { Show } from "../../../types/types";
import React from "react";
import SeeMoreButton from "../see-more-button";

interface ShowNotesSummaryProps {
    show: Show
    setModalVisible: (value: boolean) => void
}

export default function ShowNotesSummary({ show, setModalVisible }: ShowNotesSummaryProps) {
    return (
            <View className=''>
                <Text className='text-4xl text-white max-h-[225]'
                    numberOfLines={5}
                    ellipsizeMode="tail">{show.notes}</Text>
                <View className="flex-row justify-end mr-4 pt-4">
                    <SeeMoreButton show={show} text="View All Notes" setModalVisible={setModalVisible} />
                </View>
            </View>
    )
}