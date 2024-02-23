import React, { FlatList, StyleSheet, Text, View } from "react-native";

const ComponentsInLoop = () => {
    const users = [
        {
            id: 1,
            name: "sunny",
            email: "Abc@123.com"
        },
        {
            id: 2,
            name: "Bhuro",
            email: "Abc@123.com"
        },
        {
            id: 3,
            name: "Deep",
            email: "Abc@123.com"
        },
    ]
    return (

        <View>
            <Text style={{color:'black'}}>Components In Loop With Flatlist</Text>
            <FlatList
                data={users}
                renderItem={({ item }) => <UserData item={item} />}>
            </FlatList>
        </View>
    );
};

const UserData = (props) => {
    const data = props.item;
    return (
        <View style={styles.box}>
            <Text style={styles.item}>{data.name}</Text>
            <Text style={styles.item}>{data.email}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        fontSize: 20,
        color: "orange",
        flex: 1,
        margin: 5,
        textAlign: 'center'
    },
    box: {
        flexDirection: 'row',
        borderWidth: 3,
        borderColor: 'orange',
        marginBottom: 10
    }
});

export default ComponentsInLoop;