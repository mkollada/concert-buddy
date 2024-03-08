import { View, Text, Pressable, Dimensions } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Show } from "../../types/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { Divider } from "react-native-elements";

interface ExtraActionsModalProps {
    setActionModalVisible: (value: boolean) => void
}

export default function ExtraActionsModal({ 
    setActionModalVisible
}: ExtraActionsModalProps) {

    const {height}  = Dimensions.get('screen')

    const handleCancel = () => {
        setActionModalVisible(false)
    }

    return (
        <View>
            <View className="h-[65%]" />
            <View className="bg-themeGray mx-4 rounded-2xl">
                <TouchableOpacity>
                    <View className="justify-between p-4 flex-row">
                        <Text className='text-white text-lg'>Edit Entry</Text>
                        <Feather name="edit" size={24} color='white' />
                    </View>
                </TouchableOpacity>
                <Divider className="opacity-50"/>
                <TouchableOpacity>
                    <View className="justify-between p-4 flex-row">
                        <Text className='text-white text-lg'>Delete Entry</Text>
                        <Feather name="delete" size={24} color='white' />
                    </View>
                </TouchableOpacity>
            </View>
            <View className="h-[2%]" />
            <Pressable onPress={handleCancel}>
                <View className="bg-themeGray mx-4 rounded-2xl items-center">
                    <TouchableOpacity>
                        <View className="flex-row">
                            <Text className='text-white text-lg p-4'>Cancel</Text>
                        </View>    
                    </TouchableOpacity>
                </View>
            </Pressable>
        </View>
        
    )
}