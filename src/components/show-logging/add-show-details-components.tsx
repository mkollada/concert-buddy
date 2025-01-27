
import React from "react";
import { Pressable, StyleSheet, TouchableOpacity, } from "react-native";
import { AirbnbRating } from 'react-native-ratings';
import { Text, View } from 'react-native';
import EmojiRatingBar from "../utils/emoji-rating-bar";

import { AntDesign } from "@expo/vector-icons";
import StarRatingBar from "../utils/star-rating-bar";

function isAirbnbRatingComponent(component: React.ReactNode) {
    return component instanceof AirbnbRating;
}

interface EditItemProps {
    title: string
    subtitle: string
    setModalVisible: ((value: boolean) => void) | null
}

export const EditItem: React.FC<EditItemProps> = (
    {title, subtitle, setModalVisible}
) => {

    let plusActive = false

    if(setModalVisible){
        plusActive = true
    } 

    const handlePlusPress = () => {
        if(setModalVisible){
            setModalVisible(true)
        }
    }
    
    return (
        <View className='flex-row justify-between p-3'>
            <Text className="text-white text-lg">{ title }</Text>
            <View className="flex-1 justify-center items-end pr-4">
                <Text className="text-white text-right">{ subtitle }</Text>
            </View>
            <View className="justify-center">
                <Pressable onPress={handlePlusPress}
                    disabled={!plusActive}
                    style={({ pressed }) => [
                    {
                        opacity: plusActive ? 1 : 0, // Invisible when not active
                    }
                    ]}
                    >
                {({ pressed }) => (
                    <AntDesign
                    name="plus"
                    size={20}
                    light
                    color="white"
                    style={{ 
                        marginRight: 15, 
                        opacity: pressed ? 0.5 : 1
                        }}
                    />
                )}
                </Pressable>
            </View>
                   
        </View>
            
    )
}


interface AccordionEmojiRatingProps {
    title: string
    setRating: (value: number) => void
    rating: number | null
    editEnabled: boolean
}

export const AccordionEmojiRating: React.FC<AccordionEmojiRatingProps> = (
    {title, setRating, rating, editEnabled}
) => {
    return (
        <View >
             <View className='flex-row justify-between p-3'>
                <Text className="text-white text-lg">{ title }</Text>
            </View>
            <View>
                <EmojiRatingBar rating={rating} setRating={setRating} editEnabled={editEnabled}/>
            </View>
        </View>
       
    )
}

interface AccordionStarRatingProps {
    title: string
    setRating: (value: number) => void
    rating: number
    editEnabled: boolean
}

export const AccordionStarRating: React.FC<AccordionStarRatingProps> = (
    {title, setRating, rating, editEnabled}
) => {
    return (
        <View >
             <View className='flex-row justify-between p-3'>
                <Text className="text-white text-lg">{ title }</Text>
            </View>
            <View>
                <StarRatingBar rating={rating} setRating={setRating} editEnabled={editEnabled}/>
            </View>
        </View>
       
    )
}

// interface AccordionWithRatingsProps {
//     title: string
//     headerIcons: string[]
//     setOverallRating: (value: React.SetStateAction<number>) => void
//     setMusicalityRating: (value: React.SetStateAction<number>) => void
//     setProductionRating: (value: React.SetStateAction<number>) => void
//     setStagePresenceRating: (value: React.SetStateAction<number>) => void
// }

// export const AccordionWithRatings: React.FC<AccordionWithRatingsProps> = ( {
//     title, 
//     headerIcons,
//     setOverallRating,
//     setMusicalityRating,
//     setProductionRating,
//     setStagePresenceRating
// }
// ) => {
//     const [isCollapsed, setIsCollapsed] = useState(true)
//     const [overallRatingHeader, setOverallRatingHeader] = useState(0)
//     const [overallRatingBody, setOverallRatingBody] = useState(0)
//     const [musicalityRating, setMusicalityRatingInner] = useState(0)
//     const [stagePresenceRating, setStagePresenceRatingInner] = useState(0)
//     const [productionRating, setProductionRatingInner] = useState(0)


