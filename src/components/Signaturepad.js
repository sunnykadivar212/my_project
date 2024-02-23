import React from "react";
import { View } from "react-native";
import {SignatureCapture} from 'react-native-signature-capture';


const Signature=()=>{
    return(
        <View style={{flex:1}}>
            <SignatureCapture 
            onError={this._signatureCaptureError}
            onChange={this._signatureCaptureChange}
            style={{flex:1,backgroundcolor:'white'}}/>
        </View>
    );
};

_signatureCaptureError=(error)=>{
    console.error(error);
}

_signatureCaptureChange=({base64DataUrl})=>{
    console.log("Got New Signature"+ base64DataUrl)
}

export default Signature;