import { StyleSheet, Text, View, Pressable } from 'react-native';
import Button from '@mui/material/Button';
import MapIcon from '@mui/icons-material/Map';
import LoginIcon from '@mui/icons-material/Login';

// Importing React Navigation
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Importing Screens
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import MapList from './screens/MapList';
import LogoTitle from './screens/LogoTitle';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <View style={{ flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName='Home'
          screenOptions={{
            title: 'RoomMapping',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            headerLeft: props => <LogoTitle {...props} />,
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                { GoToButton({screenName: 'MapList'}, 'Mes cartes', <MapIcon />) }
                { GoToButton({screenName: 'Login'}, "Connexion", <LoginIcon />) }
              </View>
            ),
          }}  
        >
          <Stack.Screen
            name='Home'
            component={Home}
            options={{ title: null }}
          />
          <Stack.Screen
            name='MapList'
            component={MapList}
            options={{ title: 'Liste des cartes' }}
          />
          <Stack.Screen
            name='Login'
            component={Login}
            options={{ title: 'Connexion' }}
          />
          <Stack.Screen
            name='Register'
            component={Register}
            options={{ title: 'Inscription' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

function GoToButton({ screenName }, title, icon) {
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate(screenName);
  };

  return (
    <Button
      variant="outlined"
      endIcon={icon}
      style={styles.button} // Utilisez le style ici
      onClick={handleClick} // Utilisez onClick au lieu de onPress
    >
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
    hoover: {
      variant: 'contained',
    }
  },
});

export default App;