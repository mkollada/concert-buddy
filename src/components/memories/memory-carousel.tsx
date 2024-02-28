import React from "react";
import Carousel from 'react-native-reanimated-carousel';
import { View } from "react-native";
import { Dimensions } from "react-native";
import { Memories, Show } from "../../types/types";
import MemoryBlock from "./memory-block";

interface MemoryCarouselProps {
    show: Show;
    setShow: (value: Show) => void
}

const MemoryCarousel: React.FC<MemoryCarouselProps> = ({ show, setShow }) => {
    const width = Dimensions.get('window').width;
    
    const memories: Memories = show.memories

    const memoriesArray = memories ? Object.entries(memories) : []

    if (memoriesArray.length === 0) {
        return <></>;
    }

    return (
        <View className="flex-column py-5 items-center">
            <Carousel
                loop={false}
                width={5*width/6}
                height={3 * width / 7}
                data={memoriesArray}
                renderItem={({ item }) => {
                    // Use the MemoryBlock component to render each memory
                    return (
                        <View className="flex-1 items-center">
                            <MemoryBlock prompt={item[0]} initialResponse={item[1]} show={show} setShow={setShow}/>
                        </View>
                    );
                }}
            />
        </View>
    );
}

export default MemoryCarousel;
