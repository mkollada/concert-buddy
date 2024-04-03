import React, { useState } from "react";
import { View, TextInput, Alert} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PageHeader from "../../utils/page-header";

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
                    title="Notes" 
                    handleDonePress={handleSave}
                    doneText="Save"
                    handleCancelPress={handleCancel}
                    doneEnabled={unsavedChanges}/>
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