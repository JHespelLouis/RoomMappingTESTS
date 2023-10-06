import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native'

function Home({ navigation}) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Aller à l'historique des scans"
        onPress={() => navigation.navigate('Historical')}
      />
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

export default Home;