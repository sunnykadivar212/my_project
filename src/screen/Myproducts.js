import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Image,
} from 'react-native';
import db from '../database/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyProducts = ({navigation, route}) => {
  const [menuList, setMenuList] = useState([]);
  const [refresh, setRefresh] = useState();
  //   const {userid} = route.params;
  const [storeUserid, setStoreUserid] = useState('');

  const refreshData = () => {
    try {
      getUseridFromDB();
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM products WHERE userid=?',
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

  let listitem = item => {
    return (
      <>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            margin: 10,
            backgroundColor: 'rgba(230,240,245,255)',
            padding: 10,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
          }}>
          {item.image && (
            <Image
              source={{uri: item.image}}
              style={{
                height: 140,
                width: 140,
                resizeMode: 'cover',
                margin: 5,
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
                fontSize:20,
                marginLeft: 10,
                padding: 5,
              }}>
              Price : {item.price}
            </Text>
          </View>
        </View>
        {/* <View style={styles.button}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AddItemsFromDatabase', {
                itemid: item.id,
                itemname: item.name.toString(),
                itemprice: item.price.toString(),
                itemimage: item.image,
                mode: 'update',
              })
            }
            style={styles.icon}>
            <Icon name="edit" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => deleteUser(item.id)}>
            <Icon name="delete" size={25} color="red" />
          </TouchableOpacity>
        </View> */}
      </>
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

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  icon: {
    flexGrow: 1,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'skyblue',
    marginRight: 10,
  },
});

export default MyProducts;