//     const handleAccordionToggle = () =>  {
//         setIsCollapsed(!isCollapsed)
//     }

//     const handleBodyOverallRatingChange = (newRatingBody: React.SetStateAction<number>) => {
//         setOverallRatingHeader(newRatingBody)
//         setOverallRatingBody(newRatingBody)
//         setOverallRating(newRatingBody)
//     }

//     const handleHeaderOverallRatingChange = (newRatingHeader: React.SetStateAction<number>) => {
//         setOverallRatingHeader(newRatingHeader)
//         setOverallRatingBody(newRatingHeader)
//         setOverallRating(newRatingHeader)
//     }

//     const handleStagePresenceRatingChange =  (newRating: React.SetStateAction<number>) => {
//         setStagePresenceRating(newRating)
//         setStagePresenceRatingInner(newRating)
//     }

//     const handleMusicalityRatingChange =  (newRating: React.SetStateAction<number>) => {
//         setMusicalityRating(newRating)
//         setMusicalityRatingInner(newRating)
//     }

//     const handleProductionRatingChange =  (newRating: React.SetStateAction<number>) => {
//         setProductionRating(newRating)
//         setProductionRatingInner(newRating)
//     }

//     return (
//         <View>
//             <TouchableOpacity style={styles.accordHeader} onPress={ handleAccordionToggle }>
//                 <AccordionHeaderWithProp 
//                     title={title} 
//                     optionalComponent={<AirbnbRating 
//                         selectedColor='yellow'
//                         size={25}
//                         defaultRating={overallRatingHeader}
//                         onFinishRating={handleHeaderOverallRatingChange}
//                         showRating={false}
//                         ratingContainerStyle={styles.ratingContainer}
//                         starContainerStyle={styles.starContainer}
//                     />}
//                     headerIcons={headerIcons} 
//                     isCollapsed={isCollapsed} />
//             </TouchableOpacity>
//             <Collapsable collapsed={isCollapsed}>
//             <View style={styles.ratingView}>
//                     <Text>Overall Show Rating</Text>
//                     <AirbnbRating 
//                         selectedColor='yellow'
//                         defaultRating={overallRatingBody}
//                         onFinishRating={handleBodyOverallRatingChange}
//                         showRating={false}
//                         ratingContainerStyle={styles.ratingContainer}
//                         starContainerStyle={styles.starContainer}
//                     />
//                 </View>
//                 <View style={styles.ratingView}>
//                     <Text>Stage Presence</Text>
//                     <AirbnbRating 
//                         selectedColor='yellow'
//                         showRating={false}
//                         defaultRating={stagePresenceRating}
//                         onFinishRating={handleStagePresenceRatingChange}
//                         ratingContainerStyle={styles.ratingContainer}
//                         starContainerStyle={styles.starContainer}
//                     />
//                 </View>
//                 <View style={styles.ratingView}>
//                     <Text>Musicality</Text>
//                     <AirbnbRating 
//                         selectedColor='yellow'
//                         showRating={false}
//                         defaultRating={musicalityRating}
//                         onFinishRating={handleMusicalityRatingChange}
//                         ratingContainerStyle={styles.ratingContainer}
//                         starContainerStyle={styles.starContainer}
//                     />
//                 </View>
//                 <View style={styles.ratingView}>
//                     <Text>Production</Text>
//                     <AirbnbRating 
//                         selectedColor='yellow'
//                         showRating={false}
//                         defaultRating={productionRating}
//                         onFinishRating={handleProductionRatingChange}
                        
//                         ratingContainerStyle={styles.ratingContainer}
//                         starContainerStyle={styles.starContainer}
//                     />
//                 </View>
//             </Collapsable>
//         </View>
//     )
// }
