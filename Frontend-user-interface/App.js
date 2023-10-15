import { StyleSheet, Text, View } from 'react-native';

import React, { useEffect, useState } from 'react'

// Importing React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Importing Screens
import Home from './screens/Home';
import Historical from './screens/Historical';
import LogoTitle from './screens/LogoTitle';

const Stack = createNativeStackNavigator();

function App() {
  const [backendData, setBackendData] = useState([{}])
  useEffect(() => {
      fetch("/api").then(
          response => response.json()
      ).then(
          data => {
              setBackendData(data)
          }
      )
  }, [])
  return (
    <View style={{ flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName='Home'
          screenOptions={{
            headerStyle: {
              backgroundColor: '#112D4E',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}  
        >

          <Stack.Screen
            name='Home'
            component={Home}
            options={ { title: 'RoomMapping', headerTitle: props => <LogoTitle {...props} /> }}  
          />
          <Stack.Screen
            name='Historical'
            component={Historical}
            options={{ title: 'Historique de scans' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
        <div>
        {(typeof backendData.users === 'undefined') ? (
            <p>Loading...</p>
        ) : (
            backendData.users.map((user,i) => (
                <p key={i}> {user}</p>
            ))
        )}
        </div>,
    </View>
  );
}

export default App;