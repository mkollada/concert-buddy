
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, } from "react-native";
import Icon from '@expo/vector-icons/FontAwesome';
import Collapsable from 'react-native-collapsible'
import { Calendar } from "react-native-calendars";
import { AirbnbRating } from 'react-native-ratings';
import { Text, View } from '../components/Themed';
import { TextInput } from "react-native";
import { Button } from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';
import ThumbnailGallery from "./ThumbnailGallery";
import EmojiRatingBar from "./utils/emoji-rating-bar";

function isAirbnbRatingComponent(component: React.ReactNode) {
    return component instanceof AirbnbRating;
}


interface AccordionHeaderNoComponentProps {
    title: string
    subtitle: string
}

export const AccordionHeaderNoComponent: React.FC<AccordionHeaderNoComponentProps> = (
    {title, subtitle}
) => {
    return (
        <View style={styles.accordHeader}>
            <Text style={styles.accordTitle}>{ title }</Text>
            <View style={styles.accordSubtitle}>
                <Text style={styles.textSmall}>{ subtitle }</Text>
            </View>
        </View>
            
    )
}

interface AccordionHeaderWithPropProps {
    title: string
    optionalComponent: React.ReactNode
    headerIcons: string[]
    isCollapsed: boolean
}

const AccordionHeaderWithProp: React.FC<AccordionHeaderWithPropProps> = (
    {title, optionalComponent, headerIcons, isCollapsed}
    ) => {
        return (
            <>             
                <Text style={styles.accordTitle}>{ title }</Text>
                {isAirbnbRatingComponent(optionalComponent) ? (
                    <Collapsable collapsed={!isCollapsed}>
                        {optionalComponent}
                    </Collapsable>
                ) : (
                    <View>
                        {optionalComponent}
                    </View>
                )}
                <Icon name={ isCollapsed ? headerIcons[0] : headerIcons[1] }
                    size={20} color="#bbb" />
            </>
        )
}

interface AccordionEmojiRatingProps {
    title: string
    setRating: (value: number) => void
    rating: number | null
}

export const AccordionEmojiRating: React.FC<AccordionEmojiRatingProps> = (
    {title, setRating, rating}
) => {
    return (
        <View style={styles.accordSubtitle}>
             <View style={styles.accordHeader}>
                <Text style={styles.accordTitle}>{ title }</Text>
            </View>
            <View style={styles.accordSubtitle}>
                <EmojiRatingBar rating={rating} setRating={setRating} />
            </View>
        </View>
       
    )
}

interface AccordionWithBodyTextProps {
    title: string
    headerIcons: string[]
    placeholderText: string
    setValue: (value: string) => void
}

export const AccordionWithBodyText: React.FC<AccordionWithBodyTextProps> = ( 
    {title, 
    headerIcons,
    placeholderText,
    setValue}
) => {
    const [isCollapsed, setIsCollapsed] = useState(true)
    const [submittedText, setSubmittedText] = useState('')
    const [inputText, setInputText] = useState('')

    const handleAccordionToggle = () =>  {
        setIsCollapsed(!isCollapsed)
    }

    const handleInputChange = (text: React.SetStateAction<string>) => {
        setInputText(text)
    }

    const handleSubmittedText = () => {
        setSubmittedText(inputText)
        setValue(inputText)
        setIsCollapsed(true)
    }

    return (
        <View>
            <TouchableOpacity style={styles.accordHeader} onPress={ handleAccordionToggle }>
                <AccordionHeaderWithProp
                    title={title} 
                    optionalComponent={<Text>{submittedText}</Text>} 
                    headerIcons={headerIcons} 
                    isCollapsed={isCollapsed} />
            </TouchableOpacity>
            <Collapsable collapsed={isCollapsed}>
                <TextInput 
                    className='text-white font-medium p-5'
                    placeholder={placeholderText}
                    value={inputText}
                    onChangeText={handleInputChange}
                    onSubmitEditing={handleSubmittedText} 
                    returnKeyType="done"/>
            </Collapsable>
        </View>
    )

}

interface AccordionWithCalendarProps {
    title: string
    headerIcons: string[]
    setDate: (value: string) => void
    date: string
}

