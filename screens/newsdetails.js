import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {WebView} from 'react-native-webview';
import {RH, RW, RF} from '../resize';
import Header1 from '../components/header1';
import Button from '../components/button';

export default class Newsdetails extends Component {
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

  render() {
    return (
      <View style={styles.container}>
        <Header1 />
        <Image source={require('../img/news.png')} style={styles.g} />

        <Text
          style={{
            color: '#272E4F',

            fontSize: RF(10),
            fontWeight: 'bold',
            marginLeft: RW(5),
            marginRight: RW(5),
          }}>
          {' '}
          Pastor Adeoye and family expecting a baby{' '}
        </Text>
        <Text style={{marginLeft: RW(5), marginRight: RW(5)}}>
          {' '}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
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
    height: RH(23),
    width: RW(90),
    marginLeft: RW(5),
    marginTop: RH(2),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
