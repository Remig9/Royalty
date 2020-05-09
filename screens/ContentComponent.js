import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import {RH, RW, RF} from '../resize';
import axios from 'axios';

export default class ContentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      err: '',
      isloading: false,
      firstname: '',
      api_token: '',
      userName: '',
    };
  }
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        console.warn('vvvvv', 'username');
        console.warn('value', value);
        this.setState({userName: value});
      }
    } catch (e) {
      // error reading value
    }
  };

  componentDidMount = async () => {
    this.getData();
  };
  render() {
    return (
      <ScrollView>
        <ImageBackground source={require('../img/bc.jpg')} style={styles.bb}>
          <Image source={require('../img/remi.jpeg')} style={styles.im} />
          <Text style={styles.name}>Alagbe Remi </Text>
        </ImageBackground>

        <View style={styles.container}>
          <DrawerNavigatorItems {...this.props} />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: '90%',
    width: '100%',
  },
  bb: {
    width: undefined,
    padding: 16,
    paddingTop: 48,
    height: RH(20),
  },
  im: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  name: {
    color: 'white',
    fontSize: RF(13),
    marginTop: RH(2),
  },
});
