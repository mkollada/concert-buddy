import React, { useState } from "react";
import { View, TextInput} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            extraHeight={100}
            keyboardShouldPersistTaps='handled'
            className="flex-1">
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
        </KeyboardAwareScrollView>
    )
}

export default EditNotes