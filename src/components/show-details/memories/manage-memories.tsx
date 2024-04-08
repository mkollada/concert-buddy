import React, { useState } from "react";
import { Alert, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PageHeader from "../utils/page-header";
import ManageMemoryBlock from "./manage-memory-block";
import { Memories } from "../../types/types";

interface ManageMemoriesProps {
    memories: Memories
    setMemories: (value: Memories) => void // Updated to accept Memories type
    setModalVisible: (value: boolean) => void
}

const ManageMemories: React.FC<ManageMemoriesProps> = ({
    memories, setMemories, setModalVisible
}) => {
    
    const [tempMemories, setTempMemories] = useState(memories)
    const [unsavedChanges, setUnsavedChanges] = useState(false)
    
    // Function to update a single memory. It takes the key (prompt) and the updated text.
    const handleMemoryUpdate = (prompt: string, newResponse: string) => {
        const updatedMemories = {
            ...tempMemories,
            [prompt]: {
                ...tempMemories[prompt],
                response: newResponse 
            }
        };
        setTempMemories(updatedMemories)
        setUnsavedChanges(true)
    };

    const handleSave = () => {
        setMemories(tempMemories)
        setUnsavedChanges(false)
        setModalVisible(false)
    }

    const handleCancel = () => {
        if(unsavedChanges){
            Alert.alert(
                "Unsaved Changes", // Title
                "You have unsaved changes. Are you sure you want to go back without saving?", // Message
                [
                    {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                    },
                    { text: "Confirm", style: "destructive", onPress: () => setModalVisible(false) },
                ],
                {
                    cancelable: true, // Whether to close the dialog on outside touch or not
                    onDismiss: () => console.log("Dialog dismissed"), // Callback when the alert is dismissed
                }
                );
        } else {
            setModalVisible(false)
        }
    }

    return (
        <View className="flex-1 bg-black rounded-t2xl">
            <PageHeader 
                title='Memories'
                handleDonePress={handleSave}
                doneText="Save"
                handleCancelPress={handleCancel}
                doneEnabled={unsavedChanges}/>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                extraHeight={300}
                keyboardShouldPersistTaps='handled'
                className="flex-1 bg-black">
                <View className="flex-1 items-center">
                {
                    Object.entries(tempMemories).map(([prompt, { color, response }]) => (
                        <View key={prompt} className="flex-1 p-2 w-[85%]">
                            <ManageMemoryBlock
                                key={prompt}
                                prompt={prompt}
                                initialResponse={response}
                                handleMemoryUpdate={handleMemoryUpdate}
                                color={color}
                            />
                        </View>
                    ))
                }
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default ManageMemories;
