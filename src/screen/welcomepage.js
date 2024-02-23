import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native";

const Welcome = ({navigation}) => {
    return (
        <View style={styles.main}>
            <View style={styles.imageView}>
            <Image 
            source={require('G:/React_Native Project/my_project/src/assets/N_logo.jpg')}/>
            </View>
            <View style={{marginLeft:78,marginRight:78}}>
            <Text style={styles.text}>Nilcore</Text>
            <Text style={{fontSize:20,color:'black',textAlign:'right'}}>Bath</Text>
            </View>
            <View style={styles.viewbutton}>
                <TouchableOpacity onPress={()=>navigation.navigate("signUpPage")}>
                    <Text style={styles.textstyle} >Signup</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate("logInPage")}>
                    <Text style={styles.textstyle}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:'center',
        
    },
    text:{
        fontSize:70,
        fontWeight:'bold',
        textAlign:'center',
        color:'skyblue'
    },
    viewbutton: {
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:80

    },
    textstyle: {
        fontSize:20,
        color:'black',
        backgroundColor: 'orange',
        height:45,
        width:130,
        textAlign:'center',
        textAlignVertical:'center',
        borderRadius:20
    },
    imageView:{
        alignItems:'center'
    },
    
})

export default Welcome;