import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';

import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Button,
    Platform,
    UIManager,
    LayoutAnimation,
    TextInput,
    KeyboardAvoidingView
  } from 'react-native';

// import { TextInput } from 'react-native-gesture-handler';

import { Text, View } from '../components/Themed';

import Icon from '@expo/vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';
import { Rating } from 'react-native-ratings';

type AccordionHeaderIconNames = 'chevron-up' | 'chevron-down' | 'plus-circle' | 'close'

type AccordionItemPros = PropsWithChildren<{
  title: string;
  headerIcons: AccordionHeaderIconNames[];
}>;

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

// Make header tuple type?
function AccordionItem({ children, title, headerIcons }: AccordionItemPros): JSX.Element {
    const [ expanded, setExpanded ] = useState(false);
    const [ optionalHeaderText, setOptionalHeaderText ] = useState('')

    function toggleItem() {
        setExpanded(!expanded);
    }

    const body = <View style={styles.accordBody}>{ children }</View>;

    return (
        <View style={styles.accordContainer}>
        <TouchableOpacity style={styles.accordHeader} onPress={ toggleItem }>
            <Text style={styles.accordTitle}>{ title }</Text>
            <Text id='optionalHeaderText'>{optionalHeaderText}</Text>
            {/* <Icon name={ expanded ? 'chevron-up' : 'chevron-down' } */}
            <Icon name={ expanded ? headerIcons[0] : headerIcons[1] }
                size={20} color="#bbb" />
        </TouchableOpacity>
        { expanded && body }
        </View>
    );
}

function selectDate( date: object ) {
    console.log(date)
}

// function editAccordionOptionalHeaderText( text: string ){
//     set
// }


export default function LogShowAccordion() {
    return (
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.container}>
            <AccordionItem title="Artist Name" headerIcons={['chevron-up','chevron-down']}>
                <TextInput 
                    style={styles.textSmall} 
                    placeholder='Enter The Artists Name'
                    returnKeyType='done'
                    // onSubmitEditing=
                />
            </AccordionItem>
            <AccordionItem title="Date" headerIcons={['close','plus-circle']}>
                <Calendar theme={styles.calendar} onDayPress={ day => { console.log('selected day', typeof day)}}          >
                </Calendar>
            </AccordionItem>
            <AccordionItem title="Venue" headerIcons={['chevron-up','chevron-down']}>
                <TextInput style={styles.textSmall} placeholder='Enter Venue Name'></TextInput>
            </AccordionItem>
            <AccordionItem title="Rating" headerIcons={['chevron-up','chevron-down']}>
                <View style={styles.ratingView}>
                    <Text>Overall Show Rating</Text>
                    <Rating 
                        ratingColor='yellow'
                        jumpValue={1}
                        fractions={false} 
                        type='custom' 
                        startingValue={0}
                        ratingBackgroundColor='white'
                        tintColor='black'
                        style={styles.rating}
                    />
                </View>
                <View style={styles.ratingView}>
                    <Text>Stage Presence</Text>
                    <Rating 
                        ratingColor='yellow'
                        jumpValue={1}
                        fractions={false} 
                        type='custom' 
                        startingValue={0}
                        ratingBackgroundColor='white'
                        tintColor='black'
                        style={styles.rating}
                    />
                </View>
                <View style={styles.ratingView}>
                    <Text>Musicality</Text>
                    <Rating 
                        ratingColor='yellow'
                        jumpValue={1}
                        fractions={false} 
                        type='custom' 
                        startingValue={0}
                        ratingBackgroundColor='white'
                        tintColor='black'
                        style={styles.rating}
                    />
                </View>
                <View style={styles.ratingView}>
                    <Text>Production</Text>
                    <Rating 
                        ratingColor='yellow'
                        jumpValue={1}
                        fractions={false} 
                        type='custom' 
                        startingValue={0}
                        ratingBackgroundColor='white'
                        tintColor='black'
                        style={styles.rating}
                    />
                </View>
            </AccordionItem>
            <AccordionItem title="Photos" headerIcons={['chevron-up','chevron-down']}>
                <Text style={styles.textSmall}>Select Photos</Text>
            </AccordionItem>
            <AccordionItem title="Memories" headerIcons={['chevron-up','chevron-down']}>
                <Text style={styles.textSmall}>What mems did yo have?</Text>
            </AccordionItem>
            <AccordionItem title="Notes" headerIcons={['chevron-up','chevron-down']}>
                <KeyboardAvoidingView 
                    // style={styles.keyboardAvoid} 
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
                >   
                    <View>
                        <TextInput 
                            style={styles.textSmall} 
                            placeholder='Enter some notes from the show...'
                            returnKeyLabel='Enter'
                        />
                    </View>
                    
                </KeyboardAvoidingView>
            </AccordionItem>
          </ScrollView>
        </SafeAreaView>
      );
}




