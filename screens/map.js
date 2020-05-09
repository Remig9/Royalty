import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {RH, RW, RF} from '../resize';
import ContentContainer from './ContentComponent';

export default class Map extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Locate Us',
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('../img/p.png')}
        style={[styles.icon2, {tintColor: tintColor}]}
        resizeMode="contain"
      />
    ),
    name: 'Remig9',
  };
  constructor(props) {
    super(props);

    this.state = {
      latitude: '',
      longitude: '',
      error: null,
      err: '',
      isloading: false,
      firstname: '',
      api_token: '',
      user: {},
    };
  }
  async update() {
    const {navigation} = this.props;
    await this.setState({user: navigation.getParam('userdetails', '')});
    console.warn('jjjjj', this.state.user);
  }
  async componentDidMount() {
    const {navigation} = this.props;
    Geolocation.getCurrentPosition(
      position => {
        console.log('wokeeey');
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      error => this.setState({error: error.message}),
      {enableHighAccuracy: false, timeout: 200000, maximumAge: 1000},
    );
    await this.update();
    console.warn(this.state.user);
  }

  render() {
    <ContentContainer name="REMIG" />;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 6.5244,
            longitude: 3.3792,
            latitudeDelta: 0.16,
            longitudeDelta: 0.16,
          }}>
          <Marker
            coordinate={{latitude: 6.6369955, longitude: 3.3318541}}
            pinColor="green"
            icon="../img/logo.png">
            <Callout>
              <Image
                source={require('../img/logo.png')}
                style={styles.icon}
                resizeMode="contain"
              />
            </Callout>
          </Marker>

          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}>
            <Callout>
              <Text>My location</Text>
              <Image
                source={require('../img/walk.png')}
                style={styles.icon}
                resizeMode="contain"
              />
            </Callout>
          </Marker>
        </MapView>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Text> {this.state.latitude} </Text>
          <Text> {this.state.longitude} </Text>
          <Text> {this.state.error} </Text>
        </View>
        <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
          <Image
            source={require('../img/menu.png')}
            style={{
              height: RH(7),
              width: RW(7),
              marginTop: RH(-86),
              marginLeft: RW(90),
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
});
