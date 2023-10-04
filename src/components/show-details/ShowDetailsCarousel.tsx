import React, { useState } from "react";
import Carousel from 'react-native-reanimated-carousel';
import { Text, View } from "../Themed";
import { Dimensions, Image } from "react-native";

function ShowDetailsCarousel() {
    // const [width, setWidth] = useState(100);
    const width = Dimensions.get('window').width;
    const uris = [
        'https://mcusercontent.com/f89c714d668e98a972a148b5b/images/d8ddef87-b281-b8c5-7b6f-9560c068ba2f.jpeg',
        'https://mcusercontent.com/f89c714d668e98a972a148b5b/images/d8ddef87-b281-b8c5-7b6f-9560c068ba2f.jpeg'
    ]

    return (

        <View className="flex-column p-5 items-center">
            <Carousel
                loop
                width={3*width/4}
                height={width/2}
                data={uris}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => {
                    return (
                      <View className="flex-1">
                          <Image className='h-[100%] rounded-2xl' source={{
                            uri: uris[index]
                          }} />
                      </View>
                    );
                  }}
            />
        </View>
    );

    
}

export default ShowDetailsCarousel
