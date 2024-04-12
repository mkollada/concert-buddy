import React, { useState } from "react";
import { View, TextInput, Text, FlatList, StyleSheet, Keyboard, Platform, Alert, Modal } from "react-native";
import PageHeader from "../../utils/page-header";
import { SearchArtistDropdown } from "../../find-show/artists/search-artist";
import { EditItem } from "../../show-logging/add-show-details-components";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ManageSupportingActsProps {
  supportingActs: [string, string][];
  setSupportingActs: (value: [string, string][]) => void;
  setModalVisible: (value: boolean) => void;
}

const ManageSupportingActs: React.FC<ManageSupportingActsProps> = ({
  supportingActs,
  setSupportingActs,
  setModalVisible,
}) => {
    const [unsavedChanges, setUnsavedChanges] = useState(false)
    const [actToAdd, setActToAdd] = useState<string>('')
    const [tempSupportingActs, setTempSupportingActs] = useState<[string, string][]>(supportingActs);
    const [artistModalVisible, setArtistModalVisible] = useState(false)

  const handleAddAct = (
    artistId: string,
    artistName: string,
    artistImageUri: string,
    artistSpotifyUrl: string
  ) => {

    setTempSupportingActs([...tempSupportingActs, [artistId, artistName]])
    setUnsavedChanges(true)
    setArtistModalVisible(false)
  };

  const handleAddCustomAct = (artistName: string) => {
    setTempSupportingActs([...tempSupportingActs, ['', artistName]])
    setArtistModalVisible(false)
    setUnsavedChanges(true)
  }

  const handleSave = () => {
    setSupportingActs(tempSupportingActs)
    setUnsavedChanges(false)
    setModalVisible(false)
}

  const renderItem = ({item }: {item: [artistId: string, artistName: string] }) => (
    <View className="bg-black p-1">
        <View className="bg-themeGray p-2 w-full ">
            <Text className="text-white">- {item[1]}</Text>
        </View>
    </View>
    
  );

  const handleArtistModalCancel = () => {
    setArtistModalVisible(false)
  }

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
            title="Supporting Acts"
            handleDonePress={handleSave}
            doneText="Save"
            handleCancelPress={handleCancel}
            doneEnabled={unsavedChanges}
        />
        <View className="flex-1 items-center">
            
            <View className='items-center w-1/2'>
                <FlatList
                    className="w-full"
                    data={tempSupportingActs}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `song-${index}`}
                    ListFooterComponent={
                        
                        <TouchableOpacity className="items-center" onPress={() => setArtistModalVisible(true)}>
                        <Text className="underline text-themePurple">Add Supporting Act</Text>
                        </TouchableOpacity>

                    }
                    // inverted // Invert the list to keep the input field at the bottom
                />
                
            </View>
            <View className="flex-row text-white">
                        
                        
                    </View>
            <Modal
                animationType="slide"
                visible={artistModalVisible}
                transparent={false}
                onRequestClose={() => {
                //   Alert.alert('Modal has been closed.')
                setArtistModalVisible(false)
                }}>
                <View className="flex-1 bg-black">
                    <View className='h-[3%]'/>
                    <PageHeader
                        title="Add Supporting Act" 
                        doneEnabled={false} 
                        doneText="" 
                        handleCancelPress={handleArtistModalCancel} 
                        handleDonePress={()=>{}}/>
                    <SearchArtistDropdown 
                        handleArtistSelected={handleAddAct}
                        handleCustomArtistSelected={handleAddCustomAct} 
                    />
                </View>
                
            </Modal>
        </View>
    </View>
  );
};

export default ManageSupportingActs;
