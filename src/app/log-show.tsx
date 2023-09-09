import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import LogShowAccordion from '../components/LogShowAccordion';
import React from 'react';

export default function LogShowScreen() {
  return (
    <View style={styles.container} >
      <LogShowAccordion />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
