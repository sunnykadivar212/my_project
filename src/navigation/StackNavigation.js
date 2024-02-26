import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screen/Login";
import TopTabNavi from "./Toptabnavigation";
import Welcome from "../screen/welcomepage";
import SignUp from "../screen/Signup";
import Splash_Screen from "../screen/SplashScreen";
import Home from "../screen/HomeScreen";
import Drawernavigation from "./DrawerNavigation";
import { Text } from "react-native";
import Forgotscreen from "../screen/ForgotScreen";
const Stack = createNativeStackNavigator();

const Navigations = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='SplashScreen' component={Splash_Screen} options={{ headerShown: false }} />
                <Stack.Screen name='WelcomePage' component={Welcome} options={{headerShown: false}}/>
                <Stack.Screen name='signUpPage' component={SignUp} />
                <Stack.Screen name='logInPage' component={Login} />
                {/* <Stack.Screen name='HomePage' component={Home} options={{headerShown:false}}/> */}
                <Stack.Screen name='Toptab' component={TopTabNavi} options={{
                    headerShown: false
                }} />
                  <Stack.Screen name="DrawerNavigation" component={Drawernavigation} options={{headerShown:false}}/>
                  <Stack.Screen name="ForgotScreen" component={Forgotscreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigations;