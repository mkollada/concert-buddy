import React from "react";
import { Show } from "../../types/types";
import { View, Text } from "react-native";
import { Button } from "react-native";
import { updateSupabaseShow } from "../../api";

interface ShowDetailsHeaderProps {
    show: Show
    showUnsavedChanges: boolean
    setShowUnsavedChanges: (value: boolean) => void
}

const ShowDetailsHeader: React.FC<ShowDetailsHeaderProps> = ({
    show, showUnsavedChanges, setShowUnsavedChanges
}) => {  

    const handleSave = async () => {
        await updateSupabaseShow(show)
        setShowUnsavedChanges(false)
        
    }

    return (
        <View className="flex-row items-center relative p-2">
            <View className="flex-1 justify-center items-center">
                <Text className="font-bold text-lg text-white">{show?.artistName}</Text>
                <Text className="text-xs text-white">{show.date} {"\u00b7"} {show.venue}</Text>
            </View>
            <View className="absolute right-0 mr-4">
                <Button 
                color='#9069F4' 
                title="Save"
                disabled={!showUnsavedChanges}
                onPress={handleSave} />
            </View>
        </View>
        
    )
}

export default ShowDetailsHeader