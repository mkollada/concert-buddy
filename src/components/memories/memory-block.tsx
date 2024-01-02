import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Show } from '../../types/types';

interface MemoryBlockProps {
    prompt: string
    initialResponse: string
    show: Show
    setShow: (value: Show) => void

}

const MemoryBlock = ({ prompt, initialResponse, show, setShow}: MemoryBlockProps) => {

    const [responseText, setResponseText] = useState(initialResponse)
    const isInitialRender = useRef(true)

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false // Toggle ref after first render
            return;
        }
        // show.memories[prompt] = responseText
        const updatedShow = {
            ...show,
            memories: {
                ...show.memories,
                [prompt]: responseText
            }
        };
        setShow(updatedShow);

        
    }, [responseText])

  return (
    <View className={`bg-purple rounded-2xl items-center w-[85%] aspect-video py-4 px-2`}>
        <View className='pb-4'>
            <Text className='text-white font-bold'>{prompt}</Text>
        </View>
        <View className={`bg-themePurpleDark p-3 flex-1 w-[85%] h-[85%] rounded-xl`}>
            <TextInput multiline={true} value={responseText} className='flex-1 break-normal truncate text-white' onChangeText={text => setResponseText(text)}/>
        </View>
    </View>
  )
}

export default MemoryBlock
