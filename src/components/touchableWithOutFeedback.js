import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View, Text } from "react-native";

const Touchablewithoutfeedback = () => {
    const [count, setCount] = useState(0);

    const onPress = () => {
        setCount(count + 1);
    };
    return (
        <View style={styles.container}>
            <View style={styles.countContainer}>
                <Text style={styles.countText}>Count:{count}</Text>
            </View>
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={styles.button}>
                    <Text >Touch Here</Text>
                </View>

            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'orange',
        padding: 10,
    },
    countContainer: {
        alignItems: 'center',
        padding: 10,
    },
    countText: {
        color: 'black',
    },
})
export default Touchablewithoutfeedback;