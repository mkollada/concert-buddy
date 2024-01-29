import React, { useState } from "react";
import { View, Text} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ManagePhotosHeader from "./manage-photos-header";
import { Show } from "../../../types/types";
import ManagePhotosThumbnailGallery from "./manage-photos-thumbnail-gallery";

interface ManagePhotosProps {
    show: Show
}

const ManagePhotos: React.FC<ManagePhotosProps> = ({
    show
}) => {
    const [photoUrls, setPhotoUrls] = useState(show.photoUrls)
    const [unsavedChanges, setUnsavedChanges] = useState(false)

    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            extraHeight={100}
            keyboardShouldPersistTaps='handled'
            className="flex-1">
            <View className="flex-1">
                <ManagePhotosHeader 
                    photoUrls={photoUrls} 
                    showId={show.id} 
                    unsavedChanges={unsavedChanges}
                    setUnsavedChanges={setUnsavedChanges} />
                <ManagePhotosThumbnailGallery images={photoUrls} setImages={setPhotoUrls}/>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default ManagePhotos