import React from "react";
import { StyleSheet, View ,Text} from "react-native";

const Font=()=>{
    return(
        <View style={{margin:20,padding:10}}>
            <Text style={{fontSize:25,
        color:'black',
        textAlign:'center',
        fontFamily:'Roboto-ThinItalic'}}>React Native</Text>
            <Text style={{fontSize:25,
        color:'black',
        textAlign:'center',
        fontFamily:'Montserrat-Italic-VariableFont_wght'}}>React Native</Text>
            <Text style={{fontSize:25,
        color:'black',
        textAlign:'center',
        fontFamily:'Nunito-SemiBoldItalic'}}>React Native</Text>
            <Text style={{fontSize:25,
        color:'black',
        textAlign:'center',
        fontFamily:'Nunito-Bold'}}>React Native</Text>
        </View>
    );
};

const styles=StyleSheet.create({
    text:{
        
    }
})

export default Font;