import React, { Image, StyleSheet, View } from "react-native";

const Imagetask = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: 'https://cdn.create.vista.com/api/media/small/324649362/stock-photo-beautiful-view-of-a-bench-in-an-autumn-park-near-the-water' }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    
},
image:{
    flex:1
}

});
export default Imagetask;