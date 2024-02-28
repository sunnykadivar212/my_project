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

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userData = await AsyncStorage.getItem('userallData');
      if (userData) {
        const storeData = JSON.parse(userData);
        if (storeData.Email === email && storeData.Password === password) {
          await AsyncStorage.setItem('userToken', '123');

          navigation.navigate('DrawerNavigation');
        } else if (email == '') {
          ToastAndroid.show(
            'Please enter email',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        } else if (password == '') {
          ToastAndroid.show(
            'Please enter Password',
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
        ToastAndroid.show(
          'User not Found',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      }
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

  const [showPassword, setShowPassword] = useState(false);

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
    // <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black' }}>
    //     <Text style={styles.text}>LogIn</Text>
    //     <View style={styles.view}>
    //         <Text style={styles.emailtext}>Email</Text>
    //         <TextInput
    //             placeholder="Enter Email"
    //             style={styles.textinput}
    //             value={email}
    //             onChangeText={text => setEmail(text)}>
    //         </TextInput>

    //     </View>

    //     <View style={styles.view}>
    //         <Text style={styles.emailtext}>Password</Text>
    //         <TextInput
    //             placeholder="Enter Password"
    //             style={styles.textinput}
    //             value={password}
    //             onChangeText={text => setPassword(text)}
    //             secureTextEntry={true}>
    //         </TextInput>
    //     </View>

    //     <TouchableOpacity onPress={Forgotpassword}>
    //         <Text style={{
    //             fontSize: 18,
    //             textAlign: 'center',
    //             marginTop: 8,
    //             marginBottom: 8,
    //             color: 'orange'
    //         }}>Forget Password ?</Text>
    //     </TouchableOpacity>

    //     <TouchableHighlight
    //         style={styles.buttonContent}
    //         onPress={handleLogin}
    //         underlayColor={'red'}
    //     >
    //         <Text style={styles.buttonText}>LogIn</Text>
    //     </TouchableHighlight>
    //     <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
    //         <Text style={{ textAlign: 'center' }}>Don't Have an Account?</Text>
    //         <TouchableOpacity
    //             onPress={() => navigation.navigate("signUpPage")}
    //         >
    //             <Text style={{ color: 'orange', fontSize: 16, padding: 3 }}>SignUp</Text>
    //         </TouchableOpacity>
    //     </View>
    // </View >
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
              onPress={Forgotpassword}
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

// const styles = StyleSheet.create({
//     text: {
//         fontSize: 30,
//         textAlign: 'center',
//         fontWeight: '200'

//     },
//     view: {
//         padding: 13
//     },
//     textinput: {
//         borderColor: 'white',
//         borderWidth: 2,
//         borderRadius: 20
//     },
//     emailtext: {
//         fontSize: 20,
//         marginBottom: 10
//     },
//     viewbutton: {
//         margin: 20
//     },
//     buttonContent: {
//         backgroundColor: "#FFF",
//         borderRadius: 100,
//         borderWidth: 1,
//         marginHorizontal: 20,
//         marginTop: 10
//     },
//     buttonText: {
//         fontSize: 20,
//         color: '#000',
//         width: '100%',
//         height: 40,
//         textAlign: 'center',
//         textAlignVertical: 'center'
//     }

// })

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
