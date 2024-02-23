import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const Dimension = () => {
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    const showDimensions = () => {
        console.log(windowHeight + " " + windowWidth);
    };

    const Display =(color)=>(
        <View style={{height: windowHeight/3,
            width:(windowWidth/2)-20,
            backgroundColor:color,
            borderRadius:20,
            margin:10,
            padding:15}}>
                <Text style={{fontSize:25,color:'white'}}>This is resposive element</Text>
            </View>
    )
    return (
        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
            {Display("red")}
            {Display("green")}
            {Display("blue")}
            {Display("black")}
        </View>
    )
}
export default Dimension;