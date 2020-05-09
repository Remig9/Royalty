import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {WebView} from 'react-native-webview';
import {RH, RW, RF} from '../resize';
import Header1 from '../components/header1';
import Button from '../components/button';

export default class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      err: '',
      isloading: false,
      firstname: '',
      api_token: '',
      user: '',
    };
  }
  static navigationOptions = {
    drawerLabel: 'Gallery',
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('../img/g.png')}
        style={[styles.icon2, {tintColor: tintColor}]}
        resizeMode="contain"
      />
    ),
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        console.warn('vvvvv', 'userdetails');
        console.warn('value', value);
        this.setState({user: value});
      }
    } catch (e) {
      // error reading value
    }
  };
  // async update() {
  //   const {navigation} = this.props;
  //   console.warn(navigation.props);
  //   await this.setState({user: navigation.getParam('userdetails', '')});
  //   console.warn('rrrrrrr', this.state.user);
  // }
  async componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header1 />
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.toggleDrawer()}
            style={{
              height: RH(7),
              width: RW(7),
              marginTop: RH(-5),
              marginLeft: RW(90),
            }}>
            <Image
              source={require('../img/menu.png')}
              style={{
                height: RH(7),
                width: RW(7),
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <ScrollView style={{flex: 1}}>
            <Image source={require('../img/p1.png')} style={styles.g} />
            <Text style={{marginLeft: RW(5), fontSize: RF(10)}}>
              June 26 2019 sunday service {this.state.user}
            </Text>

            <Image source={require('../img/p2.png')} style={styles.g} />
            <Text style={{marginLeft: RW(5), fontSize: RF(10)}}>
              June 26 2019 sunday service
            </Text>

            <Image source={require('../img/p3.png')} style={styles.g} />
            <Text style={{marginLeft: RW(5), fontSize: RF(10)}}>
              June 26 2019 sunday service
            </Text>

            <Image source={require('../img/p4.png')} style={styles.g} />
            <Text style={{marginLeft: RW(5), fontSize: RF(10)}}>
              June 26 2019 sunday service
            </Text>

            <Image source={require('../img/p5.png')} style={styles.g} />
            <Text style={{marginLeft: RW(5), fontSize: RF(10)}}>
              June 26 2019 sunday service
            </Text>

            <Image source={require('../img/pas1.jpeg')} style={styles.g} />
            <Text style={{marginLeft: RW(5), fontSize: RF(10)}}>
              June 26 2019 sunday service
            </Text>
            <Image source={require('../img/pas2.jpeg')} style={styles.g} />
            <Text style={{marginLeft: RW(5), fontSize: RF(10)}}>
              June 26 2019 sunday service
            </Text>
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Video')}>
          <Image
            source={require('../img/v.png')}
            style={{
              height: RH(10),
              width: RW(10),
              marginLeft: RW(80),
              marginTop: RH(-10),
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
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
  icon: {
    width: RW(15),
    height: RH(15),
  },
  icon2: {
    width: RW(7),
    height: RH(7),
  },
  g: {
    height: RH(30),
    width: RW(90),
    marginLeft: RW(5),
    marginTop: RH(2),
    borderRadius: 7,
  },
});
