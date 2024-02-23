import React, { useState } from "react";
import { View,Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

const Sliders=() => {
    const [sliderValue,setsliderValue]=useState(20);
    const onSliderValueChange = (value) => { setsliderValue(value);
    };
    return(
        <View style={styles.container}>
            <Text style={styles.lable}>Slider value:{sliderValue}</Text>
            <Slider
            style={styles.slider} 
            value={sliderValue}
            minimumValue={0}
            maximumValue={100}
            step={1}
            onValueChange={onSliderValueChange}
            />
        </View>
    )
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    lable:{
      fontSize:30,
      marginBottom: 10,
      color:'black',
      fontWeight:'bold'
    },
    slider:{
        width:'80%',
        height:50
    }
})

export default Sliders;