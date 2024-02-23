import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Image,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/FontAwesome";

const Forgotscreen = () => {
    const [email, setEmail] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [otp, setOtp] = useState();
    const [edit,setEdit]=useState(true);

    const handletouchableOpacity = () => {
        setShowInput(true);
        setEdit(false);
    }

    const handleOtpSubmit = () => {
        setEdit(true);
        setOtp('');
        setShowInput(false);
    };

    return (
        <KeyboardAwareScrollView
            style={{ flexGrow: 1, backgroundColor: 'skyblue' }}>
            <View style={styles.main}>
                <View style={styles.container}>
                    <View style={styles.child}>
                        <Image style={styles.img}
                            source={require('G:/React_Native Project/my_project/src/assets/N_logo.jpg')} />
                        <View>
                            <Text style={styles.text}>The Nilcore</Text>
                            <Text style={{ color: 'black', textAlign: 'right' }}>Bath</Text>
                        </View>
                    </View>
                    <View>

                        <View style={styles.textview}>
                            <Icon name="info-circle" size={25} color={"skyblue"} />
                            <Text style={{ color: 'black', margin: 10 }}>To reset your password, provide your email to receive a code</Text>
                        </View>

                        <View style={styles.view}>
                            <TextInput
                                editable={edit}
                                placeholder="Email"
                                placeholderTextColor={'black'}
                                backgroundColor={'rgba(236,240,245,255)'}
                                style={styles.textinput}
                                value={email}
                                onChangeText={text => setEmail(text)}>
                            </TextInput>
                        </View>

                        {showInput ? (
                            <View style={styles.view}>
                                <TextInput
                                    placeholder="OTP"
                                    placeholderTextColor={'black'}
                                    backgroundColor={'rgba(236,240,245,255)'}
                                    style={styles.textinput}
                                    value={otp}
                                    onChangeText={(text) => setOtp(text)}>
                                </TextInput>

                                <TouchableHighlight
                                    style={styles.buttonContent}
                                    onPress={handleOtpSubmit}
                                    underlayColor={'red'}>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableHighlight>
                            </View>
                        ) : (
                            <TouchableHighlight
                                style={{
                                    fontSize: 20,
                                    backgroundColor: 'blue',
                                    borderRadius: 20,
                                    marginTop: 15,
                                    height: 40,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    marginLeft:15,
                                    marginRight:15
                                }}
                                onPress={handletouchableOpacity}
                                underlayColor={'red'}>
                                <Text style={styles.buttonText}>Send me code</Text>
                            </TouchableHighlight>
                        )}

                        <TouchableOpacity

                            style={{
                                backgroundColor: 'rgba(236,240,245,255)',
                                padding: 10,
                                marginLeft: 40,
                                marginRight: 40,
                                marginTop: 20,
                                borderRadius: 20,
                                borderWidth: 1
                            }}>
                            <Text style={{
                                color: 'black',
                                textAlign: 'center'
                            }}>I don't have an email address</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'skyblue',
    },
    container: {
        height: 500,
        width: 330,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 50,
        alignItems: 'center',
        margin: 25
    },
    child: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30
    },
    img: {
        height: 50,
        width: 50
    },
    text: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold'
    },
    view: {
        padding: 13
    },
    textinput: {
        color: 'black',
        paddingLeft: 15,
        fontSize: 15,
        borderRadius: 20,
        width: 300
    },
    buttonContent: {
        fontSize: 20,
        backgroundColor: 'blue',
        borderRadius: 20,
        marginTop: 20,
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
    textview: {

        flexDirection: 'row',
        backgroundColor: 'rgba(236,240,245,255)',
        width: 300,
        borderRadius: 20,
        alignItems: 'center',
        margin: 15,
        padding: 10
    }
})


export default Forgotscreen;