import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';


export default function App() {
  return (
    <View style={styles.container}>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
