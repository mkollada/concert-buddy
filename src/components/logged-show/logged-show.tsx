import React from 'react'
import { View } from 'react-native'
import LoggedShowList from './logged-show-list'
import LoggedShowHeader from './logged-show-header'

interface LoggedShowProps {
    showReload: boolean
    setShowReload: (value: boolean) => void
}

export default function LoggedShow({ showReload, setShowReload }: LoggedShowProps) {

    return (
        <View className='flex-1'>
            <LoggedShowHeader />
            <LoggedShowList showReload={showReload} setShowReload={setShowReload}/>
        </View>
    )
}