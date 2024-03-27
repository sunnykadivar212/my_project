import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Droptable, createTable} from '../database/dbOperations';

const Splash_Screen = ({navigation}) => {
  useEffect(() => {
  
    createTable();
    const timer = setTimeout(() => {
      Token();
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  const Token = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log(token);
      if (token) {
        navigation.navigate('DrawerNavigation');
      } else {
        console.log('welcome page');
        navigation.navigate('WelcomePage');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StatusBar hidden />
      <ImageBackground
        style={styles.image}
        resizeMode="cover"
        source={require('../assets/SplashScreen_image.webp')}>
        <View style={styles.textContent}>
          <View style={{}}>
            <Text style={styles.text}>Nilcore</Text>
            <Text
              style={{textAlign: 'right', fontWeight: 'bold', color: 'black'}}>
              Bath
            </Text>
            <Text style={{fontSize: 15, textAlign: 'right'}}>
              Infinite Elegance
            </Text>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'skyblue',
  },
  textContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    transparent: 'true',
  },
});
export default Splash_Screen;
