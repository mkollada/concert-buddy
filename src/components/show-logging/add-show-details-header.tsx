import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface AddShowDetailsHeaderProps {
    title: string
    handleSavePress: () => void
    handleCancelPress: () => void
}

const AddShowDetailsHeader: React.FC<AddShowDetailsHeaderProps> = ({
    title, handleSavePress, handleCancelPress
}) => {  

    const router = useRouter()

    return (
        <View className="flex-row items-center justify-between p-2">
            <TouchableOpacity onPress={handleCancelPress} style={{ padding: 10 }}>
                <Ionicons size={24} name='chevron-back'color='white' />
            </TouchableOpacity>
            
            <Text className="text-white font-bold text-lg">{title}</Text>

            <TouchableOpacity 
                onPress={handleSavePress}
                style={{ padding: 10 }}
            >
                <Text className="text-themePurple text-lg">Save</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddShowDetailsHeader