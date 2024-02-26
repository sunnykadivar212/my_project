import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from "react-native";
import ImagePickers from "../components/ImagePicker";

const AddItems = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');



    return (
        <View style={styles.main}>

            <View style={styles.view}>
                <TextInput
                    placeholder="Enter Product name"
                    placeholderTextColor={'black'}
                    backgroundColor={'rgba(236,240,245,255)'}
                    style={styles.textinput}
                    value={name}
                    onChangeText={text => setName(text)}>
                </TextInput>
            </View>
            <View style={styles.view}>
                <TextInput
                    placeholder="Enter Product price"
                    placeholderTextColor={'black'}
                    backgroundColor={'rgba(236,240,175,100)'}
                    style={styles.textinput}
                    value={price}
                    onChangeText={text => setPrice(text)}>
                </TextInput>
            </View>

            <View>
                <ImagePickers />
            </View>

            <View>
                <TouchableHighlight
                    style={styles.buttonContent}
                    onPress={''}
                    underlayColor={'red'}
                >
                    <Text style={styles.buttonText}>SignUp</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:'center',
        alignContent:'center'
    },
    view: {
        padding: 13,
        alignItems:'center'
    },
    textinput: {
        color: 'black',
        paddingLeft: 15,
        fontSize: 15,
        borderColor: 'black',
        borderRadius: 20,
        width: 300,
        borderWidth:1
    },
    buttonContent: {
        fontSize: 20,
        backgroundColor: 'blue',
        borderRadius: 20,
        margin: 15,
        marginTop:60,
        height: 40,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        width: '100%',
        height: 40,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
}
);


export default AddItems;