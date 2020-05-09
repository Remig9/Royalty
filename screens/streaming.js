import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {WebView} from 'react-native-webview';
import {RH, RW} from '../resize';
import Header1 from '../components/header1';
import Button from '../components/button';
import Video from 'react-native-video';
import YouTube from 'react-native-youtube';

export default class Streaming extends Component {
  static navigationOptions = {
    drawerLabel: 'Live Streaming',
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('../img/s.png')}
        style={[styles.icon2, {tintColor: tintColor}]}
        resizeMode="contain"
      />
    ),
  };
  render() {
    const url = 'http://www.royaltyng.org/radio';
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            height: RH(90),
            width: RW(100),
            backgroundColor: 'black',
            marginBottom: RH(1),
          }}>
          <YouTube
            videoId="ALCgdAvaMGI" // The YouTube video ID
            play // control playback of video with true/false
            fullscreen // control whether the video should play in fullscreen or inline
            loop // control whether the video should loop when ended
            onReady={e => this.setState({isReady: true})}
            onChangeState={e => this.setState({status: e.state})}
            onChangeQuality={e => this.setState({quality: e.quality})}
            onError={e => this.setState({error: e.error})}
            style={{alignSelf: 'stretch', height: 300, marginTop: RH(5)}}
          />
        </View>

        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Button tx="Back" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
          <Image
            source={require('../img/menu.png')}
            style={{
              height: RH(7),
              width: RW(7),
              marginTop: RH(-91),
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
    flex: 1,

    backgroundColor: '#272E4F',
  },
  box1: {
    height: '90%',
    width: '100%',
    backgroundColor: '#272E4F',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  icon2: {
    width: RW(9),
    height: RH(9),
  },
});
