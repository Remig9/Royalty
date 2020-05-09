import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import Header1 from '../components/header1';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import {endPoint} from '../components/baseapi';
import AsyncStorage from '@react-native-community/async-storage';
import {RH, RW} from '../resize';

export default class Chat extends React.Component {
  state = {
    messages: [],
    id: '',
    api_token: '',
    text: '',
  };

  async update() {
    const {navigation} = this.props;
    this.setState({id: navigation.getParam('id', '')});
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        console.warn('vvvvv', 'token');
        console.warn('value', value);
        this.setState({api_token: value});
      }
    } catch (e) {
      // error reading value
    }
  };
  // componentDidMount() {
  //   // this.setState({
  //     messages: [
  //       {
  //         _id: 1,
  //         text: 'Hello developer',
  //         createdAt: new Date(),
  //         user: {
  //           _id: 2,
  //           name: ' Moshood',
  //           avatar: 'https://placeimg.com/140/140/any',
  //         },
  //       },
  //       {
  //         _id: 2,
  //         text: 'Am good too',
  //         createdAt: new Date(),
  //         user: {
  //           _id: 2,
  //           name: 'Moshood',
  //           avatar: 'https://placeimg.com/140/140/any',
  //         },
  //       },
  //     ],
  //   // });
  // }

  componentDidMount = async () => {
    await this.getData();
    await this.update();

    await this.getall();
    console.warn('id', this.state.id);
    console.warn('token', this.state.api_token);
  };

  getall = () => {
    axios
      .get(`${endPoint}/users/get_personal_chats?friend_id=${this.state.id}`, {
        headers: {
          Authorization: `Bearer ${this.state.api_token}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        this.setState({isloading: false});
        console.warn(res.data.response.messages);
        this.setState({messages: res.data.response.messages});
      })
      .catch(error => {
        console.warn(error);

        Snackbar.show({
          title: 'Error Loading Data. Please Check internet Connectivity.',
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  };

  // onSend(messages = []) {
  //   console.warn(messages.text);
  //   this.setState(previousState => ({
  //     messages: GiftedChat.append(previousState.messages, messages),
  //   }));

  send() {
    axios
      .post(
        `${endPoint}/users/save_personal_chats`,
        {
          receiver_id: this.state.id,
          message: this.state.text,
        },
        {
          headers: {
            Authorization: `Bearer ${this.state.api_token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        console.warn(res.data.response);
        console.warn(messages);
      })
      .catch(error => {
        console.warn(error);
      });
    this.getall();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header1 />

        {this.state.messages.map((item, key) => {
          if (item.sender_id === this.state.id) {
            return (
              <View
                style={{
                  flexDirection: 'row',
                }}
                Key={key}>
                <Image
                  source={require('../img/remi.jpeg')}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 100 / 2,
                    marginLeft: RW(5),
                    marginTop: RH(2),
                  }}
                />
                <View
                  style={{
                    backgroundColor: 'blue',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: RH(2),
                    padding: 10,

                    borderRadius: 12,
                    marginLeft: RW(2),
                  }}>
                  <Text style={{color: 'white'}}>{item.message}</Text>
                </View>
              </View>
            );
          } else {
            return (
              <View
                style={{
                  backgroundColor: '#FF5656',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: RH(2),
                  padding: 10,

                  borderRadius: 12,
                  alignSelf: 'flex-end',
                  marginRight: RH(2),
                }}
                Key={key}>
                <Text style={{color: 'white'}}>{item.message}</Text>
              </View>
            );
          }
        })}
        <View
          style={{
            flex: 1,

            alignItems: 'flex-end',

            flexDirection: 'row',
          }}>
          <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({text})}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#FF5656',
              height: RH(5),
              width: RW(10),
              marginRight: RW(3),
              marginBottom: RH(4),
              borderRadius: 10,
              marginLeft: RW(2),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => this.send()}>
            <Image
              source={require('../img/send.png')}
              style={{
                height: RH(4),
                width: RW(4),
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272E4F',
  },
  textinput: {
    flex: 1,
    borderWidth: 1,
    width: RW(80),
    height: RH(5),
    borderRadius: 15,
    borderColor: '#ECC90D',
    marginBottom: RH(4),
    marginLeft: RW(2),
    paddingLeft: RW(3),
  },
});
