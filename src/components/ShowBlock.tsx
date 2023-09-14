import { View, Image, StyleSheet, Text } from "react-native";
import { Show } from "../types/types";
import React from "react";


interface ShowProps {
    show: Show
}

export const ShowBlock: React.FC<ShowProps> = ({
    show
}) => {
    
    return (
        <View style={styles.container}>
            <View style={styles.roundedBox}>
                <Image
                style={styles.image}
                source={{
                    uri: 'https://mcusercontent.com/f89c714d668e98a972a148b5b/images/d8ddef87-b281-b8c5-7b6f-9560c068ba2f.jpeg',
                }}
                />
                <Text>Artist: {show.artistName}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  roundedBox: {
    width: 100,
    height: 100,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
