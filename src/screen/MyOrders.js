import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Image,
  TouchableOpacity,
} from 'react-native';
import db from '../database/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Invoice from './Invoice';

const Myorders = ({navigation}) => {
  const [menuList, setMenuList] = useState([]);
  const [refresh, setRefresh] = useState();
  const [storeUserid, setStoreUserid] = useState('');

  const refreshData = () => {
    try {
      getUseridFromDB();
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Myorders WHERE userid=?',
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
    }, 1000);
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

  let listitem = item => {
    return (
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          margin: 7,
          backgroundColor: 'rgba(230,240,245,255)',
          padding: 5,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 10,
        }}>
        {item.image && (
          <Image
            source={{uri: item.image}}
            style={{
              height: 120,
              width: 120,
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
              fontSize:15,
              padding:3
            }}>
            Name : {item.name}
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize:15,
              padding:3
            }}>
            Price : {item.price}
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize:15,
              padding:3
            }}>
            Quantity : {item.quantity}
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize:15,
              padding:3
            }}>
            Purchase Date : {item.date}
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize:15,
              padding:3
            }}>
            Total : {item.price* item.quantity}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={menuList}
        renderItem={({item}) => listitem(item)}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Myorders;
