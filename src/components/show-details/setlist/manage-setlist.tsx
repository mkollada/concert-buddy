import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import PageHeader from "../../utils/page-header";
import { ScrollView } from "react-native-gesture-handler";

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
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [songToAdd, setSongToAdd] = useState("");
  const [tempSetlist, setTempSetlist] = useState<string[]>(setlist);

  const handleAddSong = () => {
    setTempSetlist((prevList) => [...prevList, songToAdd]);
    setSongToAdd("");
    setUnsavedChanges(true);
  };

  const handleDelete = (index: number) => {
    setTempSetlist((prevList) => prevList.filter((_, idx) => idx !== index));
    setUnsavedChanges(true);
  };

  const handleDragEnd = ({ data }: { data: string[] }) => {
    setTempSetlist(data);
    setUnsavedChanges(true);
  };

  const handleCancel = () => {
    if (unsavedChanges) {
      Alert.alert(
        "Unsaved Changes",
        "You have unsaved changes. Are you sure you want to go back without saving?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "Confirm", style: "destructive", onPress: () => setModalVisible(false) },
        ],
        {
          cancelable: true,
          onDismiss: () => console.log("Dialog dismissed"),
        }
      );
    } else {
      setModalVisible(false);
    }
  };

  const renderItem = ({ item, index }: {item: string, index: number}) => (
    // <View className={`bg-black p-1 ${isActive ? 'bg-gray-500' : ''}`}>
      <View className="flex-row items-center justify-between bg-themeGray p-2">
        <Text className="text-white flex-1">- {item}</Text>
        <TouchableOpacity onPress={() => handleDelete(tempSetlist.indexOf(item))} style={{ padding: 10 }}>
          <Text style={{ color: 'red' }}>Delete</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onLongPress={drag} style={{ padding: 10 }}>
          <Text style={{ color: 'blue' }}>Drag</Text>
        </TouchableOpacity> */}
      </View>
    // </View>
  );

  return (
    <View className='flex-1 bg-black'>
      <PageHeader
        title="Setlist"
        handleDonePress={() => {
          setSetlist(tempSetlist);
          setUnsavedChanges(false);
          setModalVisible(false);
        }}
        doneText="Save"
        handleCancelPress={handleCancel}
        doneEnabled={unsavedChanges}
      />
      <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <FlatList
        data={tempSetlist}
        keyExtractor={(item, index) => `song-${index}`}
        renderItem={renderItem}
        ListFooterComponent={
          <TextInput
            className="text-white p-5"
            value={songToAdd}
            onChangeText={setSongToAdd}
            onSubmitEditing={handleAddSong}
            placeholder="Add song..."
            placeholderTextColor="grey"
            returnKeyType="done"
            blurOnSubmit={false}
          />
        }
      /> 
      </KeyboardAvoidingView>
      
    </View>
  );
};

export default ManageSetlist;
