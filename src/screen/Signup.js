import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
  TouchableHighlight,
  ToastAndroid,
  Image,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Home from './HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userData = {
    Email: email,
    Password: password,
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('userallData', JSON.stringify(userData));
    } catch (error) {
      console.log(error);
    }
  };

  const showData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userallData');
      allData = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(allData);
      return allData;
    } catch (error) {
      console.log(error);
    }
  };

  const navigationtoLogin = () => {
    navigation.navigate('DrawerNavigation');
  };

  const handleSignUp = () => {
    if (
      password === confirmPassword &&
      password != '' &&
      confirmPassword != '' &&
      email != ''
    ) {
      storeData();
      showData();
      navigationtoLogin();
    } else if (password != confirmPassword) {
      ToastAndroid.show(
        'Enter valid confirm password',
        ToastAndroid.TOP,
        ToastAndroid.LONG,
        (Position = 'top'),
      );
    } else if (email == '' || password == '') {
      ToastAndroid.show(
        'Enter Email or Password',
        ToastAndroid.TOP,
        ToastAndroid.LONG,
      );
    } else {
      ToastAndroid.show(
        'Invalid Email and Password',
        ToastAndroid.TOP,
        ToastAndroid.LONG,
      );
    }
  };

  return (
    // <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black' }}>
    //     <Text style={Styles.text}>SignUp</Text>
    //     <View style={Styles.view}>
    //         <Text style={Styles.emailtext}>Email</Text>
    //         <TextInput
    //             placeholder="Enter Email"
    //             style={Styles.textinput}
    //             value={email}
    //             onChangeText={text => setEmail(text)}>
    //         </TextInput>
    //     </View>

    //     <View style={Styles.view}>
    //         <Text style={Styles.emailtext}>Password</Text>
    //         <TextInput
    //             placeholder="Enter Password"
    //             value={password}
    //             onChangeText={text => setPassword(text)}
    //             style={Styles.textinput}
    //             secureTextEntry={true}>
    //         </TextInput>
    //     </View>

    //     <View style={Styles.view}>
    //         <Text style={Styles.emailtext}>Confirm Password</Text>
    //         <TextInput
    //             placeholder="Enter Confirm Password"
    //             style={Styles.textinput}
    //             value={confirmPassword}
    //             onChangeText={text => setConfirmPassword(text)}
    //             secureTextEntry={true}
    //         >
    //         </TextInput>
    //     </View>
    //     <View style={Styles.viewbutton}>
    //         <TouchableOpacity onPress={handleSignUp}>
    //             <Text style={Styles.button}>Sign_Up</Text>
    //         </TouchableOpacity>
    //     </View>
    //     <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
    //         <Text style={{ textAlign: 'center' }}>Already Have an Account?
    //         </Text>
    //         <TouchableOpacity onPress={()=>navigation.navigate("logInPage")}>
    //             <Text style={{ color: 'orange', fontSize: 16, padding: 5 }}>Login</Text>
    //         </TouchableOpacity>
    //     </View>

    // </View>
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
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: 18,
                margin: 10,
                fontWeight: '500',
              }}>
              Complete your registraion
            </Text>
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
                secureTextEntry={true}></TextInput>
            </View>

            <View style={styles.view}>
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor={'black'}
                backgroundColor={'rgba(236,240,245,255)'}
                style={styles.textinput}
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
                secureTextEntry={true}></TextInput>
            </View>

            <TouchableHighlight
              style={styles.buttonContent}
              onPress={handleSignUp}
              underlayColor={'red'}>
              <Text style={styles.buttonText}>SignUp</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

// const Styles = StyleSheet.create({
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
//     button: {
//         fontSize: 20,
//         width: '100%',
//         height: 40,
//         backgroundColor: "orange",
//         borderRadius: 100,
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
    marginTop: 30,
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
    margin: 15,
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
    flexDirection: 'row',
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
    backgroundColor: 'white',
    borderRadius: 20,
    height: 45,
    marginLeft: 23,
    marginRight: 27,
  },
});

export default SignUp;
