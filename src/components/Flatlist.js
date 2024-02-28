import React, {
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AddItems from '../database/addItems';
import {useEffect, useState} from 'react';
import db from '../database/database';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Flatlist = ({navigation}) => {
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT*FROM users', [], (tx, results) => {
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
      <View>
        <Text style={{color: 'black', fontSize: 18, marginLeft: 10}}>
          name:{item.name}
        </Text>
        <Text style={{color: 'black', fontSize: 18, marginLeft: 10}}>
          price:{item.price}
        </Text>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() =>
              navigation.navigate('AddItems', {
                itemid: item.id,
                itemname: item.name,
                itemprice: item.price.toString(),
                mode: 'update',
              })
            }>
            <Icon name="edit" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => deleteUser(item.id)}>
            <Icon name="delete" size={25} color="black" />
          </TouchableOpacity>
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
  },
  icon: {
    width: 185,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'skyblue',
    marginRight: 10,
  },
});

export default Flatlist;
