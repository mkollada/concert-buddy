import React, { useState } from "react";
import { View, TextInput, Text, FlatList, StyleSheet, Keyboard, Platform, Alert } from "react-native";
import PageHeader from "../../utils/page-header";

interface ManageSetlistProps {
  setlist: string[];
  setSetlist: (value: string[]) => void;
  setModalVisible: (value: boolean) => void;
}

const ManageSetlist: React.FC<ManageSetlistProps> = ({
  setlist,
  setSetlist,
  setModalVisible,
}) => {
    const [unsavedChanges, setUnsavedChanges] = useState(false)
    const [songToAdd, setSongToAdd] = useState('');
  const [tempSetlist, setTempSetlist] = useState<string[]>(setlist);

  const handleAddSong = () => {
    console.log(songToAdd)
    console.log('hey')
    setTempSetlist([...tempSetlist, songToAdd])
    setSongToAdd('')
    setUnsavedChanges(true)
  };

  const handleSave = () => {
    setSetlist(tempSetlist)
    setUnsavedChanges(false)
    setModalVisible(false)
}

  const renderItem = ({ item }: { item: string }) => (
    <View className="bg-black p-1">
        <View className="bg-themeGray p-2 w-full ">
            <Text className="text-white">- {item}</Text>
        </View>
    </View>
    
  );

  const handleCancel = () => {
    if(unsavedChanges){
        Alert.alert(
            "Unsaved Changes", // Title
            "You have unsaved changes. Are you sure you want to go back without saving?", // Message
            [
                {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
                },
                { text: "Confirm", style: "destructive", onPress: () => setModalVisible(false) },
            ],
            {
                cancelable: true, // Whether to close the dialog on outside touch or not
                onDismiss: () => console.log("Dialog dismissed"), // Callback when the alert is dismissed
            }
            );
    } else {
        setModalVisible(false)
    }
}

  return (
    <View className='flex-1 bg-black'>
        
        <PageHeader
            title="Setlist"
            handleDonePress={handleSave}
            doneText="Save"
            handleCancelPress={handleCancel}
            doneEnabled={unsavedChanges}
        />
        <View className="flex-1 items-center">
            <View className='items-center w-1/2'>
                <FlatList
                    className="w-full"
                    data={tempSetlist}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `song-${index}`}
                    ListFooterComponent={
                    <TextInput
                        className="text-white p-5"
                        value={songToAdd}
                        onChangeText={text => setSongToAdd(text)}
                        onSubmitEditing={() => handleAddSong()}
                        placeholder="Add song..."
                        placeholderTextColor='grey'
                        returnKeyType="done"
                        blurOnSubmit={false}
                    />
                    }
                    // inverted // Invert the list to keep the input field at the bottom
                />
            </View>
        </View>
    </View>
  );
};

export default ManageSetlist;
