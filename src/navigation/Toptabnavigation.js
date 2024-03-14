import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AllProducts from '../screen/Allproducts';
import MyProducts from '../screen/Myproducts';

const Tab = createMaterialTopTabNavigator();

// const Tab = createBottomTabNavigator();

const TopTabNavi = ({navigation, route}) => {
  const [isLoading, setisLoading] = useState(true);
  // const {userid}= route.params;
  // console.log("Top tab navigation==",userid)
  useEffect(() => {
    const timer = setTimeout(() => {
      setisLoading();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={'black'}></ActivityIndicator>
        </View>
      ) : (
        <Tab.Navigator>
          <Tab.Screen
            name="All Products"
            options={{title: 'All Products'}}
            component={AllProducts}
          />
          <Tab.Screen
            name="My Products"
            options={{title: 'My Products'}}
            component={MyProducts}
            // initialParams={{userid:userid}}
          />
        </Tab.Navigator>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '200',
  },
});

export default TopTabNavi;
