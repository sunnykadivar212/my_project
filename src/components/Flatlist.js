import React, {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {useEffect, useState} from 'react';
import db from '../database/database';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { insertData, updateUser } from '../database/dbOperations';
import AddItems from '../database/addItems';

const Flatlist = ({navigation}) => {
  const [menuList, setMenuList] = useState([]);
  const [refresh, setRefresh] = useState();

  const onRefresh = () => {
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
      
    }, 2000);
  };
  
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM users', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        setMenuList(temp);
      });
    });
  }, []);

  const deleteUser = id => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM users WHERE id=?', [id], (tx, results) => {
        setMenuList(prevList => prevList.filter(user => user.id != id));
      });
    });
  };

  let listitem = item => {
    return (
      <>
        <View
          style={{
            alignItems: 'center',
            marginHorizontal: 5,
            flexDirection: 'row',
            margin: 5,
            backgroundColor: 'rgba(236,240,245,255)',
            padding: 16,
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
              name:{item.name}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                marginLeft: 10,
                padding: 5,
              }}>
              price:{item.price}
            </Text>
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AddItems', {
                itemid: item.id,
                itemname: item.name.toString(),
                itemprice: item.price.toString(),
                mode: 'update',
              })
            }
            style={styles.icon}>
            <Icon name="edit" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => deleteUser(item.id)}>
            <Icon name="delete" size={25} color="black" />
          </TouchableOpacity>
        </View>
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

export default Flatlist;
