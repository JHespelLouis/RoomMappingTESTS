import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function LogoTitle() {

  const navigation = useNavigation();

  function handleLogoPress() {
    navigation.navigate('Home');
  }

  return (
    <TouchableOpacity onPress={handleLogoPress}>
      <Image
        style={{ width: 50, height: 50 }}
        source={require('../assets/radar.png')}
      />
    </TouchableOpacity>
  );
}

export default LogoTitle;