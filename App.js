import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {RH, RW, RF} from './resize';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import Login from './screens/login';
import Splash from './screens/splash';
import Reg from './screens/reg';
import Forgotpword from './screens/forgotpword';
import Pin from './screens/pin';
import Resetpword from './screens/resetpword';
import Radio from './screens/radio';

import Streaming from './screens/streaming';
import Map from './screens/map';
import ContentContainer from './screens/ContentComponent';
import Icon from 'react-native-vector-icons';

import News from './screens/news';
import Payment from './screens/payment';
import Bible from './screens/bible';
import Gallery from './screens/gallery';
import Feeds from './screens/feeds';
import Chat from './screens/chat';
import Joingroupchat from './screens/joingroupchat';
import Video from './screens/video';
import Newsdetails from './screens/newsdetails';
import Chatpage from './screens/chatpage';
import Friendsonline from './screens/friendsonline';

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Gallery: {
      screen: Gallery,
      navigationOptions: {
        tabBarLabel: 'Gallery',
        tabBarIcon: ({tintColor}) => (
          <Image
            source={require('./img/g.png')}
            style={[styles.icon3, {tintColor: tintColor}]}
            resizeMode="contain"
          />
        ),
      },
    },
    News: {
      screen: News,
      navigationOptions: {
        tabBarLabel: ' News',
        tabBarIcon: ({tintColor}) => (
          <Image
            source={require('./img/n.png')}
            style={[styles.icon3, {tintColor: tintColor}]}
            resizeMode="contain"
          />
        ),
      },
    },

    Chatpage: {
      screen: Chatpage,
      navigationOptions: {
        tabBarLabel: 'Chat history',
        tabBarIcon: ({tintColor}) => (
          <Image
            source={require('./img/c1.png')}
            style={[styles.icon3, {tintColor: tintColor}]}
            resizeMode="contain"
          />
        ),
      },
    },
    Joingroupchat: {
      screen: Joingroupchat,
      navigationOptions: {
        tabBarLabel: 'Join group chat',
        tabBarIcon: ({tintColor}) => (
          <Image
            source={require('./img/s.png')}
            style={[styles.icon3, {tintColor: tintColor}]}
            resizeMode="contain"
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'Gallery',
    activeColor: '#f0edf6',
    inactiveColor: '#226557',
    barStyle: {backgroundColor: 'pink', height: '10%'},
  },
);

const MyDrawerNavigator = createDrawerNavigator(
  {
    Radio: {
      screen: Radio,
      navigationOptions: {
        title: 'Radio',
      },
    },
    Map: {
      screen: Map,
    },
    Streaming: {
      screen: Streaming,
    },

    Socialmedia: {
      screen: TabNavigator,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Image
            source={require('./img/c1.png')}
            style={[styles.icon2, {tintColor: tintColor}]}
            resizeMode="contain"
          />
        ),
      },
    },

    Payment: {
      screen: Payment,
    },
    Bible: {
      screen: Bible,
    },

    Feeds: {
      screen: Feeds,
    },
  },
  {
    contentComponent: props => <ContentContainer {...props} />,
    contentOptions: {
      //activeBackgroundColor: 'grey',
      activeIntColor: '#FF5656',
      labelStyle: {
        //fontFamily: 'SomeFont',
        // color: '#FF5656',
        // tintcolor: '#FF5656',
      },
      itemsContainerStyle: {
        marginTop: 16,
        marginHorizontal: 8,
      },
      itemStyle: {
        borderRadius: 30,
        //borderWidth: 1,
        borderColor: '#FF5656',
        height: RH(6),
        marginTop: 16,
        color: '#FF5656',
      },
    },
  },
);

const AppNavigator = createStackNavigator(
  {
    Login,
    Reg,
    Forgotpword,
    Pin,
    Resetpword,
    MyDrawerNavigator,
    Video,
    Newsdetails,
    Friendsonline,
    Chat,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
      activeIntColor: 'red',
    },
  },
);

const MainNavigator = createSwitchNavigator({
  Splash,
  AppNavigator,
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
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
  icon3: {
    width: RW(9),
    height: RH(9),
    marginTop: RH(-3),
  },
});
