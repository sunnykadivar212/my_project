import { useState } from "react";
import react, { Button, StyleSheet, Text, TextInput, View } from "react-native";

const Simpleform = () =>{
    const [name, setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [display, setDisplay]=useState("");

    const resetform=()=>{
        setDisplay(false);
        setName("");
        setEmail("");
        setPassword("");
    }

    return (
        <View>
            <TextInput placeholder="Enter your name" 
            placeholderTextColor={'black'}
            style={styles.textInput}
            onChangeText={(text)=>setName(text)}
            value={name}></TextInput>

            <TextInput placeholder="Enter your email"
            placeholderTextColor={'black'}
            style={styles.textInput}
            onChangeText={(text)=>setEmail(text)}
            value={email}></TextInput>

            <TextInput
            placeholder="Enter your password"
            placeholderTextColor={'black'}
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={(text)=>setPassword(text)}
            value={password}></TextInput>

            <View style={{margin:10}}>
                <Button style={{padding:10}} title="print details" onPress={()=>setDisplay(true)}></Button>
            </View>
            <View style={{margin:10}}>
            <Button title="clear details" onPress={()=>resetform()}></Button>
            </View>
            

            <View>
                {display ?
                <View>
                    <Text style={{fontSize:30,color:'black'}}>User name is:{name}</Text>
                    <Text style={{fontSize:30,color:'black'}}>User Email is:{email}</Text>
                    <Text style={{fontSize:30,color:'black'}}>User password is:{password}</Text>
                </View>:null}
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    textInput:{
        fontSize:25,
        color:'black',
        borderColor:'blue',
        borderRadius:20,
        borderWidth:3,
        margin:10
        }
})

export default Simpleform;