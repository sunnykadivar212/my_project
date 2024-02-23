import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import axios from "axios";

const Axios = () => {
    const [myData, setMyData] = useState([]);

    useEffect(() => {
        axios.get("https://api.openweathermap.org/data/2.5/weather?lat=23.0225&lon=72.5714&appid=8b2755bd1b92063bb4861bf935b4443e")
            .then(res => {
                setMyData([res.data])
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    { console.log(myData) };

    return (
        <View>
            {console.log(data)}
            <Text>axios</Text>
        </View>
    )
}

export default Axios;
