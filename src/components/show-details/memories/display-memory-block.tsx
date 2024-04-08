import React from 'react';
import { View, Text } from 'react-native';

interface DisplayMemoryBlockProps {
    prompt: string
    response: string
    color: string
}

const DisplayMemoryBlock = ({prompt, response, color}: DisplayMemoryBlockProps) => {
  return (
    <View className={`flex-1 rounded-2xl py-4 px-8`} style={{backgroundColor: color}}>
        <View className='pb-4'>
            <Text className='text-white font-bold'>{prompt}</Text>
        </View>
        <View className={`bg-black p-2 justify-center flex-1 rounded-xl opacity-75`}>
            <Text
                className='flex-1 break-normal truncate text-white' 
                >{response}</Text>
        </View>
    </View>
  )
}

export default DisplayMemoryBlock
