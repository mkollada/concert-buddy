import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface EditNotesHeaderProps {
    handleCancel: () => void
    handleSave: () => void
    unsavedChanges: boolean
}

const EditNotesHeader: React.FC<EditNotesHeaderProps> = ({
    handleCancel, handleSave, unsavedChanges }) => {  

    return (
            <View className="flex-row items-center justify-between p-2">
                <TouchableOpacity onPress={handleCancel} style={{ padding: 10 }}>
                    <AntDesign name="arrowleft" color='white' size={24} />
                </TouchableOpacity>
                
                <Text className="text-white font-bold text-lg">Notes</Text>

                <TouchableOpacity 
                    onPress={handleSave}
                    style={{ padding: 10 }}
                    activeOpacity={unsavedChanges ? 0.5 : 1}
                >
                    <Text style={{ color: unsavedChanges ? '#9069F4' : '#A9A9A9'}}className="text-white text-lg">Save</Text>
                </TouchableOpacity>
            </View>
    )
}

export default EditNotesHeader