import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import db from '../database/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Invoice from './Invoice';

const AddToCart = ({navigation}) => {
  const [menuList, setMenuList] = useState([]);
  const [refresh, setRefresh] = useState();
  //   const {userid} = route.params;
  const [storeUserid, setStoreUserid] = useState('');

  const refreshData = () => {
    try {
      getUseridFromDB();
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM addtocart WHERE userid=?',
          [storeUserid],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
            }
            setMenuList(temp);
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = () => {
    setRefresh(true);
    refreshData();
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };

  useEffect(() => {
    refreshData();
  }, [storeUserid, menuList, refresh]);

  const getUseridFromDB = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      if (id !== null) {
        setStoreUserid(id);
      }
    } catch (error) {
      console.log('Error from asyncStorage:', error);
    }
  };

  const deleteUser = id => {
    db.transaction(tx => {
      console.log('delete Addtocart===>', id);
      tx.executeSql('DELETE FROM addtocart WHERE id=?', [id], (tx, results) => {
        setMenuList(prevList => prevList.filter(user => user.id != id));
      });
    });
  };

  const total = () => {
    let total = 0;
    menuList.forEach(item => {
      total += item.price * item.quantity;
    });
    console.log('Total==>', total);
  };
  

  let listitem = (item) => {
    return (
      <View
        style={{
          alignItems: 'center',
          marginHorizontal: 5,
          flexDirection: 'row',
          margin: 5,
          backgroundColor: 'rgba(230,240,245,255)',
          padding: 16,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 10,
          marginLeft: 10,
          marginRight: 10,
        }}>
        {item.image && (
          <Image
            source={{uri: item.image}}
            style={{
              height: 100,
              width: 100,
              resizeMode: 'cover',
              margin: 10,
              borderRadius: 20,
            }}
          />
        )}

        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              marginLeft: 10,
              padding: 5,
            }}>
            Name : {item.name}
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              marginLeft: 10,
              padding: 5,
            }}>
            Price : {item.price}
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              marginLeft: 10,
              padding: 5,
            }}>
            Quantity : {item.quantity}
          </Text>
        </View>
        <View style={{padding: 20}}>
          <TouchableOpacity onPress={() => deleteUser(item.id)}>
            <Icon name="delete-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View>
      <View>
        <TouchableOpacity
          onPress={()=>navigation.navigate("Invoice")}
          style={{
            backgroundColor: 'rgba(168,193,210,1)',
            alignItems: 'center',
            margin: 10,
            padding: 10,
            borderRadius: 20,
          }}>
          <Text style={{color: 'black', fontSize: 20, fontWeight: '700'}}>
            CheckOut
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={menuList}
        renderItem={({item}) => listitem(item)}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
        style={{marginBottom: 70}}
      />
    </View>
  );
};

// const styles = StyleSheet.create({
//   button: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//   },
//   icon: {
//     flexGrow: 1,
//     borderRadius: 10,
//     borderWidth: 1,
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: 'skyblue',
//     marginRight: 10,
//   },
// });

export default AddToCart;
