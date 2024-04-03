import { View, Text, Pressable, Dimensions, TouchableWithoutFeedback, Alert } from "react-native";
import React from "react";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import { deleteSupabaseShow } from "../../api";

interface ExtraActionsModalProps {
    setActionModalVisible: (value: boolean) => void
    setEditShowModalVisible: (value: boolean) => void
    showId: string
    onEdit: () => void
}

export default function ExtraActionsModal({ 
    setActionModalVisible, setEditShowModalVisible, showId, onEdit
}: ExtraActionsModalProps) {

    const {height}  = Dimensions.get('screen')

    const handleCancel = () => {
        setActionModalVisible(false)
    }

    

    const onDelete = async () => {
        const {data, error} = await deleteSupabaseShow(showId)

        if (error) {
            alert('Error deleting row: error')
        } else {
            router.back()
        }
    }

    const handleDeletePress = () => { 
        Alert.alert(
        "Confirm Delete", // Title
        "Are you sure you want to delete this show?", // Message
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "Delete", style: "destructive", onPress: () => onDelete() },
        ],
        {
          cancelable: true, // Whether to close the dialog on outside touch or not
          onDismiss: () => console.log("Dialog dismissed"), // Callback when the alert is dismissed
        }
      );
    }

    return (
        <View className="flex-1 bg-[#00000099]">
             <TouchableWithoutFeedback className='flex-1' onPress={handleCancel}>
            <View className="h-[65%]" />
            </TouchableWithoutFeedback>
            <View className="bg-themeGray mx-4 rounded-2xl">
                <TouchableOpacity onPress={onEdit}>
                    <View className="justify-between p-4 flex-row">
                        <Text className='text-white text-lg'>Edit Entry</Text>
                        <Feather name="edit" size={24} color='white' />
                    </View>
                </TouchableOpacity>
                <Divider className="opacity-50"/>
                <TouchableOpacity onPress={handleDeletePress}>
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
            <TouchableWithoutFeedback className='flex-1' onPress={handleCancel}>
            <View className="flex-1" />
            </TouchableWithoutFeedback>
        </View>
        
    )
}