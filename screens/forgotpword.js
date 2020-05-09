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
import {RH, RW, RF} from '../resize';
import Button from '../components/button';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import {ScrollView} from 'react-native-gesture-handler';
import {endPoint} from '../components/baseapi';
import Header1 from '../components/header1';
import CodeFiled from 'react-native-confirmation-code-field';

export default class Forgotpword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      err: '',
      isloading: false,
      firstname: '',
      api_token: '',
      user: [],
      success: false,
    };
  }

  time = () => {
    this.setState({isloading: false});
  };

  // updatePhoto=(new_url)=>{
  //   user = this.state.user;
  //   user.photo_uri = new_url;
  //   this.setState({user:user});
  // }

  submit = () => {
    const {email, isloading} = this.state;

    if (email == '') {
      alert('all fields are required');
    } else {
      this.setState({isloading: true});
      axios
        .post(`${endPoint}/users/forgot_password_email`, {
          email: email,
        })
        .then(res => {
          this.setState({isloading: false});
          console.warn(res);

          if (res.data.response.code == 200) {
            alert('success');

            // this.props.navigation.navigate('Overview', {
            //   firstname: this.state.firstname,
            //   user: this.state.user,
            //   //updatePhoto:this.updatePhoto
            // });
          } else if (res.data.response.code == 404) {
            this.setState({err: res.data.response.message});
          }
        })
        .catch(error => {
          console.warn(error);

          this.setState({isloading: false});
          Snackbar.show({
            title: 'Error Loading Data. Please Check internet Connectivity.',
            duration: Snackbar.LENGTH_SHORT,
          });
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header1 />

        <View style={styles.box1}>
          <ScrollView>
            <Text style={styles.h1}>Forgot Password</Text>

            <Text style={{color: 'red', marginTop: '5%', alignSelf: 'center'}}>
              {this.state.err}
            </Text>
            <Text
              style={{
                color: '#737A91',
                marginTop: RH(4),
                marginLeft: RW(5),
              }}>
              Email address
            </Text>

            <Image
              source={require('../img/user.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <TextInput
              returnKeyType={'next'}
              onSubmitEditing={() => {
                this.Password.focus();
              }}
              blurOnSubmit={false}
              style={styles.textinput}
              onChangeText={email => this.setState({email})}
              placeholder="Email address"
            />

            <View style={{marginTop: RH(10)}}>
              <TouchableOpacity onPress={() => this.submit()}>
                <Button tx="Submit" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {this.state.isloading ? (
          <View style={styles.popUp}>
            <ActivityIndicator size="large" color="#00921B" />
          </View>
        ) : null}

        {this.state.success ? (
          <View style={styles.popUp}>
            <View style={styles.card}>
              <Image
                source={require('../img/gg.gif')}
                style={{height: RH(20), width: RW(20), marginTop: RH(-4)}}
                resizeMode="contain"
              />
              <Text style={{fontSize: RF(13), marginTop: RH(-3)}}>
                Email Submited Successful
              </Text>
              <Text style={{fontSize: RF(8), marginTop: RH(3)}}>
                A generated pin has been
              </Text>
              <Text style={{fontSize: RF(8)}}>sent to your email</Text>
              <TouchableOpacity
                style={styles.b}
                onPress={() => this.props.navigation.navigate('Pin')}>
                <Text style={styles.t1}>Reset Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
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

  h1: {
    fontSize: RF(20),
    marginTop: '10%',
    fontWeight: 'bold',
    marginBottom: RH(3),
    color: '#C3C8DF',
    marginLeft: RW(5),
  },
  h3: {
    fontSize: RF(10),
    alignSelf: 'center',
    color: '#737A91',
  },
  popUp: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: RF(25),
    fontFamily: 'name',
    color: '#00921B',
    marginTop: '2%',
  },
  icon: {
    width: RW(4),
    height: RH(4),
    marginLeft: RW(5),
    marginBottom: RH(-5),
  },
  textinput: {
    borderBottomWidth: 1,
    marginLeft: RW(5),
    width: RW(90),
    height: RH(6),
    borderRadius: 5,
    borderColor: '#ECC90D',
    paddingLeft: 25,
  },
  popUp: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: RH(40),
    width: RW(70),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
  },
  b: {
    height: RH(6),
    width: RW(60),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF5656',
    borderRadius: 50,
    marginTop: RH(2),
  },
  t1: {
    color: 'white',
    fontSize: RF(11),
  },
});
