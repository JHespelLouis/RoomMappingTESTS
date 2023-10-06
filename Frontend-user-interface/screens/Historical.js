import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

function Historical() {
  return (
    <View style={styles.container}>
      <Text>Historical</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
  }
});

export default Historical;