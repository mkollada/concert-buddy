import { Calendar } from "react-native-calendars";
import React from 'react';
import { View } from '../../components/Themed';
import { StyleSheet } from "react-native";

interface DatePickerProps {
    setDate: (value: string) => void
}

// TODO parameters should be going through the page not the component
export function DatePicker({ setDate }: DatePickerProps) {

    const handleDateSelect = (submittedDate: {dateString: string }) => {
        setDate(submittedDate.dateString)
    }
    
    return (
        <View>
            <Calendar 
                theme={styles.calendar} 
                onDayPress={handleDateSelect}>
            </Calendar>
        </View>
    )
}

const styles = StyleSheet.create({
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
})