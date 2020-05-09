import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import {RH, RW, RF} from './resize';

export default class Socialmedia extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Social Media',
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('../img/so.png')}
        style={[styles.icon2, {tintColor: tintColor}]}
        resizeMode="contain"
      />
    ),
  };
  constructor(props) {
    super(props);

    this.state = {
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
    console.warn(navigation.props);
    this.setState({user: navigation.getParam('userdetails', '')});
    console.warn('????', this.state.user);
  }
  async componentDidMount() {
    this.update();
    console.warn(this.state.user);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{alignSelf: 'center'}}>Social media</Text>

        <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
          <Image
            source={require('../img/menu.png')}
            style={{
              height: RH(7),
              width: RW(7),
              marginTop: RH(-46),
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
    justifyContent: 'center',
    alignItems: 'center',
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
