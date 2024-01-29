import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { useRouter } from "expo-router";
import { updateSupabaseShowItem } from "../../../api";

interface ManagePhotosHeaderProps {
    photoUrls: string[]
    showId: string
    unsavedChanges: boolean
    setUnsavedChanges: (value: boolean) => void
}

const ManagePhotosHeader: React.FC<ManagePhotosHeaderProps> = ({
    photoUrls, showId, unsavedChanges, setUnsavedChanges
}) => {  

    const router = useRouter()

    const handleSave = async () => {
        await updateSupabaseShowItem(showId, 'photoUrls', photoUrls)
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
            
            <Text className="text-white font-bold text-lg">Add Photos</Text>

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

export default ManagePhotosHeader