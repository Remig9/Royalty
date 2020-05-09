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
import ImagePicker from 'react-native-image-crop-picker';

export default class Reg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      errors: '',
      fullname: '',
      phone: '',
      isloading: false,
      username: '',
      password2: '',
      pick: false,
      library: false,
      Take: false,
      success: false,
      photo: {},
      err: '',
    };
  }

  lib = async () => {
    await this.setState({library: true});
    await this.setState({Take: false});
    this.setState({pick: false});
    await this.try();
    console.warn('library is now true');
  };

  tak = async () => {
    await this.setState({Take: true});
    await this.setState({library: false});
    this.setState({pick: false});
    await this.try();
    console.warn('Take is now true');
  };

  try() {
    if (this.state.library === true && this.state.Take === false) {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      })
        .then(image => {
          this.setState({pick: false});
          this.setState({library: false});
          this.setState({Take: false});
          console.warn(image);
          console.warn('Photo selected');
          this.setState({photo: image});
        })
        .catch(e => {
          this.setState({Take: false});
          this.setState({library: false});
          console.warn('cancel');
          console.warn(e);
        });
    } else if (this.state.Take === true && this.state.library === false) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(image => {
          this.setState({pick: false});
          this.setState({Take: false});
          this.setState({library: false});
          console.warn(image);
          console.warn('photo taken');
          this.setState({photo: image});
        })
        .catch(e => {
          this.setState({Take: false});
          this.setState({library: false});
          console.warn(e);
        });
    }
  }

  submit = () => {
    const {
      email,
      isloading,
      fullname,
      password,
      username,
      password2,
      photo,
    } = this.state;

    if (email == '') {
      this.setState({err: 'Input a valid emaill'});
    }

    if (email == '') {
      this.setState({err: 'Input a valid emaill'});
    } else if (fullname == '') {
      this.setState({err: 'Full name is required'});
    } else if (password !== password2) {
      this.setState({err: 'password and confirm password not the same'});
    } else if (username == '') {
      this.setState({err: 'Input your username'});
    } else {
      this.setState({isloading: true});

      const formData = new FormData();
      formData.append('full_name', fullname);
      formData.append('password', password);
      formData.append('email', email);
      formData.append('username', username);
      formData.append('password_confirmation', password2);
      if (this.state.photo.length == 0 || this.state.photo.path == undefined) {
        console.warn('<<<<', this.state.photo);
        formData.append('profile_photo');
      } else {
        console.warn('>>>>', this.state.photo);
        formData.append('profile_photo', {
          uri: photo.path,
          name: photo.modificationDate,
          type: photo.mime,
        });
      }

      axios
        .post(`${endPoint}/users/register`, formData)
        .then(res => {
          this.setState({isloading: false});
          console.warn(res);

          if (res.data.response.code == 200) {
            console.warn('>>>>>', res);
            this.props.navigation.navigate('Pin', {
              comingemail: this.state.email,
            });
          } else if (res.data.code == 500) {
            this.setState({errors: Object.values(res.data.errors)});
            console.warn(this.state.errors);
          } else {
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
            <Text style={styles.h1}>Register</Text>

            <TouchableOpacity
              style={{
                height: 120,
                width: 120,
                borderRadius: 200 / 2,
                borderWidth: 1,
                marginLeft: RW(5),
                borderColor: '#FFFFFF',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => this.setState({pick: true})}>
              <Image
                source={{uri: this.state.photo.path}}
                style={{height: '100%', width: '100%', borderRadius: 200 / 2}}
              />
              <Image
                source={require('../img/user1.png')}
                style={styles.icon2}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <Text style={{color: 'red', marginTop: '5%', alignSelf: 'center'}}>
              {this.state.errors}
            </Text>
            <Text style={{color: 'red', marginTop: '5%', alignSelf: 'center'}}>
              {this.state.err}
            </Text>
            <Text style={styles.text}>Full Name</Text>

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
              onChangeText={fullname => this.setState({fullname})}
              placeholder="Full Name"
            />

            <Text style={styles.text}>User Name</Text>

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
              onChangeText={username => this.setState({username})}
              placeholder="User Name"
            />

            <Text style={styles.text}>Phone Number</Text>

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
              onChangeText={phone => this.setState({phone})}
              placeholder="Phone Number"
              keyboardType={'numeric'}
            />

            <Text style={styles.text}>Email</Text>

            <Image
              source={require('../img/mail.png')}
              style={styles.icon}
              resizeMode="contain"
            />

            <TextInput
              ref={input => {
                this.Password = input;
              }}
              style={styles.textinput}
              onChangeText={email => this.setState({email})}
              placeholder="Email"
            />

            <Text style={styles.text}>Create Password</Text>

            <Image
              source={require('../img/password.png')}
              style={styles.icon}
              resizeMode="contain"
            />

            <TextInput
              ref={input => {
                this.Password = input;
              }}
              secureTextEntry={true}
              style={styles.textinput}
              onChangeText={password => this.setState({password})}
              placeholder="Password"
            />

            <Text style={styles.text}>Confirm Password</Text>

            <Image
              source={require('../img/password.png')}
              style={styles.icon}
              resizeMode="contain"
            />

            <TextInput
              ref={input => {
                this.Password = input;
              }}
              secureTextEntry={true}
              style={styles.textinput}
              onChangeText={password2 => this.setState({password2})}
              placeholder="Confirm Password"
            />

            <View style={{marginTop: RH(10)}}>
              <TouchableOpacity onPress={() => this.submit()}>
                <Button tx="Register" />
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: RH(2),
                  marginBottom: RH(3),
                }}>
                <Text style={{color: '#737A91'}}>Have an account? </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Login')}>
                  <Text style={{color: '#ECC90D'}}>Login</Text>
                </TouchableOpacity>
              </View>
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
                Registration Successful
              </Text>
              <Text style={{fontSize: RF(8), marginTop: RH(3)}}>
                Your registration is Successful
              </Text>
              <Text style={{fontSize: RF(8)}}>you can now log in</Text>
              <TouchableOpacity
                style={styles.b}
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={styles.t1}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        {this.state.pick ? (
          <View style={styles.popUp}>
            <View style={styles.cardpick}>
              <TouchableOpacity
                style={styles.press2}
                onPress={() => this.lib()}>
                <Text style={{color: '#FF5656'}}>Select from library</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.press} onPress={() => this.tak()}>
                <Text style={{color: '#FF5656'}}>Take Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.press}
                onPress={() => this.setState({pick: false})}>
                <Text>Cancel</Text>
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
  text: {
    color: '#737A91',
    marginTop: RH(2),
    marginLeft: RW(5),
  },
  icon2: {
    height: RH(8),
    width: RW(8),
    position: 'absolute',
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
  popUp: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardpick: {
    height: RH(20),
    width: RW(40),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  press: {
    height: '25%',
    width: '90%',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
    borderRadius: 8,
  },
  press2: {
    height: '25%',
    width: '90%',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 8,
  },
});
