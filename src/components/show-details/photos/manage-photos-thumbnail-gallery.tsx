import React, { useState } from 'react';
import { Image, View, TouchableOpacity, Button, Text, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker'

interface ThumbnailGalleryProps {
    photoUrls: string[],
    setPhotoUrls: (value: string[]) => void
}

const ThumbnailGallery: React.FC<ThumbnailGalleryProps> = ({ photoUrls, setPhotoUrls }) => {
    const [selectedImages, setSelectedImages] = useState<number[]>([]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true
        });

        if (!result.canceled) {
            let newPhotoUrls: string[] = []
            result.assets.forEach(asset => {
                newPhotoUrls = [...newPhotoUrls, asset.uri]
            })
            setPhotoUrls([...photoUrls, ...newPhotoUrls])          
        }
    };

    const toggleSelectImage = (index: number) => {
        if (selectedImages.includes(index)) {
            setSelectedImages(selectedImages.filter(idx => idx !== index));
        } else {
            setSelectedImages([...selectedImages, index]);
        }
    };

    const deleteSelectedImages = async () => {
        const newPhotoUrls = photoUrls.filter((_, idx) => !selectedImages.includes(idx));
        setPhotoUrls(newPhotoUrls);

        setSelectedImages([]);
    };
    

    return (
        <View className='flex-1'>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {photoUrls.map((imgUri, idx) => (
                    <Pressable key={idx} className="w-1/3 aspect-square p-1"  onPress={() => toggleSelectImage(idx)}>
                        <Image source={{ uri: imgUri }} className={`w-full h-full rounded-lg ${selectedImages.includes(idx) ? 'opacity-50' : 'opacity-100'}`} />
                    </Pressable>
                ))}
                <TouchableOpacity className="w-1/3 aspect-square p-1 items-center justify-center border-2 border-dashed border-gray-300" onPress={pickImage}>
                    <Text className='text-white font-bold text-4xl'>+</Text>
                </TouchableOpacity>
            </View>
            <View>
                {selectedImages.length > 0 && (
                    <View className='p-5'>
                        <Button color="red" title="Delete Selected" onPress={deleteSelectedImages} />
                    </View>
                )}
            </View>
        </View>   
    )
}

export default ThumbnailGallery;
