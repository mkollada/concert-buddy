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

    const handleCancel = () => {
        console.log('handled')
        router.back()
    }

    return (
        <View className="flex-row items-center justify-between p-2">
            <TouchableOpacity className='p-5' onPress={handleCancel}>
                <Text className="text-white text-lg">Back</Text>
            </TouchableOpacity>
            
            <Text className="text-white font-bold text-lg">Manage Photos</Text>

            <View className="p-5">
                <Text className="text-black text-lg">    </Text> 
            </View>
        </View>
    )
}

export default ManagePhotosHeader