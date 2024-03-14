import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  ToastAndroid,
  Image,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import db from '../database/database';
// import {authenticateUser} from '../database/dbOperations';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      // const db = await initDB();

      db.transaction(tx => {
        tx.executeSql(
          'SELECT id,email,password FROM users WHERE email = ?',
          [email],
          (tx, results) => {
            if (results.rows.length > 0) {
              const user = results.rows.item(0);
              console.log(user);
              const userid = user.id;
              console.log('login page ==>', userid);
              if (user.password === password) {
                // Passwords match, authentication successful
                // AsyncStorage.setItem('userToken', '123');
                console.log('userid:', userid);
                navigation.navigate('DrawerNavigation');
                AsyncStorage.setItem('id', userid.toString());
              } else if (email === '') {
                // Password doesn't match
                ToastAndroid.show(
                  'Invalid Email',
                  ToastAndroid.LONG,
                  ToastAndroid.CENTER,
                );
              } else if (password === '') {
                // Password doesn't match
                ToastAndroid.show(
                  'Invalid Password',
                  ToastAndroid.LONG,
                  ToastAndroid.CENTER,
                );
              } else {
                ToastAndroid.show(
                  'Invalid Email and Password',
                  ToastAndroid.LONG,
                  ToastAndroid.CENTER,
                );
              }
            } else {
              // User not found
              ToastAndroid.show(
                'User not found',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
              );
            }
          },
          error => {
            console.log(error);
            ToastAndroid.show(
              'Error during authentication',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            );
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const Forgotpassword = async () => {
    try {
      await AsyncStorage.removeItem('userallData');
      await AsyncStorage.removeItem('userToken');
      navigationtosignup();
    } catch (error) {
      console.log(error);
    }
  };

  const navigationtosignup = () => {
    navigation.navigate('signUpPage');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgot = () => {
    navigation.navigate('ForgotScreen');
  };

  const finalForgotpassword = () => {
    Forgotpassword();
    handleForgot();
  };

  return (
    <KeyboardAwareScrollView style={{flexGrow: 1, backgroundColor: 'skyblue'}}>
      <View style={styles.main}>
        <View style={styles.container}>
          <View style={styles.child}>
            <Image
              style={styles.img}
              source={require('G:/React_Native Project/my_project/src/assets/N_logo.jpg')}
            />
            <View>
              <Text style={styles.text}>The Nilcore</Text>
              <Text style={{color: 'black', textAlign: 'right'}}>Bath</Text>
            </View>
          </View>
          <View>
            <View style={styles.view}>
              <TextInput
                placeholder="Email"
                placeholderTextColor={'black'}
                backgroundColor={'rgba(236,240,245,255)'}
                style={styles.textinput}
                value={email}
                onChangeText={text => setEmail(text)}></TextInput>
            </View>

            <View style={styles.view}>
              <TextInput
                placeholder="Password"
                placeholderTextColor={'black'}
                backgroundColor={'rgba(236,240,245,255)'}
                style={styles.textinput}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={!showPassword}></TextInput>
            </View>

            <View style={styles.icon}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={togglePasswordVisibility}>
                <Icon
                  name={showPassword ? 'eye' : 'eye-slash'}
                  size={20}
                  color="black"
                />
                <Text style={{color: 'black', paddingLeft: 5}}>
                  Show Password
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableHighlight
              style={styles.buttonContent}
              onPress={handleLogin}
              underlayColor={'red'}>
              <Text style={styles.buttonText}>LogIn</Text>
            </TouchableHighlight>

            <TouchableOpacity
              onPress={finalForgotpassword}
              style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  marginTop: 8,
                  marginBottom: 8,
                  color: 'black',
                  borderWidth: 1,
                  width: 250,
                  borderRadius: 20,
                  height: 35,
                  borderColor: 'skyblue',
                }}>
                Forgot Password ?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.childView}>
          <TouchableOpacity onPress={() => navigation.navigate('signUpPage')}>
            <Text style={{color: 'black', textAlign: 'center'}}>
              Register a new account here!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  container: {
    height: 450,
    width: 330,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 50,
    alignItems: 'center',
    margin: 25,
  },
  child: {
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 20,
  },
  img: {
    height: 50,
    width: 50,
  },
  text: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  view: {
    padding: 13,
  },
  textinput: {
    color: 'black',
    paddingLeft: 15,
    fontSize: 15,
    borderColor: 'black',
    borderRadius: 20,
    width: 300,
  },
  buttonContent: {
    fontSize: 20,
    backgroundColor: 'blue',
    borderRadius: 20,
    margin: 10,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    width: '100%',
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  icon: {
    margin: 10,
    borderWidth: 1,
    height: 30,
    width: 150,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'skyblue',
  },
  childView: {
    justifyContent: 'center',
    backgroundColor: 'rgba(236,240,245,255)',
    borderRadius: 20,
    height: 45,
    marginLeft: 23,
    marginRight: 27,
  },
});

export default Login;
