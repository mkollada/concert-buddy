import React from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";

import { Link, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Colors from '../../constants/Colors';
import { useColorScheme } from "react-native";



export default function LoggedShowHeader() {  

    const router = useRouter()
    const colorScheme = useColorScheme();

    return (
        <View className="flex-row items-center justify-between pt-16 pb-4 px-4">
            
            <Text className="text-white font-bold text-3xl">My Shows</Text>

            <Link href="/find-artist" asChild>
              <Pressable>
                {({ pressed }) => (
                  <AntDesign
                    name="plus"
                    size={25}
                    light
                    color="white"
                    style={{ 
                        marginRight: 15, 
                        opacity: pressed ? 0.5 : 1
                     }}
                  />
                )}
              </Pressable>
            </Link>
        </View>
    )
}