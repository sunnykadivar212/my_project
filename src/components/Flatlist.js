import React, { FlatList, StyleSheet, Text, View, ScrollView } from "react-native";

const Flatlist = () => {
    const users = [
        {
            id: 1,
            name: "Sunny"
        },
        {
            id:2,
            name:"Bhuro"
        },
        {
            id:3,
            name:"Heet"
        },
        {
            id:4,
            name:"Vivek"
        }
    ]
    return (
        <View>
            {/* <Text style={{ fontSize: 25 }}>List with Flat List</Text>
            <FlatList data={users}
            renderItem={({item})=><Text style={styles.item}>{item.name}</Text>}
            keyExtractor={item=>item.id}></FlatList> */}
            
            <Text style={{fontSize:25 ,color:'black',paddingLeft:10}}>List with map function</Text>
            <ScrollView style={{marginBottom:50}}>
            {
                users.map((item)=><Text style={styles.item}>{item.name}</Text>)
            }
            </ScrollView>
        </View>
    )
}
const styles=StyleSheet.create({
    item:{
        fontSize:25,
        padding:10,
        color:"black",
        backgroundColor:"blue",
        borderWidth:2,
        borderColor:'black',
        margin:10
    }
})
export default Flatlist;