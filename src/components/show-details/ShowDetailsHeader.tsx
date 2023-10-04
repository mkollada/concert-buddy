import React from "react";
import { Show } from "../../types/types";
import { View, Text } from "../Themed";

interface ShowDetailsHeaderProps {
    show: Show
}

const ShowDetailsHeader: React.FC<ShowDetailsHeaderProps> = ({
    show
}) => {  

    // const subHeaderText

    return (
        <View className="flex-column">
            <View className="items-center">
                <Text className="fonmal font-bold">{show?.artistName}</Text>
            </View>
            <Text className="text-xs">{show.date} {"\u00b7"} {show.venue}</Text>
        </View>
    )
}

export default ShowDetailsHeader