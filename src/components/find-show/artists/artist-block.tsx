import { Image } from "react-native";
import { JamBaseArtist } from "../../../types/jambase";
import { View, Text } from "react-native";
import React from "react";


interface ArtistBlockProps {
    artist: JamBaseArtist
}

export default function ArtistBlock({ artist }: ArtistBlockProps) {
    return (
            <View className='rounded-xl'>
              <Image className='h-[10vh] w-full rounded-t-xl' source={{uri: artist.image}} onError={(error) => console.log("Image error", error)}/>
              <View className="rounded-b-xl bg-themeGray p-3">
                <Text className='text-xl text-white'>{artist.name}</Text>
              </View>
            </View>
    )
}