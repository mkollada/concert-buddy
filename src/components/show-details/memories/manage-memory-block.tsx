import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Show } from '../../../types/types';

interface ManageMemoryBlockProps {
    prompt: string
    initialResponse: string
    handleMemoryUpdate: (prompt: string, text: string) => void
    color: string

}

const ManageMemoryBlock = ({prompt, initialResponse, handleMemoryUpdate, color}: ManageMemoryBlockProps) => {
  const [response, setResponse] = useState(initialResponse)

  const handleTextChange = (text: string) => {
    setResponse(text)
    handleMemoryUpdate(prompt,text)
  }
  
  return (
    <View className={`flex-1 rounded-2xl py-4 px-8`} style={{backgroundColor: color}}>
        <View className='flex-1 pb-4'>
            <Text className='text-white font-bold'>{prompt}</Text>
        </View>
        <View className={`bg-black p-3 justify-center flex-1 rounded-xl opacity-75`}>
            <TextInput 
                multiline={true} 
                value={response}
                placeholder='Type your memory...'
                placeholderTextColor='white' 
                className='flex-1 break-normal truncate text-white' 
                onChangeText={text => handleTextChange(text)}/>
        </View>
    </View>
  )
}

export default ManageMemoryBlock
