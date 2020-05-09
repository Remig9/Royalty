import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {WebView} from 'react-native-webview';
import {RH, RW} from '../resize';
import Header1 from '../components/header1';
import Button from '../components/button';

export default class Radio extends Component {
  static navigationOptions = {
    drawerLabel: 'Online Radio',
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('../img/r.png')}
        style={[styles.icon2, {tintColor: tintColor}]}
        resizeMode="contain"
      />
    ),
  };

  render() {
    const url = 'http://www.royaltyng.org/radio';
    return (
      <View style={{flex: 1}}>
        <View style={{height: RH(95)}}>
          <WebView
            source={{
              uri: url,
            }}
            startInLoadingState
            scalesPageToFit={true}
            javaScriptEnabled={true}
            mediaPlaybackRequiresUserAction
            style={{flex: 1}}
          />
          <View style={{marginTop: RH(3)}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Streaming')}>
              <Button tx="Stream Live Services" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
          <Image
            source={require('../img/menu.png')}
            style={{
              height: RH(7),
              width: RW(7),
              marginTop: RH(-89),
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
  icon2: {
    width: RW(9),
    height: RH(9),
  },
});
