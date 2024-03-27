import React from "react";
import { View } from "react-native";
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
    // Function to update a single memory. It takes the key (prompt) and the updated text.
    const handleMemoryUpdate = (prompt: string, newResponse: string) => {
        const updatedMemories = {
            ...memories,
            [prompt]: {
                ...memories[prompt],
                response: newResponse 
            }
        };
        setMemories(updatedMemories);
    };

    const handleDonePress = () => {
        setModalVisible(false)
    }

    const handleCancelPress = () => {
        setModalVisible(false)
    }

    return (
        <View className="flex-1 bg-black rounded-t2xl">
            <PageHeader 
                title='Memories'
                handleDonePress={handleDonePress}
                doneText="Done"
                handleCancelPress={handleCancelPress}/>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                extraHeight={300}
                keyboardShouldPersistTaps='handled'
                className="flex-1 bg-black">
                <View className="flex-1 items-center">
                {
                    Object.entries(memories).map(([prompt, { color, response }]) => (
                        <View className="flex-1 p-2 w-[85%]">
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
