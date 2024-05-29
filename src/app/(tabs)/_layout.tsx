import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';
import Colors from '../../constants/Colors';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Edit04 } from 'untitledui-js-base'
import { CustomIcon } from '../../components/utils/icons';
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {

  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1 bg-black'>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors['dark'].tint,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'My Shows',
            headerShown: false,
            tabBarIcon: ({ color }) => <CustomIcon name='edit-04' color='white' size={24}/>,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <TabBarIcon name="user-circle" color={color} />,
          }}
        />
      </Tabs>
   </SafeAreaView>
    </SafeAreaProvider>
  );
}
