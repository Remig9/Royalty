import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header1 from '../components/header1';

import {RH, RW, RF} from '../resize';

export default class News extends React.Component {
  static navigationOptions = {
    drawerLabel: 'News',
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('../img/n.png')}
        style={[styles.icon2, {tintColor: tintColor}]}
        resizeMode="contain"
      />
    ),
  };
  constructor(props) {
    super(props);

    this.state = {
      latitude: '',
      longitude: '',
      error: null,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header1 />
        <Text
          style={{
            color: 'red',
            alignSelf: 'center',
            marginTop: RH(1),
            fontSize: RF(13),
          }}>
          Top Stories
        </Text>
        <ScrollView>
          <TouchableOpacity
            style={{
              height: RH(30),
              width: RW(90),
              marginLeft: RW(5),
              borderWidth: 1,
              borderRadius: 10,

              marginTop: RH(2),
            }}
            onPress={() => this.props.navigation.navigate('Newsdetails')}>
            <Image source={require('../img/news.png')} style={styles.g} />
            <Text
              style={{
                marginLeft: RW(5),
                fontSize: RF(12),
                color: 'white',
                marginTop: RH(-7),
                fontWeight: 'bold',
              }}>
              Pastor Adeoye and his family are expecting a baby
            </Text>
            <Text
              style={{marginLeft: RW(5), marginTop: RH(2), fontWeight: 'bold'}}>
              Pastor Adeoye
            </Text>
            <View style={{flexDirection: 'row', marginTop: RH(1)}}>
              <Text style={{marginLeft: RW(5), fontSize: RF(7)}}>Aug 30.</Text>
              <Text style={{marginLeft: RW(5), fontSize: RF(7)}}>
                3 mins read
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: RH(30),
              width: RW(90),
              marginLeft: RW(5),
              borderWidth: 1,
              borderRadius: 10,

              marginTop: RH(5),
            }}
            onPress={() => this.props.navigation.navigate('Newsdetails')}>
            <Image source={require('../img/news2.png')} style={styles.g} />
            <Text
              style={{
                marginLeft: RW(5),
                fontSize: RF(12),
                color: 'white',
                marginTop: RH(-7),
                fontWeight: 'bold',
              }}>
              Pastor Adeoye and his family are expecting a baby
            </Text>
            <Text
              style={{marginLeft: RW(5), marginTop: RH(2), fontWeight: 'bold'}}>
              Pastor Adeoye
            </Text>
            <View style={{flexDirection: 'row', marginTop: RH(1)}}>
              <Text style={{marginLeft: RW(5), fontSize: RF(7)}}>Aug 30.</Text>
              <Text style={{marginLeft: RW(5), fontSize: RF(7)}}>
                3 mins read
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: RH(30),
              width: RW(90),
              marginLeft: RW(5),
              borderWidth: 1,
              borderRadius: 10,

              marginTop: RH(5),
            }}
            onPress={() => this.props.navigation.navigate('Newsdetails')}>
            <Image source={require('../img/news3.png')} style={styles.g} />
            <Text
              style={{
                marginLeft: RW(5),
                fontSize: RF(12),
                color: 'white',
                marginTop: RH(-7),
                fontWeight: 'bold',
              }}>
              Pastor Adeoye and his family are expecting a baby
            </Text>
            <Text
              style={{marginLeft: RW(5), marginTop: RH(2), fontWeight: 'bold'}}>
              Pastor Adeoye
            </Text>
            <View style={{flexDirection: 'row', marginTop: RH(1)}}>
              <Text style={{marginLeft: RW(5), fontSize: RF(7)}}>Aug 30.</Text>
              <Text style={{marginLeft: RW(5), fontSize: RF(7)}}>
                3 mins read
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: RH(30),
              width: RW(90),
              marginLeft: RW(5),
              borderWidth: 1,
              borderRadius: 10,

              marginTop: RH(5),
            }}
            onPress={() => this.props.navigation.navigate('Newsdetails')}>
            <Image source={require('../img/news2.png')} style={styles.g} />
            <Text
              style={{
                marginLeft: RW(5),
                fontSize: RF(12),
                color: 'white',
                marginTop: RH(-7),
                fontWeight: 'bold',
              }}>
              Pastor Adeoye and his family are expecting a baby
            </Text>
            <Text
              style={{marginLeft: RW(5), marginTop: RH(2), fontWeight: 'bold'}}>
              Pastor Adeoye
            </Text>
            <View style={{flexDirection: 'row', marginTop: RH(1)}}>
              <Text style={{marginLeft: RW(5), fontSize: RF(7)}}>Aug 30.</Text>
              <Text style={{marginLeft: RW(5), fontSize: RF(7)}}>
                3 mins read
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: RH(30),
              width: RW(90),
              marginLeft: RW(5),
              borderWidth: 1,
              borderRadius: 10,

              marginTop: RH(5),
            }}
            onPress={() => this.props.navigation.navigate('Newsdetails')}>
            <Image source={require('../img/news3.png')} style={styles.g} />
            <Text
              style={{
                marginLeft: RW(5),
                fontSize: RF(12),
                color: 'white',
                marginTop: RH(-7),
                fontWeight: 'bold',
              }}>
              Pastor Adeoye and his family are expecting a baby
            </Text>
            <Text
              style={{marginLeft: RW(5), marginTop: RH(2), fontWeight: 'bold'}}>
              Pastor Adeoye
            </Text>
            <View style={{flexDirection: 'row', marginTop: RH(1)}}>
              <Text style={{marginLeft: RW(5), fontSize: RF(7)}}>Aug 30.</Text>
              <Text style={{marginLeft: RW(5), fontSize: RF(7)}}>
                3 mins read
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
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
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
