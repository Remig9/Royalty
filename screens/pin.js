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
import CodeInput from 'react-native-confirmation-code-input';

export default class Pin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      errors: '',
      isloading: false,
      firstname: '',
      api_token: '',
      user: [],
      success: false,
      pin: '',
    };
  }

  update() {
    const {navigation} = this.props;
    this.setState({email: navigation.getParam('comingemail', '')});
  }

  componentDidMount() {
    this.update();
  }

  _onFulfill(code) {
    this.setState({pin: code});
  }
  submit = () => {
    const {pin, isloading, email} = this.state;

    if (pin == '') {
      alert('Input the pin sent to your email');
    } else {
      this.setState({isloading: true});
      axios
        .post(`${endPoint}/users/verify_user_email`, {
          verification_code: pin,
          email: email,
        })
        .then(res => {
          this.setState({isloading: false});
          console.warn(res);

          if (res.data.response.code == 200) {
            alert('Registration success proceed to login');

            this.props.navigation.navigate('Login');
          } else {
            this.setState({errors: 'Wrong pin try again'});
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
            <Text style={styles.h1}>Insert Pin</Text>

            <Text style={{color: 'red', marginTop: '5%', alignSelf: 'center'}}>
              {this.state.errors}
            </Text>
            <Text
              style={{
                color: '#737A91',
                marginTop: RH(4),
                marginLeft: RW(5),
              }}>
              Enter the pin sent to your email
            </Text>

            <CodeInput
              ref="codeInputRef2"
              className="border-circle"
              keyboardType="numeric"
              //compareWithCode='AsDW2'
              activeColor="#00921B"
              inactiveColor="black"
              autoFocus={false}
              codeLength={6}
              inputPosition="center"
              size={RF(33)}
              onFulfill={code => this._onFulfill(code)}
              containerStyle={{marginTop: 30}}
              codeInputStyle={{borderWidth: 1.5}}
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
                onPress={() => this.props.navigation.navigate('Login')}>
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
    padding: 8,
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
