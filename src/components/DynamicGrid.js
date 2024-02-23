import React, { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const DynamicGrid = () => {
    const users = [
        {
            id: 1,
            name: "Sunny"
        },
        {
            id: 2,
            name: "Bhuro"
        },
        {
            id: 3,
            name: "Heet"
        },
        {
            id: 4,
            name: "Vivek"
        },
        {
            id: 5,
            name: "ravi"
        },
        {
            id: 6,
            name: "Smeet"
        },
        {
            id: 7,
            name: "Param"
        },
        {
            id: 8,
            name: "Dhruv"
        },
        {
            id: 10,
            name: "Smit"
        },
        {
            id: 11,
            name: "Parth"
        },
        {
            id: 12,
            name: "Keval"
        },
        {
            id: 113,
            name: "Meet"
        },

    ]
    return (
        <ScrollView>
            <View>
                <Text>Grid with dynamic Data</Text>
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        users.map((item) => <Text style={styles.item}>{item.name}</Text>)
                    }
                </View>
            </View>
        </ScrollView>

    )
}
const styles = StyleSheet.create({
    item: {
        fontSize: 25,
        backgroundColor: 'blue',
        color: '#fff',
        margin: 10,
        padding: 10,
        width: 120,
        height: 120,
        textAlignVertical: 'center',
        textAlign: 'center'
    }
})

export default DynamicGrid;