import React, {useState} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const ImagePickers = () => {
  const [selectedImage, setselectedImage] = useState(null);

  const selectImage = () => {
    ImagePicker.openPicker({
      width: 150,
      height: 200,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setselectedImage(image.path);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <>
      <View>
        {selectedImage ? (
          <View>
            <Image
              source={{uri: selectedImage}}
              style={{height: 600, width: 350}}
            />
          </View>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={selectImage}
              style={
                {
                  // flex: 1,
                  // justifyContent: 'center',
                  // alignItems: 'center'
                }
              }>
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
