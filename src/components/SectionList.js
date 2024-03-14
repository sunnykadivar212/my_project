// import React, {useEffect, useState} from 'react';
// import {Text, View, SectionList, Image, StyleSheet,RefreshControl} from 'react-native';
// import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
// import {createTable, insertData} from '../database/dbOperations';
// import db from '../database/database';


// const productList = () => {

//   const [allProducts, setAllProducts]= useState();
//   const [refresh, setRefresh] = useState();

//   useEffect(() => {
//     createTable();
//   });

//   const refreshData = () => {
//     try {
//       db.transaction(tx => {
//         tx.executeSql('SELECT * FROM products', [], (tx, results) => {
//           var temp = [];
//           for (let i = 0; i < results.rows.length; ++i) {
//             temp.push(results.rows.item(i));
//           }
//           setAllProducts(temp);
//         });
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const onRefresh = () => {
//     setRefresh(true);
//     refreshData();
//     setTimeout(() => {
//       setRefresh(false);
//     }, 2000);
//   };

//   useEffect(() => {
//     refreshData();
//   }, [allProducts]);

//   // const manu = [
//   //   {
//   //     data: [
//   //       {
//   //         id: 1,
//   //         name: 'Ripon',
//   //         image:
//   //           'https://www.nilcorebath.com/admin/uploads/products/1704104595_Ripon.jpg',
//   //         price: 2000,
//   //       },
//   //       {
//   //         id: 2,
//   //         name: 'Spykar',
//   //         image:
//   //           'https://www.nilcorebath.com/admin/uploads/products/1704104729_Spyakr.jpg',
//   //         price: 2200,
//   //       },
//   //       {
//   //         id: 3,
//   //         name: 'Titan',
//   //         image:
//   //           'https://www.nilcorebath.com/admin/uploads/products/1704109839_Titan.jpg',
//   //         price: 2500,
//   //       },
//   //       {
//   //         id: 4,
//   //         name: 'Retro',
//   //         image:
//   //           'https://www.nilcorebath.com/admin/uploads/products/1704106572_Retro.jpg',
//   //         price: 1500,
//   //       },
//   //       {
//   //         id: 5,
//   //         name: 'Cally',
//   //         image:
//   //           'https://www.nilcorebath.com/admin/uploads/products/1704093421_Cally.jpg',
//   //         price: 4000,
//   //       },
//   //       {
//   //         id: 6,
//   //         name: 'Crenza',
//   //         image:
//   //           'https://www.nilcorebath.com/admin/uploads/products/1704106509_Crenza.jpg',
//   //         price: 3500,
//   //       },
//   //     ],
//   //   },
//   // ];

//   const [counts, setCounts] = useState({});

//   const increase = id => {
//     setCounts(prevCounts => {
//       console.log(prevCounts);

//       return {
//         ...prevCounts,
//         [id]: (prevCounts[id] || 0) + 1,
//       };
//     });
//   };

//   const decrease = id => {
//     setCounts(prevCounts => {
//       console.log(prevCounts);

//       return {...prevCounts, [id]: Math.max((prevCounts[id] || 0) - 1, 0)};
//     });
//   };

//   return (
//     <View style={styles.main}>
//       <FlatList
//         data={allProducts}
//         renderItem={({item, index}) => (
//           <>
//             <View style={styles.container}>
//               <View style={styles.childView}>
//                 <Image style={styles.image} source={{uri: item.image}} />

//                 <View>
//                   <Text style={styles.text1}>{item.name}</Text>

//                   <Text style={styles.text2}>₹{item.price}</Text>

//                   <View style={{flexDirection: 'row'}}>
//                     <TouchableOpacity
//                       style={styles.botton}
//                       onPress={() => decrease(item.id)}>
//                       <Text style={{color: 'black', fontSize: 20}}>-</Text>
//                     </TouchableOpacity>

//                     <Text
//                       style={{
//                         color: 'black',
//                         fontSize: 18,
//                         marginTop: 20,
//                         marginLeft: 20,
//                         textAlignVertical: 'center',
//                       }}>
//                       {counts[item.id] || 0}
//                     </Text>

//                     <TouchableOpacity
//                       style={styles.botton}
//                       onPress={() => increase(item.id)}>
//                       <Text style={{color: 'black', fontSize: 20}}>+</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           </>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//         refreshControl={
//           <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
//         }></FlatList>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   main: {
//     padding: 10,
//     backgroundColor: 'rgba(168,193,210,1)',
//   },
//   container: {
//     margin: 10,
//   },
//   childView: {
//     height: 180,
//     width: '100%',
//     flexDirection: 'row',
//     borderRadius: 10,
//     backgroundColor: 'white',
//     borderWidth: 1,
//   },
//   image: {
//     height: 150,
//     width: 150,
//     margin: 10,
//     borderRadius: 20,
//   },
//   text1: {
//     color: 'skyblue',
//     fontSize: 30,
//     fontWeight: '600',
//     marginTop: 20,
//     marginLeft: 20,
//   },
//   text2: {
//     color: 'black',
//     fontSize: 15,
//     fontWeight: '500',
//     marginLeft: 20,
//     marginTop: 10,
//   },
//   botton: {
//     borderWidth: 1,
//     marginLeft: 20,
//     marginTop: 20,
//     padding: 10,
//     borderRadius: 25,
//     backgroundColor: 'rgba(236,240,241,1)',
//   },
// });

// export default productList;
