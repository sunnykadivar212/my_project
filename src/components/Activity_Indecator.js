import React, {View, ActivityIndicator, StyleSheet } from "react-native";

const Activity_Ind = () => (
    <View style={[styles.container,styles.horizontal]}>
        <ActivityIndicator size={100}/>
        <ActivityIndicator  size={"large"} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});

export default Activity_Ind;