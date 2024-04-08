import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Show } from "../../../types/types";
import SeeMoreButton from "../see-more-button";

interface ShowNotesSummaryProps {
  show: Show;
  setModalVisible: (value: boolean) => void;
}

export default function ShowNotesSummary({
  show,
  setModalVisible,
}: ShowNotesSummaryProps) {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [measuredUnrestrictedHeight, setMeasuredUnrestrictedHeight] = useState(0);
  const [measuredRestrictedHeight, setMeasuredRestrictedHeight] = useState(0);

  useEffect(() => {
    if (measuredUnrestrictedHeight > measuredRestrictedHeight) {
      setIsOverflowing(true);
    } else {
      setIsOverflowing(false);
    }
  }, [measuredUnrestrictedHeight, measuredRestrictedHeight]);

  return (
    <View className="relative">
      {/* Hidden Text for measuring unrestricted height */}
      <Text
        className="absolute text-4xl opacity-0"
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setMeasuredUnrestrictedHeight(height);
        }}
      >
        {show.notes}
      </Text>

      {/* Visible Text */}
      <Text
        className="text-4xl text-white max-h-[225]"
        numberOfLines={5}
        ellipsizeMode="tail"
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setMeasuredRestrictedHeight(height);
        }}
      >
        {show.notes}
      </Text>

      {isOverflowing && (
        <View className="flex-row justify-end mr-4 pt-4">
          <SeeMoreButton
            show={show}
            text="View All Notes"
            setModalVisible={setModalVisible}
          />
        </View>
      )}
    </View>
  );
}
