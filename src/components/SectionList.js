import React, { useState } from "react";
import { Text, View, SectionList, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Section = () => {

    const manu = [
        {
            id: 1,
            catogary: 'One piece closet',
            data: [
                {
                    name: 'Ripon',
                    image: "https://www.nilcorebath.com/admin/uploads/products/1704104595_Ripon.jpg",
                    price: 2000
                },
                {
                    name: 'Spykar',
                    image: "https://www.nilcorebath.com/admin/uploads/products/1704104729_Spyakr.jpg",
                    price: 2200
                },
                {
                    name: 'Titan',
                    image: "https://www.nilcorebath.com/admin/uploads/products/1704109839_Titan.jpg",
                    price: 2500
                },
                {
                    name: 'Retro',
                    image: "https://www.nilcorebath.com/admin/uploads/products/1704106572_Retro.jpg",
                    price: 1500
                },
                {
                    name: 'Cally',
                    image: "https://www.nilcorebath.com/admin/uploads/products/1704093421_Cally.jpg",
                    price: 4000
                },
                {
                    name: 'Crenza',
                    image: "https://www.nilcorebath.com/admin/uploads/products/1704106509_Crenza.jpg",
                    price: 3500
                },
            ]

        }
    ]

    const [value, setValue] = useState(0);

    const increase = () => {
        setValue(value + 1);
    }

    const decrease = () => {
        if (value > 0) {
            setValue(value - 1);
        }
    }

    return (

        <View style={styles.main}>
            <SectionList
                sections={manu}
                renderItem={({ item }) => (
                    <>
                        <View style={styles.container}>
                            <View style={styles.childView}>

                                <Image style={styles.image} source={{ uri: item.image }} />
                                
                                <View >

                                    <Text style={styles.text1}>{item.name}</Text>

                                    <Text style={styles.text2}>₹{item.price}</Text>

                                    <View style={{ flexDirection: 'row' }}>

                                        <TouchableOpacity style={styles.botton} onPress={()=>decrease()}>
                                            <Text style={{ color: 'black', fontSize: 20 }}>-</Text>
                                        </TouchableOpacity>

                                        <Text style={{
                                            color: 'black',
                                            fontSize: 18,
                                            marginTop: 20,
                                            marginLeft: 20,
                                            textAlignVertical: 'center'
                                        }}>{value}</Text>

                                        <TouchableOpacity style={styles.botton} onPress={()=>increase()}>
                                            <Text style={{ color: 'black', fontSize: 20 }}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>

                        </View>
                    </>
                )
                }>
            </SectionList>
        </View>


    );
};

const styles = StyleSheet.create({
    main: {
        padding: 10,
        backgroundColor: 'rgba(168,193,210,1)'
    },
    container: {
        margin: 10,

    },
    childView: {
        height: 180,
        width: '100%',
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: 'white',
        borderWidth: 1
    },
    image: {
        height: 150,
        width: 150,
        margin: 10,
        borderRadius: 20
    },
    text1: {
        color: 'skyblue',
        fontSize: 30,
        fontWeight: '600',
        marginTop: 20,
        marginLeft: 20
    },
    text2: {
        color: 'black',
        fontSize: 15,
        fontWeight: '500',
        marginLeft: 20,
        marginTop: 10
    },
    botton: {
        borderWidth: 1,
        marginLeft: 20,
        marginTop: 20,
        padding: 10,
        borderRadius: 25,
        backgroundColor: 'rgba(236,240,241,1)'
    }

})

export default Section;