import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native";

import { useRouter } from "expo-router";
import { updateSupabaseShowItem } from "../../../api";

interface EditNotesHeaderProps {
    notes: string
    showId: string
    unsavedChanges: boolean
    setUnsavedChanges: (value: boolean) => void
}

const EditNotesHeader: React.FC<EditNotesHeaderProps> = ({
    notes, showId, unsavedChanges, setUnsavedChanges
}) => {  

    const router = useRouter()

    const handleSave = async () => {
        await updateSupabaseShowItem(showId, 'notes', notes)
        setUnsavedChanges(false)
        router.back()
    }

    const handleCancel = () => {
        router.back()
    }

    return (
        <View className="flex-row items-center relative p-2">
            <View className="absolute left-0 ml-4">
                <Button 
                color='white' 
                title="Cancel"
                onPress={handleCancel} />
            </View>
            <View className="flex-1 justify-center items-center">
                <Text className="text-white font-bold text-lg">Notes</Text>
            </View>
            <View className="absolute right-0 mr-4">
                <Button 
                color='#9069F4' 
                title="Save"
                disabled={!unsavedChanges}
                onPress={handleSave} />
            </View>
        </View>
        
    )
}

export default EditNotesHeader