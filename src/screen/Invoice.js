import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, RefreshControl, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import db from '../database/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Invoice = item => {
  const invoiceData = {
    invoiceNumber: '1',
    customerName: 'Sunny kadivar',
    customerEmail: 'Sunnykadivar98@gmail.com',
    customerAddress: 'Morbi',
  };

  const [allProducts, setAllProducts] = useState([]);
  const [refresh, setRefresh] = useState();
  const [storeUserid, setStoreUserid] = useState('');
  const [cartitems, setCartItems] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState();
  const [email , setEmail]=useState([]);

  useEffect(() => {
    // refreshData();
    getCartItems();
    Email();
  }, [selectedProductId, cartitems, storeUserid,email]);

  const refreshData = () => {
    getUseridFromDB();
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM addtocart WHERE userId=?',
          [storeUserid],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
              setAllProducts(temp);
            }
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

  useFocusEffect(
    React.useCallback(() => {
      refreshData();
      getUseridFromDB();
      // getCartItems();
    }, []),
  );

  const getCartItems = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM addtocart WHERE userid=?',
        [storeUserid],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setCartItems(temp);
        },
      );
    });
  };

  let total = 0;
  cartitems.forEach(item => {
    total += item.price * item.quantity;
  });

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const formatDate = `${day}/${month}/${year}`;

  const Email = async () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT email FROM users WHERE id=?',
        [storeUserid],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setEmail(temp);
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Invoice</Text>
      </View>
      <View style={styles.invoiceInfoContainer}>
        <View style={styles.invoiceInfo}>
          <Text style={styles.label}>Invoice Number:</Text>
          <Text style={styles.text}>{invoiceData.invoiceNumber}</Text>
        </View>
        <View style={styles.invoiceInfo}>
          <Text style={styles.label}>Invoice Date:</Text>
          <Text style={styles.text}>{formatDate}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.customerInfoContainer}>
        <Text style={styles.subtitle}>Customer Information</Text>
        <View style={styles.customerInfo}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.text}>{invoiceData.customerName}</Text>
        </View>
        {email.map((user, index) => (
          <View key={index}>
            <View style={styles.customerInfo}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.text}>{user.email}</Text>
            </View>
          </View>
        ))}
        <View style={styles.customerInfo}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.text}>{invoiceData.customerAddress}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.itemsContainer}>
        <Text style={styles.subtitle}>Invoice Items</Text>

        <FlatList
          data={allProducts}
          renderItem={({item}) => (
            <View style={styles.item} key={item.id}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetails}>
                {item.quantity} x ${item.price}
              </Text>
              <Text style={styles.itemTotal}>
                ${item.quantity * item.price}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }></FlatList>
      </View>
      <View style={styles.divider} />
      <View style={styles.totalContainer}>
        <Text style={styles.label}>Total:</Text>
        <Text style={styles.total}>${total}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  invoiceInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  invoiceInfo: {
    flexDirection: 'row',
  },
  label: {
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    marginLeft: 5,
    color: 'black',
  },
  divider: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  customerInfoContainer: {
    marginTop: 20,
  },
  customerInfo: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  itemsContainer: {
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  itemName: {
    fontSize: 16,
    color: 'black',
  },
  itemDetails: {
    color: 'black',
  },
  itemTotal: {
    fontWeight: 'bold',
    color: 'black',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Invoice;
