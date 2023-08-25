
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, } from "react-native";
import type { PropsWithChildren } from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import Collapsable from 'react-native-collapsible'
import { Calendar } from "react-native-calendars";


import { Text, View } from '../components/Themed';
import { TextInput } from "react-native";

type AccordionHeaderIconNames = 'chevron-up' | 'chevron-down' | 'plus-circle' | 'close'

const AccordionHeader = ({title, submittedText, headerIcons, isCollapsed}
    ) => {
        return (
            <>
                <Text style={styles.accordTitle}>{ title }</Text>
                <Text>{submittedText}</Text>
                <Icon name={ isCollapsed ? headerIcons[0] : headerIcons[1] }
                    size={20} color="#bbb" />
            </>
        )
    }

export const AccordionWithBodyText = ( 
    {title, 
    headerIcons,
    placeholderText}
) => {
    const [isCollapsed, setIsCollapsed] = useState(true)
    const [submittedText, setSubmittedText] = useState('')
    const [inputText, setInputText] = useState('')

    const handleAccordionToggle = () =>  {
        setIsCollapsed(!isCollapsed)
    }

    const handleInputChange = (text) => {
        setInputText(text)
    }

    const handleSubmittedText = () => {
        setSubmittedText(inputText)
        setIsCollapsed(true)
    }

    return (
        <View>
            <TouchableOpacity style={styles.accordHeader} onPress={ handleAccordionToggle }>
                <AccordionHeader title={title} submittedText={submittedText} headerIcons={headerIcons} isCollapsed={isCollapsed} />
            </TouchableOpacity>
            <Collapsable collapsed={isCollapsed}>
                <TextInput 
                    style={styles.textSmall}
                    placeholder={placeholderText}
                    value={inputText}
                    onChangeText={handleInputChange}
                    onSubmitEditing={handleSubmittedText} 
                    returnKeyType="done"/>
            </Collapsable>
        </View>
    )

}

export const AccordionWithCalendar = ( 
    {title, 
    headerIcons}
) => {
    const [isCollapsed, setIsCollapsed] = useState(true)
    const [selectedDate, setSelectedDate] = useState('')
    const [headerText, setHeaderText] = useState('')


    const handleAccordionToggle = () =>  {
        setIsCollapsed(!isCollapsed)
    }

    const handleDateSelect = (date) => {
        setSelectedDate(date.dateString);
        console.log(selectedDate)
        setIsCollapsed(true); // Close accordion after selecting a date
    };

    return (
        <View>
            <TouchableOpacity style={styles.accordHeader} onPress={ handleAccordionToggle }>
                <AccordionHeader title={title} submittedText={selectedDate} headerIcons={headerIcons} isCollapsed={isCollapsed} />
            </TouchableOpacity>
            <Collapsable collapsed={isCollapsed}>
                {/* <TextInput 
                    placeholder={placeholderText}
                    value={inputText}
                    onChangeText={handleInputChange}
                    onSubmitEditing={handleSubmittedText} 
                    returnKeyType="done"/> */}
                <Calendar 
                    theme={styles.calendar} 
                    onDayPress={handleDateSelect}>
                </Calendar>
            </Collapsable>
        </View>
    )

}

// TODO
export const AccordionWithRatings = ( 
    {title, 
    headerIcons,
    placeholderText}
) => {
    const [isCollapsed, setIsCollapsed] = useState(true)
    const [submittedText, setSubmittedText] = useState('')
    const [inputText, setInputText] = useState('')

    const handleAccordionToggle = () =>  {
        setIsCollapsed(!isCollapsed)
    }

    const handleInputChange = (text) => {
        setInputText(text)
    }

    const handleSubmittedText = () => {
        setSubmittedText(inputText)
        setIsCollapsed(true)
    }

    return (
        <View>
            <TouchableOpacity style={styles.accordHeader} onPress={ handleAccordionToggle }>
                <AccordionHeader title={title} submittedText={submittedText} headerIcons={headerIcons} isCollapsed={isCollapsed} />
            </TouchableOpacity>
            <Collapsable collapsed={isCollapsed}>
                <TextInput 
                    style={styles.textSmall}
                    placeholder={placeholderText}
                    value={inputText}
                    onChangeText={handleInputChange}
                    onSubmitEditing={handleSubmittedText} 
                    returnKeyType="done"/>
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
    accordBody: {
        padding: 12,
    },
    textSmall: {
        fontSize: 16,
        color: "white",
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
    rating: {
        backgroundColor: '#000000'
    },
    ratingView: {
        alignItems: 'center'
    },
});
