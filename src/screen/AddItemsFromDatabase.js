import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import ImagePickers from '../components/ImagePicker';
// import {insertData, updateUser} from './database/dbOperations';
import {insertData, insertProduct, updateUser} from '../database/dbOperations';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddItemsFromDatabase = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [storeUserid, setStoreUserid] = useState('');

  useEffect(() => {
    const getUserId = async () => {
      try {
        const id =await AsyncStorage.getItem('id');
        console.log('id ====>', id);
        if (id !== null) {
          setStoreUserid(id);
        }
        setName('');
        setPrice('');
        setImageURL('');
      } catch (error) {
        console.log('Error from asyncStorage:', error);
      }
    };
    getUserId();
  }, [storeUserid]);

  // const {itemid, mode, itemname, itemprice, itemimage} = route.params || {
  //   itemid: null,
  //   mode: 'add',
  // };

  // const isEditMode = mode === 'update';

  // useEffect(() => {
  //   if (isEditMode || itemid) {
  //     setName(itemname);
  //     setPrice(itemprice);
  //     setImageURL(itemimage);
  //   }
  // }, [itemid]);

  const handleSubmit = () => {
    console.log('name ==> ', name);
    console.log('price ==> ', price);
    console.log('img ==> ', imageURL);

    insertProduct(storeUserid, name, price, imageURL);
    setName('');
    setPrice('');
    setImageURL('');
    navigation.navigate('All Products');
    // if (isEditMode) {
    //   console.log('edit');
    //   updateUser(name, price, imageURL, itemid);
    //   setName('');
    //   setPrice('');
    //   setImageURL('');
    // } else {
    //   insertData(name, price, imageURL);
    //   // setName('');
    //   // setPrice('');
    //   // setImageURL('');
    // }
  };

  const handleImageSelect = imageUri => {
    console.log('Selected Image URI:', imageUri);
    setImageURL(imageUri);
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.main}>
          <View style={styles.view}>
            <TextInput
              placeholder="Enter Product name"
              placeholderTextColor={'black'}
              backgroundColor={'rgba(236,240,245,255)'}
              style={styles.textinput}
              value={name}
              onChangeText={text => setName(text)}></TextInput>
          </View>
          <View style={styles.view}>
            <TextInput
              placeholder="Enter Product price"
              placeholderTextColor={'black'}
              backgroundColor={'rgba(236,240,245,255)'}
              style={styles.textinput}
              value={price}
              onChangeText={text => setPrice(text)}></TextInput>
          </View>

          <ImagePickers onImageSelect={handleImageSelect} />

          <TouchableOpacity onPress={handleSubmit} style={styles.buttonContent}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginTop: 150,
    justifyContent: 'center',
    alignContent: 'center',
  },
  view: {
    padding: 13,
    alignItems: 'center',
  },
  textinput: {
    color: 'black',
    paddingLeft: 15,
    fontSize: 15,
    borderColor: 'black',
    borderRadius: 20,
    width: 300,
    borderWidth: 1,
  },
  buttonContent: {
    fontSize: 20,
    backgroundColor: 'blue',
    borderRadius: 15,
    marginTop: 30,
    marginLeft: 40,
    marginRight: 40,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    width: '100%',
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default AddItemsFromDatabase;
