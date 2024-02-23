import { useState } from 'react';
import { View, Text, Button } from 'react-native'
const CompanyData = () => {
    //     return (
    //         <View>
    //             {/* <Text style={{ fontSize: 15 }}>Name:abc company</Text>
    //             <Text style={{ fontSize: 15 }}>Total emp:200</Text>
    //             <Text style={{ fontSize: 15 }}>Product:abc product</Text> */}
    //         </View>
    //     )
    const [name, setName]=useState("sunny");
    return (
        <View>
            <Text style={{fontSize:15,color:'black'}}>props in react Native</Text>
            <Button title='Update props' onPress={()=>setName("Sunny Kadivar")}></Button>
            <User name={name} />
        </View>
    )
}

const User=(props)=>{
    return(
        <View style={{backgroundColor:'green', padding:5}}>
            <Text style={{fontSize:30}}>{props.name}</Text>
        </View>
    )
}

export default CompanyData;