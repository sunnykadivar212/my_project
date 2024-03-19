import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SectionList,
  Image,
  StyleSheet,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  createTable,
  deleteaddtocart,
  insertData,
  insertIntoCartItems,
  updateaddtocart,
} from '../database/dbOperations';
import db from '../database/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [refresh, setRefresh] = useState();
  const [storeUserid, setStoreUserid] = useState('');
  const [cartitems, setCartItems] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState();

  useEffect(() => {
    // refreshData();
    getCartItems();
  }, [selectedProductId,cartitems,storeUserid]);

  const refreshData = () => {
    getUseridFromDB();
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM products', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            setAllProducts(temp);
          }
        });
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

  // const manu = [
  //   {
  //     data: [
  //       {
  //         id: 1,
  //         name: 'Ripon',
  //         image:
  //           'https://www.nilcorebath.com/admin/uploads/products/1704104595_Ripon.jpg',
  //         price: 2000,
  //       },
  //       {
  //         id: 2,
  //         name: 'Spykar',
  //         image:
  //           'https://www.nilcorebath.com/admin/uploads/products/1704104729_Spyakr.jpg',
  //         price: 2200,
  //       },
  //       {
  //         id: 3,
  //         name: 'Titan',
  //         image:
  //           'https://www.nilcorebath.com/admin/uploads/products/1704109839_Titan.jpg',
  //         price: 2500,
  //       },
  //       {
  //         id: 4,
  //         name: 'Retro',
  //         image:
  //           'https://www.nilcorebath.com/admin/uploads/products/1704106572_Retro.jpg',
  //         price: 1500,
  //       },
  //       {
  //         id: 5,
  //         name: 'Cally',
  //         image:
  //           'https://www.nilcorebath.com/admin/uploads/products/1704093421_Cally.jpg',
  //         price: 4000,
  //       },
  //       {
  //         id: 6,
  //         name: 'Crenza',
  //         image:
  //           'https://www.nilcorebath.com/admin/uploads/products/1704106509_Crenza.jpg',
  //         price: 3500,
  //       },
  //     ],
  //   },
  // ];

  const [counts, setCounts] = useState({});

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

  // const increase = async (id, item) => {
  //   const updateCounts = (counts[id] || 0) + 1;
  //   const newCounts = {...counts, [id]: updateCounts};
  //   setCounts(newCounts);
  //   console.log('entre increase function');
  //   const existingCartItemIndex = cartitems.findIndex(
  //     cartitem => cartitem.productId === item.id,
  //   );
  //   console.log('existingCartItemIndex ==> ', existingCartItemIndex);
  //   if (existingCartItemIndex !== -1) {
  //     console.log('if condition');
  //     const updatedCartItems = cartitems.map((cartitem, index) =>
  //       index === existingCartItemIndex
  //         ? {...cartitem, quantity: updateCounts}
  //         : cartitem,
  //     );
  //     setCartItems(updatedCartItems);
  //     await updateaddtocart(updateCounts, storeUserid, item.id);
  //     setSelectedProductId(item.id);
  //   } else {
  //     console.log('insert data ');
  //     console.log(
  //       'storeUserid , name , price , image , quantity , productId ==> ',
  //       storeUserid,
  //       item.name,
  //       item.price,
  //       item.image,
  //       updateCounts,
  //       item.id,
  //     );
  //     insertIntoCartItems(
  //       storeUserid,
  //       item.name,
  //       item.price,
  //       item.image,
  //       updateCounts,
  //       item.id,
  //     );
  //     selectedProductId(item.id);
  //   }
  // };

  const increase = async (id, item) => {
    const updateCounts = (counts[id] || 0) + 1;
    const newCounts = {...counts, [id]: updateCounts};
    setCounts(newCounts);
    console.log('entre increase function');
    const existingCartItem = cartitems.find(
      cartitem => cartitem.productId === item.id,
    );
    console.log('existingCartItem ==> ', existingCartItem);
    if (existingCartItem) {
      console.log('if condition');
      const updatedCartItems = cartitems.map((cartitem, index) =>
        index === existingCartItem
          ? {...cartitem, quantity: updateCounts}
          : cartitem,
      );
      setCartItems(updatedCartItems);
      await updateaddtocart(updateCounts, storeUserid, item.id);
      setSelectedProductId(item.id);
    } else {
      // console.log('insert data ');
      // console.log(
      //   'storeUserid , name , price , image , quantity , productId ==> ',
      //   storeUserid,
      //   item.name,
      //   item.price,
      //   item.image,
      //   updateCounts,
      //   item.id,
      // );
      insertIntoCartItems(
        storeUserid,
        item.name,
        item.price,
        item.image,
        updateCounts,
        item.id,
      );
      setSelectedProductId(item.id);
    }
  };

  const decrease = async (id, item) => {
    setCounts(prevCounts => {
      const updateCounts = Math.max((prevCounts[id] || 0) - 1, 0);
      const newCounts = {...prevCounts, [id]: updateCounts};
      return newCounts;
    });

    const existingCartItemIndex = cartitems.findIndex(
      cartItem => cartItem.productId === item.id,
    );

    if (existingCartItemIndex !== -1) {
      const updateCounts = Math.max(
        cartitems[existingCartItemIndex].quantity - 1,
        0,
      );
      if (updateCounts === 0) {
        const updatedCartItems = cartitems.filter(
          cartItem => cartItem.productId !== item.id,
        );
        
        setCartItems(updatedCartItems);

        await deleteaddtocart(storeUserid, item.id);
        console.log('storeUserid=>',storeUserid);
      } else {
        const updatedCartItems = cartitems.map((cartItem, index) =>
          index === existingCartItemIndex
            ? {...cartItem, quantity: updateCounts}
            : cartItem,
        );
        setCartItems(updatedCartItems);
        await updateaddtocart(updateCounts, storeUserid, item.id);
      }
    }
  };

  return (
    <View style={styles.main}>
      <FlatList
        data={allProducts}
        renderItem={({item}) => (
          <>
            <View style={styles.container}>
              <View style={styles.childView}>
                <Image style={styles.image} source={{uri: item.image}} />

                <View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                    }}>
                    <View>
                      <Text style={styles.text1}>{item.name}</Text>

                      <Text style={styles.text2}>₹{item.price}</Text>
                    </View>

                    {/* <TouchableOpacity
                    // onPress={() =>
                    //   insertintoaddtocart(
                    //     storeUserid,
                    //     item.name,
                    //     item.price,
                    //     item.image,
                    //     counts[item.id] || 0,
                    //   )
                    // }
                    >
                      <Icon name="cart-plus" size={30} color="black" />
                    </TouchableOpacity> */}
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={styles.botton}
                      onPress={() => decrease(item.id,item)}>
                      <Text style={{color: 'black', fontSize: 20,padding:2}}>-</Text>
                    </TouchableOpacity>

                    <Text
                      style={{
                        color: 'black',
                        fontSize: 18,
                        marginTop: 20,
                        marginLeft: 20,
                        textAlignVertical: 'center',
                      }}>
                      {counts[item.id] || 0}
                    </Text>

                    <TouchableOpacity
                      style={styles.botton}
                      onPress={() => increase(item.id, item)}>
                      <Text style={{color: 'black', fontSize: 20}}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </>
        )}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    // padding: 10,
    backgroundColor: 'rgba(168,193,210,1)',
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
    borderWidth: 1,
  },
  image: {
    height: 150,
    width: 150,
    margin: 10,
    borderRadius: 20,
  },
  text1: {
    color: 'skyblue',
    fontSize: 30,
    fontWeight: '600',
    marginTop: 20,
    marginLeft: 20,
  },
  text2: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 20,
    marginTop: 10,
  },
  botton: {
    borderWidth: 1,
    marginLeft: 20,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(236,240,241,1)',
  },
});

export default AllProducts;
