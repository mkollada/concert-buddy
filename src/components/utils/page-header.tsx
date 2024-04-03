import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface PageHeaderProps {
    title: string
    handleDonePress: () => void
    doneText: string
    handleCancelPress: () => void
    doneEnabled: boolean
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title, handleDonePress, doneText, handleCancelPress, doneEnabled
}) => {  

    const router = useRouter()

    return (
        <View className="flex-row items-center justify-between p-2">
            <TouchableOpacity onPress={handleCancelPress} style={{ padding: 10 }}>
                <Ionicons size={24} name='arrow-back'color='white' />
            </TouchableOpacity>
            
            <Text className="text-white font-bold text-lg">{title}</Text>

            <TouchableOpacity 
                onPress={handleDonePress}
                style={{ padding: 10 }}
                disabled={!doneEnabled}
            >
                <Text style={{ color: doneEnabled ? '#9069F4' : '#A9A9A9'}} className="text-lg">{doneText}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PageHeader