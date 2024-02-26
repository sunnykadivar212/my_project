import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SanitaryList from "../screen/Sanitary";
import Setting from "../components/Settings";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-vector-icons/FontAwesome';

const Tab = createMaterialTopTabNavigator();

// const Tab = createBottomTabNavigator();

const TopTabNavi = () => {
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setisLoading();
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={'large'} color={"black"}>
                    </ActivityIndicator >
                </View>
            ) : (<Tab.Navigator>
                <Tab.Screen name='Sanitary' component={SanitaryList} />
                <Tab.Screen name='Orders' component={Setting} />
            </Tab.Navigator>)
            }
        </>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '200'
    },
})

export default TopTabNavi;