import React, { useState } from 'react';
import { Image, View, TouchableOpacity, Button, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface ThumbnailGalleryProps {
    images: string[],
    setImages: React.Dispatch<React.SetStateAction<string[]>>
}

const ThumbnailGallery: React.FC<ThumbnailGalleryProps> = ({ images, setImages }) => {
    const [selectedImages, setSelectedImages] = useState<number[]>([]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {

            let resultUris: string[] = []
            result.assets.forEach(asset => {
                resultUris = [...resultUris, asset.uri]
            })

            setImages([...images, ...resultUris]);
        }
    };

    const toggleSelectImage = (index: number) => {
        if (selectedImages.includes(index)) {
            setSelectedImages(selectedImages.filter(idx => idx !== index));
        } else {
            setSelectedImages([...selectedImages, index]);
        }
    };

    const deleteSelectedImages = () => {
        setImages(images.filter((_, idx) => !selectedImages.includes(idx)));
        setSelectedImages([]);
    };

    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {images.map((imgUri, idx) => (
                <TouchableOpacity key={idx} style={{ width: '33%', padding: 2 }} onPress={() => toggleSelectImage(idx)}>
                    <Image source={{ uri: imgUri }} style={{ width: '100%', height: '100%', borderRadius: 10, opacity: selectedImages.includes(idx) ? 0.5 : 1 }} />
                </TouchableOpacity>
            ))}
            <TouchableOpacity style={{ width: '33%', padding: 2, alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: '#ccc' }} onPress={pickImage}>
                <Text>Add</Text>
            </TouchableOpacity>
            {selectedImages.length > 0 && (
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 10 }}>
                    <Button title="Delete Selected" onPress={deleteSelectedImages} />
                </View>
            )}
        </View>
    );
};

export default ThumbnailGallery;
