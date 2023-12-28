import React from "react";
import Carousel from 'react-native-reanimated-carousel';
import { View } from "../Themed";
import { Dimensions, Image } from "react-native";
import { Show } from "../../types/types";
import { supabase } from "../../utils/supabase";

interface ShowDetailsCarouselProps {
    show: Show
}

const ShowDetailsCarousel: React.FC<ShowDetailsCarouselProps> = ({ show }) => {
    // const [width, setWidth] = useState(100);
    const width = Dimensions.get('window').width;
    let publicUrls: string[] = []

    if (show.photoUrls.length === 0) {
        publicUrls = [
            show.artistImageUri
        ]
    } else {
        const uris = show.photoUrls
        uris.forEach( uri => {
            const response = supabase.storage.from('show_photos').getPublicUrl(uri.split('show_photos/')[1]);
            console.log(response.data.publicUrl)
            publicUrls.push(response.data.publicUrl)

        })
    }

    // console.log(publicUrls)

    return (

        <View className="flex-column py-5 items-center">
            <Carousel
                loop={false}
                width={width}
                height={4*width/7}
                data={publicUrls}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => {
                    return (
                      <View className="flex-1">
                          <Image className='h-[100%] rounded-2xl' source={{
                            uri: publicUrls[index]
                          }} />
                      </View>
                    );
                  }}
            />
            {/* <Image className='aspect-square w-[100] h-[100]' source={{uri:publicUrls[0]}} /> */}
        </View>
    );

    
}

export default ShowDetailsCarousel
