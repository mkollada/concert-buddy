import React, { useState } from "react";
import { View, TextInput} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EditNotesHeader from "./edit-notes-header";

interface EditNotesProps {
    notes: string
    setNotes: (value: string) => void
    setModalVisible: (value: boolean) => void
}

const EditNotes: React.FC<EditNotesProps> = ({
    notes, setNotes, setModalVisible
}) => {

    const [unsavedChanges, setUnsavedChanges] = useState(false)
    const [tempNotes, setTempNotes] = useState(notes)

    const handleTextChange = (text: string) => {
        setUnsavedChanges(true)
        setTempNotes(text)
    }

    const handleSave = () => {
        setNotes(tempNotes)
        setUnsavedChanges(false)
        setModalVisible(false)
    }

    const handleCancel = () => {
        if(unsavedChanges){

        } else {
            setModalVisible(false)
        }
    }

    return (
        
            <View className="flex-1 bg-black rounded-t2xl">
                {/* <View className="flex-1 bg-black"> */}
                <EditNotesHeader 
                    handleCancel={handleCancel}
                    handleSave={handleSave} 
                    unsavedChanges={unsavedChanges}/>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    extraHeight={300}
                    keyboardShouldPersistTaps='handled'
                    className="flex-1 bg-black">
                    <View className='bg-themeGray flex-1 p-4'>
                        <TextInput 
                            className='flex-1 text-2xl text-white' 
                            value={tempNotes} 
                            onChangeText={handleTextChange}
                            multiline
                            placeholder="Enter notes here..." />
                    </View>
                </KeyboardAwareScrollView>
                {/* </View> */}
            </View>
        
    )
}

export default EditNotes