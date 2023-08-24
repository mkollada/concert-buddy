import { Button, StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { Link } from 'expo-router';
import React from 'react';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get started logging a show!</Text>
      <Link href="/log-show" asChild>
        <Button title='Log a show'/>        
      </Link>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
