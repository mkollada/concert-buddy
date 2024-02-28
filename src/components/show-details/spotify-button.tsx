import React from 'react';
import { TouchableOpacity, Image, Linking } from 'react-native';
import { View } from 'react-native';

interface SpotifyButtonProps {
    spotifyUrl: string
}

const SpotifyButton = ({ spotifyUrl }: SpotifyButtonProps) => {
  const openSpotify = () => {
    Linking.openURL(spotifyUrl).catch(err => console.error('An error occurred', err));
  };

  return (
    <TouchableOpacity className='items-center' onPress={openSpotify}>
      <View className='bg-themeGray p-3 rounded-2xl'>
        <Image
          source={require('./Spotify_Logo_RGB_Green.png')} // replace with the path to your Spotify logo image
          style={{ width: 175, height: 51 }} // adjust the size as needed
        />
      </View>
    </TouchableOpacity>
  );
};

export default SpotifyButton;
