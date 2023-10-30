import { View, Text } from "react-native";
import React from "react";
import { JamBaseVenue } from "../../../types/jambase";

interface VenueBlockProps {
    venue: JamBaseVenue
}

export default function VenueBlock({ venue }: VenueBlockProps) {
    return (
            <View className='bg-themeGray p-2'>
                <Text className='text-xl text-white'>{venue.name}</Text>
                <Text className='text-md text-white'>{`${venue.address.addressLocality}, ${venue.address.addressRegion.alternateName}`}</Text>
            </View>
    )
}