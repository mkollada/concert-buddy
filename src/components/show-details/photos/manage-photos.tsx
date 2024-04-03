import React, { useState } from "react";
import { Alert, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ManagePhotosHeader from "./manage-photos-header";
import ManagePhotosThumbnailGallery from "./manage-photos-thumbnail-gallery";
import PageHeader from "../../utils/page-header";

interface ManagePhotosProps {
    photoUrls: string[],
    setPhotoUrls: (value: string[]) => void
    setModalVisible: (value: boolean) => void
}

const ManagePhotos: React.FC<ManagePhotosProps> = ({
    photoUrls, setPhotoUrls, setModalVisible
}) => {

    const [tempPhotoUrls, setTempPhotoUrls] = useState(photoUrls)
    const [unsavedChanges, setUnsavedChanges] = useState(false)

    const handleSave = () => {
        setPhotoUrls(tempPhotoUrls)
        setUnsavedChanges(false)
        setModalVisible(false)
    }

    const handleSetTempPhotoUrls = (tempPhotoUrls: string[]) => {
        setTempPhotoUrls(tempPhotoUrls)
        setUnsavedChanges(true)
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
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            extraHeight={100}
            keyboardShouldPersistTaps='handled'
            className="flex-1 bg-black">
            <View className="flex-1 bg-black">
                {/* <ManagePhotosHeader handleDone={handleDone} /> */}
                <PageHeader 
                    title="Manage Photos" 
                    handleDonePress={handleSave} 
                    doneText="Save"
                    handleCancelPress={handleCancel} 
                    doneEnabled={unsavedChanges}/>
                <ManagePhotosThumbnailGallery photoUrls={tempPhotoUrls} setPhotoUrls={handleSetTempPhotoUrls}/>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default ManagePhotos