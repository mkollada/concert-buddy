import { Image } from "react-native";
import { JamBaseArtist } from "../../../types/jambase";
import { View, Text } from "../../Themed";
import React from "react";


interface ArtistBlockProps {
    artist: JamBaseArtist
}

export default function ArtistBlock({ artist }: ArtistBlockProps) {
    return (
            <View className='rounded-xl'>
              <Image className='h-20 w-full' source={{uri: artist.image}} onError={(error) => console.log("Image error", error)}/>
              <View className="bg-themeGray p-3">
                <Text className='text-xl'>{artist.name}</Text>
              </View>
            </View>
    )
}