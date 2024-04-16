import React, { useState } from 'react';
import { Image, View, TouchableOpacity, Button, Text, Pressable, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Get the window width to calculate the size of the thumbnails
const { width } = Dimensions.get('window');
// Assuming there are 3 items per row, calculate the size minus some margin/padding
const ITEM_SIZE = width / 3 - 8; // Adjust the 10 to your actual margin/padding

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
        console.log('gallery')
        console.log(photoUrls)
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
                <View className='flex-row flex-wrap p-2'>
                    {photoUrls.map((imgUri, idx) => (
                        <Pressable className='p-1' key={idx} style={{ width: ITEM_SIZE, height: ITEM_SIZE, }} onPress={() => toggleSelectImage(idx)}>
                            <Image className='w-[100%] h-[100%] rounded-lg' source={{ uri: imgUri }} style={{ opacity: selectedImages.includes(idx) ? 0.5 : 1 }} />
                        </Pressable>
                    ))}
                    <TouchableOpacity className='p-1 items-center justify-center border-2 border-dashed border-gray-300 rounded-lg' style={{ width: ITEM_SIZE, height: ITEM_SIZE }} onPress={pickImage}>
                        <Text className='text-white font-bold text-2xl'>+</Text>
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

