import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const RadioButton = () => {
    const [selectRadio,setSelectRadio]=useState(1);
    return (
        <View style={styles.main}>
            <TouchableOpacity onPress={()=>setSelectRadio(1)}>
                <View style={styles.radioWrapper}>
                    <View style={styles.radio}>
                        {
                            selectRadio === 1? <View style={styles.radioBG}></View>:null
                        }
                    </View>
                    <Text style={styles.radioText}>Range Rover</Text>
                </View>

            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setSelectRadio(2)}>
                <View style={styles.radioWrapper}>
                    <View style={styles.radio}>
                    {
                            selectRadio === 2? <View style={styles.radioBG}></View>:null
                        }
                    </View>
                    <Text style={styles.radioText}>BMW</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setSelectRadio(3)}>
                <View style={styles.radioWrapper}>
                    <View style={styles.radio}>
                    {
                            selectRadio === 3? <View style={styles.radioBG}></View>:null
                        }
                    </View>
                    <Text style={styles.radioText}>Rolls Royse</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setSelectRadio(4)}>
                <View style={styles.radioWrapper}>
                    <View style={styles.radio}>
                    {
                            selectRadio === 4? <View style={styles.radioBG}></View>:null
                        }
                    </View>
                    <Text style={styles.radioText}>Mercedes</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    radioText: {
        color: 'skyblue',
        fontSize: 25
    },
    radio: {
        width: 40,
        height: 40,
        borderColor: 'black',
        borderRadius: 20,
        borderWidth: 2,
        margin: 10
    },
    radioWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    radioBG:{
        height:28,
        width:28,
        backgroundColor:'skyblue',
        borderRadius:20,
        margin:4
    }
})

export default RadioButton;