import React from "react";
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

    const handleTextChange = (text: string) => {
        setNotes(text)
    }

    return (
        
            <View className="flex-1 bg-black rounded-t2xl">
                {/* <View className="flex-1 bg-black"> */}
                <EditNotesHeader setModalVisible={setModalVisible}/>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    extraHeight={300}
                    keyboardShouldPersistTaps='handled'
                    className="flex-1 bg-black">
                    <View className='bg-themeGray flex-1 p-4'>
                        <TextInput 
                            className='flex-1 text-2xl text-white' 
                            value={notes} 
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