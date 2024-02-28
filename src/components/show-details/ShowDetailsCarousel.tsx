import React, { useEffect, useState } from "react";
import Carousel from 'react-native-reanimated-carousel';
import { View } from "react-native";
import { Dimensions, Image } from "react-native";
import { Show } from "../../types/types";
import { supabase } from "../../utils/supabase";

interface ShowDetailsCarouselProps {
    show: Show
}

const ShowDetailsCarousel: React.FC<ShowDetailsCarouselProps> = ({ show }) => {
    // const [width, setWidth] = useState(100);
    const width = Dimensions.get('window').width;

    const [publicUrls, setPublicUrls] = useState<string[]>([])

    useEffect(() => {
        if (show.photoUrls.length === 0) {
            setPublicUrls([
                show.artistImageUri
            ])
        } else {
            const uris = show.photoUrls
            // uris.forEach( uri => {
            //     const response = supabase.storage.from('show_photos').getPublicUrl(uri.split('show_photos/')[1]);
            //     publicUrls.push(response.data.publicUrl)
    
            // })

            setPublicUrls(show.photoUrls)

        }

        console.log(publicUrls)

    }, [show])



    return (

        <View className="flex-column py-5 items-center">
            <Carousel
                loop={false}
                width={width}
                height={4*width/7}
                data={publicUrls}
                onSnapToItem={(index) => console.log('current index:', index, publicUrls[index])}
                renderItem={({ index }) => {
                    return (
                      <View className="flex-1">
                          <Image source={{ uri: publicUrls[index]}} className='w-full h-full rounded-2xl' />
                      </View>
                    );
                  }}
            />
        </View>
    )

    
}

export default ShowDetailsCarousel