export const AccordionWithCalendar: React.FC<AccordionWithCalendarProps> = ({
    title, 
    headerIcons,
    setDate,
    date
}
) => {
    const [isCollapsed, setIsCollapsed] = useState(true)


    const handleAccordionToggle = () =>  {
        setIsCollapsed(!isCollapsed)
    }

    const handleDateSelect = (submittedDate: { dateString: string; }) => {
        // TODO: I would guess there's a better way to do this
        // sets date for accordion header
        setDate(submittedDate.dateString);
        // sets date to be sent up to supabase in parent component
        setIsCollapsed(true); // Close accordion after selecting a date
    };

    return (
        <View>
            <TouchableOpacity style={styles.accordHeader} onPress={ handleAccordionToggle }>
                <AccordionHeaderWithProp
                    title={title} 
                    optionalComponent={<Text>{date}</Text>} 
                    headerIcons={headerIcons} 
                    isCollapsed={isCollapsed} />
            </TouchableOpacity>
            <Collapsable collapsed={isCollapsed}>
                <Calendar 
                    theme={styles.calendar} 
                    onDayPress={handleDateSelect}>
                </Calendar>
            </Collapsable>
        </View>
    )

}

interface AccordionWithRatingsProps {
    title: string
    headerIcons: string[]
    setOverallRating: (value: React.SetStateAction<number>) => void
    setMusicalityRating: (value: React.SetStateAction<number>) => void
    setProductionRating: (value: React.SetStateAction<number>) => void
    setStagePresenceRating: (value: React.SetStateAction<number>) => void
}

export const AccordionWithRatings: React.FC<AccordionWithRatingsProps> = ( {
    title, 
    headerIcons,
    setOverallRating,
    setMusicalityRating,
    setProductionRating,
    setStagePresenceRating
}
) => {
    const [isCollapsed, setIsCollapsed] = useState(true)
    const [overallRatingHeader, setOverallRatingHeader] = useState(0)
    const [overallRatingBody, setOverallRatingBody] = useState(0)
    const [musicalityRating, setMusicalityRatingInner] = useState(0)
    const [stagePresenceRating, setStagePresenceRatingInner] = useState(0)
    const [productionRating, setProductionRatingInner] = useState(0)


    const handleAccordionToggle = () =>  {
        setIsCollapsed(!isCollapsed)
    }

    const handleBodyOverallRatingChange = (newRatingBody: React.SetStateAction<number>) => {
        setOverallRatingHeader(newRatingBody)
        setOverallRatingBody(newRatingBody)
        setOverallRating(newRatingBody)
    }

    const handleHeaderOverallRatingChange = (newRatingHeader: React.SetStateAction<number>) => {
        setOverallRatingHeader(newRatingHeader)
        setOverallRatingBody(newRatingHeader)
        setOverallRating(newRatingHeader)
    }

    const handleStagePresenceRatingChange =  (newRating: React.SetStateAction<number>) => {
        setStagePresenceRating(newRating)
        setStagePresenceRatingInner(newRating)
    }

    const handleMusicalityRatingChange =  (newRating: React.SetStateAction<number>) => {
        setMusicalityRating(newRating)
        setMusicalityRatingInner(newRating)
    }

    const handleProductionRatingChange =  (newRating: React.SetStateAction<number>) => {
        setProductionRating(newRating)
        setProductionRatingInner(newRating)
    }

    return (
        <View>
            <TouchableOpacity style={styles.accordHeader} onPress={ handleAccordionToggle }>
                <AccordionHeaderWithProp 
                    title={title} 
                    optionalComponent={<AirbnbRating 
                        selectedColor='yellow'
                        size={25}
                        defaultRating={overallRatingHeader}
                        onFinishRating={handleHeaderOverallRatingChange}
                        showRating={false}
                        ratingContainerStyle={styles.ratingContainer}
                        starContainerStyle={styles.starContainer}
                    />}
                    headerIcons={headerIcons} 
                    isCollapsed={isCollapsed} />
            </TouchableOpacity>
            <Collapsable collapsed={isCollapsed}>
            <View style={styles.ratingView}>
                    <Text>Overall Show Rating</Text>
                    <AirbnbRating 
                        selectedColor='yellow'
                        defaultRating={overallRatingBody}
                        onFinishRating={handleBodyOverallRatingChange}
                        showRating={false}
                        ratingContainerStyle={styles.ratingContainer}
                        starContainerStyle={styles.starContainer}
                    />
                </View>
                <View style={styles.ratingView}>
                    <Text>Stage Presence</Text>
                    <AirbnbRating 
                        selectedColor='yellow'
                        showRating={false}
                        defaultRating={stagePresenceRating}
                        onFinishRating={handleStagePresenceRatingChange}
                        ratingContainerStyle={styles.ratingContainer}
                        starContainerStyle={styles.starContainer}
                    />
                </View>
                <View style={styles.ratingView}>
                    <Text>Musicality</Text>
                    <AirbnbRating 
                        selectedColor='yellow'
                        showRating={false}
                        defaultRating={musicalityRating}
                        onFinishRating={handleMusicalityRatingChange}
                        ratingContainerStyle={styles.ratingContainer}
                        starContainerStyle={styles.starContainer}
                    />
                </View>
                <View style={styles.ratingView}>
                    <Text>Production</Text>
                    <AirbnbRating 
                        selectedColor='yellow'
                        showRating={false}
                        defaultRating={productionRating}
                        onFinishRating={handleProductionRatingChange}
                        
                        ratingContainerStyle={styles.ratingContainer}
                        starContainerStyle={styles.starContainer}
                    />
                </View>
            </Collapsable>
        </View>
    )
}

