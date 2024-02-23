import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Exstyle from './external_style' 

const Style=()=>{
    const [name, setName] = useState("");
    return(
        <View>
            <Text style={{fontSize:25,color:"blue"}}>Kadivar Sunny</Text>
            <Text style={styles.textBox}>Kadivar Sunny</Text>
            <Text style={styles.textBox}>Kadivar Sunny</Text>
            <Text style={Exstyle.textBox}>Kadivar Sunny</Text>
            <Text style={{fontSize:25,color:'black'}}>your name is:{name}</Text>
            <TextInput placeholder="Enter your name" 
            placeholderTextColor={"black"}
            style={style.TextInput}
            value={name}
            onChangeText={(text)=>setName(text)}>
            </TextInput>
            <Button title="Clear Input" onPress={()=>setName('')}></Button>
        </View>
    )
}

const styles= StyleSheet.create({
    textBox:{
        color:"yellow",
        backgroundColor:"black",
        fontSize:20,
        marginBottom:15,
        padding:20,
        height:50,
        textAlignVertical:"center",
        textAlign:"center",
        borderRadius:25,
        borderWidth:20
    }
})
const style= StyleSheet.create({
    TextInput:{
        fontSize:20,
        color:'blue',
        borderColor:"blue",
        borderWidth:3,
        margin:10
    }
})

export default Style;