import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import 'react-native-gesture-handler';
import Flatlist from '../components/Flatlist';
import Activity_Ind from '../components/Activity_Indecator';
import TopTabNavi from './Toptabnavigation';
import ImagePickers from '../components/ImagePicker';
import Modals from '../components/Modal';
import Dynamicdropdowns from '../components/DynamicDropDown';
import CompanyData from '../components/CompanyData';
import ComponentsInLoop from '../components/ComponentsInLoop';
import DynamicGrid from '../components/DynamicGrid';
import Sliders from '../components/Slider';
import Simpleform from '../components/Simple_form';
import Style from '../components/Styles';
import CustomSwitch from '../components/switch';
import Touchablewithoutfeedback from '../components/touchableWithOutFeedback';
import Axios from '../components/axios';
import RadioButton from '../components/Radiobutton';
import DateTimePicker from '../components/Datetimepicker';
import Signature from '../components/Signaturepad';
import Dimension from '../components/Dimensions';
import Font from '../components/Fonts';
import SecureStore from '../components/Securestore';
import PlayVideo from '../components/Video';
import PlayAudio from '../components/Audio';
import ToastMessages from '../components/Toastmessages';
import {TouchableOpacity, View} from 'react-native';
  import Icon from 'react-native-vector-icons/FontAwesome';
import AddItems from '../database/addItems';
import AddItemsFromDatabase from '../screen/AddItemsFromDatabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddToCart from '../screen/Addtocart';

const Drawer = createDrawerNavigator();

const DrawerNavigation = ({navigation, route}) => {
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('id');
      console.log('AsyncStorage item "id" has been removed.');
      navigation.navigate('logInPage');
    } catch (error) {
      console.error('Error removing AsyncStorage item:', error);
    }
  };
  const Addtocart=()=>{
    navigation.navigate('AddtoCart');
  }
  // const useId = AsyncStorage.getItem('userid');

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Top Tab Navigation"
        component={TopTabNavi}
        // initialParams={{userid:userid}}
        options={{
          title: 'Products',
          headerRight: () => (
            <>
              <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={Addtocart} style={{padding:10}}>
                <Icon name="shopping-cart" size={30} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={logout} style={{padding:10}}>
                <Icon name="sign-out" size={30} color="black" />
              </TouchableOpacity>
              </View>
            </>
          ),
        }}
      />

      <Drawer.Screen
        name="AddItemsFromDatabase"
        component={AddItemsFromDatabase}
        // initialParams={{userid: useId}}
      />

      {/* <Drawer.Screen name="Add Items" component={AddItems} /> */}
      {/* <Drawer.Screen name="Flatlist" component={Flatlist} />
      <Drawer.Screen name="Activity indicator" component={Activity_Ind} />
      <Drawer.Screen name="ImagePicker" component={ImagePickers} />
      <Drawer.Screen name="Modal" component={Modals} />
      <Drawer.Screen name="Dynamic Dropdown" component={Dynamicdropdowns} />
      <Drawer.Screen name="Company Data" component={CompanyData} />
      <Drawer.Screen name="Components In Loop" component={ComponentsInLoop} />
      <Drawer.Screen name="Dynamic Grid" component={DynamicGrid} />
      <Drawer.Screen name="Slider" component={Sliders} />
      <Drawer.Screen name="Simple Form" component={Simpleform} />
      <Drawer.Screen name="Styles" component={Style} />
      <Drawer.Screen name="Switch" component={CustomSwitch} />
      <Drawer.Screen
        name="Touchable With Out Feedback"
        component={Touchablewithoutfeedback}
      />
      <Drawer.Screen name="Axios" component={Axios} />
      <Drawer.Screen name="Radio Button" component={RadioButton} />
      <Drawer.Screen name="DatePicker" component={DateTimePicker} />
      <Drawer.Screen name="Dimensions" component={Dimension} />
      <Drawer.Screen name="Secure Store" component={SecureStore} />
      <Drawer.Screen name="Video" component={PlayVideo} />
      <Drawer.Screen name="Audio" component={PlayAudio} />
      <Drawer.Screen name="Fonts" component={Font} />
      <Drawer.Screen name="Toast Messages" component={ToastMessages} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
