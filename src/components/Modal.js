import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, View } from "react-native";

const Modals = () => {
    const [showModal, setshowModal] = useState(false)
    return (
        <View style={styles.container}>
            <Modal transparent={true} visible={showModal} animationType="slide">
                <View style={styles.centeredview}>
                    <View style={styles.modalview}>
                        <Text style={{color:'black', fontSize:30,paddingBottom:10}}>Hello</Text>
                        <Button title='close' onPress={() => setshowModal(false)} />
                    </View>
                </View>
            </Modal>
            <View style={styles.viewbutton}>
                <Button title='Open' onPress={() => setshowModal(true)} />
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewbutton: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    centeredview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalview: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 20,
        elevation: 5
    },

});

export default Modals;