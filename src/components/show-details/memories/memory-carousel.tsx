import React from "react";
import Carousel from 'react-native-reanimated-carousel';
import { View, Dimensions } from "react-native";
import DisplayMemoryBlock from "./display-memory-block";
import { Show } from "../../../types/types";

interface MemoryCarouselProps {
    show: Show;
}

const MemoryCarousel: React.FC<MemoryCarouselProps> = ({ show }) => {
    const windowWidth = Dimensions.get('window').width;

    // First, convert the memories object to an array, then filter out any entries with an empty response.
    const memoriesArray = Object.entries(show.memories)
        .filter(([_, memoryDetails]) => memoryDetails.response.trim() !== "")
        .map(([prompt, { color, response }]) => ({
            prompt,
            color,
            response
        }));

    if (memoriesArray.length === 0) {
        return null; // Return null or some placeholder for empty state
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', paddingVertical: 20 }}>
            <Carousel
                loop={false}
                width={windowWidth * 0.8} // 80% of window width
                height={windowWidth * 0.4} // Adjust height as needed
                data={memoriesArray}
                renderItem={({ item }) => {
                    const { prompt, color, response } = item;
                    return (
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <DisplayMemoryBlock prompt={prompt} response={response} color={color} />
                        </View>
                    );
                }}
            />
        </View>
    );
}

export default MemoryCarousel;
