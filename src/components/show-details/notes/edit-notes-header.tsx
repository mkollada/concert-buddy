import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
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
        console.log('handled')
        router.back()
    }

    return (
        <View className="flex-row items-center justify-between p-2">
            <TouchableOpacity onPress={handleCancel} style={{ padding: 10 }}>
                <Text className="text-white text-lg">Cancel</Text>
            </TouchableOpacity>
            
            <Text className="text-white font-bold text-lg">Notes</Text>

            <TouchableOpacity 
                onPress={handleSave}
                disabled={!unsavedChanges}
                style={{ padding: 10, opacity: unsavedChanges ? 1 : 0.5 }}
            >
                <Text className="text-themePurple text-lg">Save</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EditNotesHeader