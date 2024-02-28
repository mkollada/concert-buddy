import React from 'react';
import { Image, Alert, TouchableOpacity } from 'react-native';
import { Text, View } from "react-native";
import { Show } from "../../types/types";
import { Swipeable } from 'react-native-gesture-handler';
import { deleteSupabaseShow } from '../../api';
import { Link } from 'expo-router';

interface LoggedShowBlockProps {
    show: Show
    setDeleteShowId: (value: string) => void
}

export const LoggedShowBlock: React.FC<LoggedShowBlockProps> = ({ show, setDeleteShowId }) => {

    const rightSwipeActions = () => {
        return (
            <TouchableOpacity
                className=''
                onPress={() => confirmDelete()}
                style={{
                    backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    height: '100%',
                    paddingHorizontal: 20,
                    paddingVertical: 0,
                    marginVertical: 0
                }}
            >
                <Text style={{ color: 'white' }}>
                    Delete
                </Text>
            </TouchableOpacity>
        );
    };

    const onDelete = async () => {
        const {data, error} = await deleteSupabaseShow(show.id)
        if (error) {
          alert('Error deleting row: error')
        } else {
          console.log('Deleted:', data)
          setDeleteShowId(show.id)
        }
      }

    const confirmDelete = () => {
        Alert.alert(
            'Delete Show',
            'Are you sure you want to delete this show?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => onDelete()
                }
            ],
            { cancelable: false }
        );
    };

    return (
        
            
        <View className='py-1'>
            <Swipeable
            renderRightActions={rightSwipeActions}
            onSwipeableOpen={(direction) => {
                if (direction === 'right') {
                    // No additional logic needed here for now
                }
            }}
            >
                <Link href={`/show-details/${show.id}`}>
                    <View className='flex-row'>
                        <View className="px-3 w-18 justify-center">
                            <Text className="text-white font-bold">{show.date.substring(5,7)}.{show.date.substring(8,10)}</Text>
                        </View>
                        <View className='flex-row w-[80%] items-center p-4 rounded-2xl bg-cardGray'>
                            <Image
                                className='aspect-square h-16 px-2 rounded'
                                source={{
                                    uri: show.artistImageUri,
                                }}
                            />
                            <View className="flex-column justify-center px-2">
                                <Text className="text-white font-bold">{show.artistName}</Text>
                                <Text className="text-white">{show.venue}</Text>
                            </View>
                        </View>
                        
                    </View>
                </Link>
            </Swipeable>
        </View>
            
        
    );
}
