import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface EditNotesHeaderProps {
    setModalVisible: (value: boolean) => void
}

const EditNotesHeader: React.FC<EditNotesHeaderProps> = ({
    setModalVisible
}) => {  

    const handleDone = () => {
        setModalVisible(false)
    }

    return (
            <View className="flex-row items-center justify-between p-2">
                <TouchableOpacity onPress={handleDone} style={{ padding: 10 }}>
                    <AntDesign name="arrowleft" color='white' size={24} />
                </TouchableOpacity>
                
                <Text className="text-white font-bold text-lg">Notes</Text>

                <TouchableOpacity 
                    onPress={handleDone}
                    style={{ padding: 10 }}
                >
                    <Text className="text-white text-lg">Done</Text>
                </TouchableOpacity>
            </View>
    )
}

export default EditNotesHeader