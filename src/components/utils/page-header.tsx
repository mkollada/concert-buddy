import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface PageHeaderProps {
    title: string
    handleDonePress: () => void
    doneText: string
    handleCancelPress: () => void
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title, handleDonePress, doneText, handleCancelPress
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
            >
                <Text className="text-themePurple text-lg">{doneText}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PageHeader