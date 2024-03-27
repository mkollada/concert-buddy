import React from "react";
import { View, Text} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EditNotesHeader from "./edit-notes-header";

interface ViewAllNotesProps {
    notes: string
    setModalVisible: (value: boolean) => void
}

const ViewAllNotes: React.FC<ViewAllNotesProps> = ({
    notes, setModalVisible
}) => {

    return (
        
            <View className="flex-1 bg-black rounded-t2xl">
                {/* <View className="flex-1 bg-black"> */}
                <EditNotesHeader setModalVisible={setModalVisible}/>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    extraHeight={300}
                    keyboardShouldPersistTaps='handled'
                    className="flex-1 bg-black">
                    <View className='flex-1 p-4'>
                        <Text className='flex-1 text-2xl text-white'>{notes}</Text>
                    </View>
                </KeyboardAwareScrollView>
                {/* </View> */}
            </View>
        
    )
}

export default ViewAllNotes