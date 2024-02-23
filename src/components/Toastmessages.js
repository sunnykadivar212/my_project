import React from "react";
import { View ,Text, Button} from "react-native";
import Toast from "react-native-toast-message";

const ToastMessages=()=>{

    const showToast=()=>{
        Toast.show({
            type:"success",
            text1:'Toast Message',
            text2:'React Native Project'
        })
    }
    return(
        <View>
            <Text style={{fontSize:40,
                color:'black',
                fontWeight:"bold",
                textAlign:'center',
                margin:20}}>Toast Messages</Text>
                <Button title="Show Toast" onPress={showToast}/>
            <Toast/>
        </View>
    );
};

export default ToastMessages;