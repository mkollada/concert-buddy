import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { useRouter } from "expo-router";

interface ManagePhotosHeaderProps {
    handleDone: () => void
}

const ManagePhotosHeader: React.FC<ManagePhotosHeaderProps> = ({
    handleDone
}) => {  

    const router = useRouter()

    const handleCancel = () => {
        router.back()
    }

    return (
        <View className="flex-row items-center justify-between p-2">
            <TouchableOpacity className='p-5' onPress={handleCancel}>
                <Text className="text-white text-lg">         </Text>
            </TouchableOpacity>
            
            <Text className="text-white font-bold text-lg">Manage Photos</Text>

            <TouchableOpacity className='p-5' onPress={handleDone}>
                <Text className="text-white text-lg">Done</Text> 
            </TouchableOpacity>
        </View>
    )
}

export default ManagePhotosHeader