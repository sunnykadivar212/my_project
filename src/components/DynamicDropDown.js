import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Styles from "./Styles";


const Data=[
    { lable : 'item 1',value : '1',color:'black' },
    { lable : 'item 2' ,value : '2' },
    { lable : 'item 3' ,value : '3' },
    { lable : 'item 4' ,value : '4' },
    { lable : 'item 5' ,value : '5' },
    { lable : 'item 6' ,value : '6' },
    { lable : 'item 7' ,value : '7' },
    { lable : 'item 8' ,value : '8' }
];

const Dynamicdropdowns=()=>{
    const [value,setValue]=useState(null);
    return(
        <View>
            <Dropdown 
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={Data}
            search
            maxHeight={500}
            labelField="lable"
            valueField="value"
            placeholder="Select item"
            searchPlaceholder="Search..."
            value={value}
            onChange={item=>{
                setValue(item.value);
            }}
            />
        </View>
    );
};

const styles=StyleSheet.create({
    dropdown:{
        color:'black',
        margin:15,
        height:50,
        borderBottomColor:'blue',
        borderBottomWidth:2
    },
    placeholderStyle:{
        fontSize:25,
        color:'black'
    },
    selectedTextStyle:{
        color:'black',
        fontSize:20
    },
    inputSearchStyle:{
        fontSize:20,
        color:'black',
        height:50
    }
})

export default Dynamicdropdowns;