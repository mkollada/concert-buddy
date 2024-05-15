import React from "react";
import { View, Text, TouchableOpacity, GestureResponderEvent } from "react-native";
import { Link, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Shadow } from "react-native-shadow-2";

// Define the prop types
interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

const CustomButton: React.FC = () => {

  const router = useRouter()

  return (
    <Link href="/find-artist" asChild>
    <Shadow
      distance={100}
      startColor="#8A00BB25"
      endColor="#0000"
      offset={[0, 0]}
    >
      <TouchableOpacity className="bg-black p-2 rounded-xl">
        <AntDesign
                    name="plus"
                    size={25}
                    light
                    color="white"

                  />
      </TouchableOpacity>
    </Shadow>
    </Link>
  );
};

export default function LoggedShowHeader() {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between pt-16 pb-4 px-4">
      <Text className="text-white font-bold text-3xl">My shows</Text>
      {/* <Shadow> */}
        <CustomButton />
      {/* </Shadow> */}
    </View>
  );
}
