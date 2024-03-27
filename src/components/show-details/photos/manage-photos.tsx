import React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ManagePhotosHeader from "./manage-photos-header";
import ManagePhotosThumbnailGallery from "./manage-photos-thumbnail-gallery";

interface ManagePhotosProps {
    photoUrls: string[],
    setPhotoUrls: (value: string[]) => void
    setModalVisible: (value: boolean) => void
}

const ManagePhotos: React.FC<ManagePhotosProps> = ({
    photoUrls, setPhotoUrls, setModalVisible
}) => {

    const handleDone = () => {
        setModalVisible(false)
    }


    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            extraHeight={100}
            keyboardShouldPersistTaps='handled'
            className="flex-1 bg-black">
            <View className="flex-1 bg-black">
                <ManagePhotosHeader handleDone={handleDone} />
                <ManagePhotosThumbnailGallery photoUrls={photoUrls} setPhotoUrls={setPhotoUrls}/>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default ManagePhotos