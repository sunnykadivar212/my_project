import React, { useState } from "react";
import { Button, View, Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SecureStore=()=>{
    const [user,setUser]=useState("");
    const setData=async()=>{
        await AsyncStorage.setItem("user","Sunny Kadivar")
    }

    const getData=async()=>{
        const name=await AsyncStorage.getItem('user');
        setUser(name);
    }

    const removeData=async()=>{
        await AsyncStorage.removeItem('user');
        setUser('');
    }
    return(
        <View style={{marginTop:30,margin:10}}>
            <Text style={{fontSize:25,color:'black',textAlign:'center'}}>Secure Store | {user}</Text>
            <Button style={{borderRadius:20,}} title="Set Data" onPress={setData}/>
            <Button title="Get Data" onPress={getData}/>
            <Button title="Remove Data" onPress={removeData}/>
        </View>
    );
};

export default SecureStore;