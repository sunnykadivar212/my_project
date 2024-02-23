import React, { useState } from "react";
import { Button, View} from "react-native";
import Video from 'react-native-video';

const PlayVideo=()=>{
    const [isPlaying,setIsplaying]=useState(false);

    return(
        <View style={{flex:1}}>
            <Video source={{uri:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"}}
            style={{flex:1}}
            controls={true}
            paused={!isPlaying}
            resizeMode='contain'/>

            <View style={{flexDirection:'row',justifyContent:'center',}}>
                <Button title={isPlaying ? 'pause Video':'play Video'}
                onPress={()=>setIsplaying(!isPlaying)}></Button>
            </View>
        </View>
    );
};

export default PlayVideo;