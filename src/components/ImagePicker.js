import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import db from '../database/database';

const ImagePickers = ({onImageSelect, itemimage}) => {
  const [selectedImage, setselectedImage] = useState(null);

  const selectImage = () => {
    ImagePicker.openPicker({
      flexGrow: 1,
      cropping: true,
    })
      .then(image => {
        setselectedImage(image.path);
        onImageSelect(image.path);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const closeImage = () => {
    setselectedImage(null);
    onImageSelect(null);
  };

  return (
    <>
      <View style={{alignItems: 'center'}}>
        {selectedImage  ? (
          <View style={{alignItems: 'flex-end', marginTop: 10}}>
            <TouchableOpacity onPress={closeImage}>
              <Text
                style={{
                  color: 'white',
                  backgroundColor: 'red',
                  fontSize: 15,
                  fontWeight: '600',
                  width: 30,
                  borderRadius: 100,
                  textAlign: 'center',
                  padding: 4,
                  alignContent: 'flex-end',
                }}>
                X
              </Text>
            </TouchableOpacity>
            <Image
              source={{uri: selectedImage}}
              style={{height: 200, width: 250, resizeMode: 'cover'}}
            />
          </View>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={selectImage}>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  backgroundColor: 'orange',
                  height: 40,
                  width: 120,
                  borderRadius: 20,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                }}>
                Select Image
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
};

export default ImagePickers;
