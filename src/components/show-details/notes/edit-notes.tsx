import React, { useState } from "react";
import { View, TextInput, Platform, KeyboardAvoidingView } from "react-native";
import EditNotesHeader from "./edit-notes-header";

interface EditNotesProps {
    initialNotes: string
    showId: string
}

const EditNotes: React.FC<EditNotesProps> = ({
    initialNotes, showId
}) => {
    const [notes, setNotes] = useState(initialNotes)
    const [unsavedChanges, setUnsavedChanges] = useState(false)

    const handleTextChange = (text: string) => {
        setNotes(text)
        setUnsavedChanges(true)
    }

    return (
        <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
        <View className="flex-1">
            <EditNotesHeader 
                notes={notes} 
                showId={showId} 
                unsavedChanges={unsavedChanges}
                setUnsavedChanges={setUnsavedChanges} />
            <View className='flex-1 p-4 bg-themeGray'>
                <TextInput 
                    className='flex-1 text-2xl text-white bg-themeGray' 
                    value={notes} 
                    onChangeText={handleTextChange}
                    multiline />
            </View>
        </View>
        </KeyboardAvoidingView>
    )
}

export default EditNotes