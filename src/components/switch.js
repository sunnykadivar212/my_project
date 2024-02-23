import React ,{useState}from "react";
import { View , Switch, Text} from "react-native";

const CustomSwitch=()=>{
    const [location,setLocation]=useState(false);

    const toggleLocation=()=>{
        setLocation(previousState=>!previousState)
    }
    return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'black',padding:10}}>Location is:{location ?"on":"off"}</Text>
            <Switch
            style={{alignItems:'center'}}
            trackColor={{true:'yellow', false:'red'}}
            thumbColor={'black'}
            onValueChange={toggleLocation}
            value={location}
            isEnabled={location}
            toggleSwitch={setLocation}
            ></Switch>
        </View>
    )
}

export default CustomSwitch;