import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import db from '../database/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {insertIntoMyorders, insertPaymentDetail} from '../database/dbOperations';

const Invoice = ({item, navigation}) => {
  const invoiceData = {
    invoiceNumber: '1',
    customerName: 'Sunny kadivar',
    customerAddress: 'Morbi',
  };

  const [storeUserid, setStoreUserid] = useState('');
  const [cartitems, setCartItems] = useState([]);
  const [email, setEmail] = useState([]);

  useEffect(() => {
    getCartItems();
    Email();
  }, [cartitems, storeUserid, email]);

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
    getUseridFromDB();
    // getCartItems();
    }, []),
  );

  const getCartItems = () => {
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
            setEmail(temp);
          }
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

        {cartitems.map((item, index) => (
          
            <View style={styles.item} key={index}>
              <Text style={styles.itemName}>{item.name}</Text>

              <Text style={styles.itemDetails}>
                {item.quantity} x ${item.price}
              </Text>

              <Text style={styles.itemTotal}>
                ${item.quantity * item.price}
              </Text>
            </View>
          
        ))}
      </View>
      <View style={styles.divider} />
      <View style={styles.totalContainer}>
        <Text style={styles.totallabel}>Total :</Text>
        <Text style={styles.total}> ${total}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            cartitems.forEach(item =>{
             insertIntoMyorders(
              storeUserid,
              item.name,
              item.price,
              item.image,
              item.quantity,
              formatDate
             )
            })
            navigation.navigate("Myorders");
          }}
          style={styles.button}>
          <Text style={styles.buttontext}>Payment</Text>
        </TouchableOpacity>
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
  totallabel: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    backgroundColor: 'rgba(168,193,210,1)',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
    borderRadius: 20,
  },
  buttontext: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
  },
});

export default Invoice;