interface AccordionWithPhotosProps {
    title: string
    headerIcons: string[]
    setPhotos: (value: ImagePicker.ImagePickerAsset[]) => void
}



export const AccordionWithPhotos: React.FC<AccordionWithPhotosProps> = ( 
    {title, 
    headerIcons,
    setPhotos}
) => {
    const [isCollapsed, setIsCollapsed] = useState(true)
    const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
    
    const pickImageAsync = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsMultipleSelection: true
        });

        if (!result.canceled) {
            setPhotos(result.assets)
            setImages(result.assets)
        } else {
          alert('You did not select any image.');
        }
      };

    const handleAccordionToggle = () =>  {
        setIsCollapsed(!isCollapsed)
        // console.log(isCollapsed)
    }

    return (
        <View className="flex-1">
            <TouchableOpacity style={styles.accordHeader} onPress={ handleAccordionToggle }>
                <AccordionHeaderWithProp
                    title={title} 
                    optionalComponent={<Text></Text>} 
                    headerIcons={headerIcons} 
                    isCollapsed={isCollapsed} />
            </TouchableOpacity>
            <Collapsable collapsed={isCollapsed}>
                <View className="p-2">
                    <Button className="p-2" onPress={pickImageAsync} title='Select Photos'/>
                    <View className='p-2 m-2 justify-center'>
                        <ThumbnailGallery images={images} />
                    </View>
                </View>
            </Collapsable>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    view: {
        flex: 1,
    },
    accordContainer: {
        flex: 1,        paddingBottom: 4,
    },
    accordHeader: {
        padding: 12,
        backgroundColor: '#111',
        color: '#eee',
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    accordTitle: {
        fontSize: 20,
    },
    accordSubtitle: {
        backgroundColor: '#111'
    },
    accordBody: {
        padding: 12,
    },
    textSmall: {
        fontSize: 16,
        color: "white",
        backgroundColor: '#111'
    },
    seperator: {
        height: 12
    },
    calendar: {
        backgroundColor: 'black',
        calendarBackground: 'black',
        monthTextColor: 'white',
        dayTextColor: 'white',
        textDisabledColor: '#eeeeee',
        selectedDayBackgroundColor: 'white',
        selectedDayTextColor: '#ffffff',
        indicatorColor: 'white',

    },
    keyboardAvoid: {
        flex: 1
    },
    ratingContainer: {

    },
    starContainer: {
        
    },
    ratingView: {
        alignItems: 'center'
    },
});
