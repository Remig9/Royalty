import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {WebView} from 'react-native-webview';
import {RH, RW} from '../resize';
import Header1 from '../components/header1';
import Button from '../components/button';

export default class Bible extends Component {
  static navigationOptions = {
    drawerLabel: 'Bible',
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('../img/b.png')}
        style={[styles.icon2, {tintColor: tintColor}]}
        resizeMode="contain"
      />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{alignSelf: 'center'}}>Bible</Text>

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
