import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';

type IconName = 'edit-04';

const icons: Record<IconName, ImageSourcePropType> = {
  'edit-04': require('../../assets/icons/edit-04.png'),
};

interface CustomIconProps {
  name: IconName;
  size: number;
  color: string;
}

export const CustomIcon: React.FC<CustomIconProps> = ({ name, size, color }) => {
  const icon = icons[name];

  if (!icon) {
    return null;
  }

  return (
    <Image
      source={icon}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
};