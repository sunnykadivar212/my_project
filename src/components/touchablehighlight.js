import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

const touchablehighlight=()=>{
    return(
        <View>
            <TouchableHighlight underlayColor={'blue'}>
                <Text style={styles.button}>Button</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        fontSize:20,
        backgroundColor:'yellow',
        color:'black',
        textAlign:'center',
        borderRadius:30,
        margin:10,
        padding:10
    }
})
export default touchablehighlight;