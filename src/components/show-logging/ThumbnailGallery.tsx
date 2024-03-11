import React from 'react';
import { Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface ThumbnailGalleryProps {
    images: ImagePicker.ImagePickerAsset[]
}

const ThumbnailGallery: React.FC<ThumbnailGalleryProps> = ({ images }) => (
    <View className="flex-row flex-wrap">
      {images.map((img, idx) => (
        <View key={idx} className="w-1/3 p-2 aspect-square rounded">
          <Image source={{ uri: img.uri}} className="w-full h-full object-cover rounded"/>
        </View>
      ))}
    </View>
  );

export default ThumbnailGallery;
