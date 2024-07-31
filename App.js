import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Home from "./Components/Home";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { City, weatherreport } from "./Components/fetch";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Forcast from "./THREE/Forcast";
import * as Device from  'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

const { height } = Dimensions.get("window");

export default function App() {
  const [locationcoordinated, setlocationcoordinates] = useState({});
  const [weather, setweather] = useState();
  const [isloading, setisloading] = useState(true);
  const [city, setcity] = useState();
  const Stack = createNativeStackNavigator();
  const thm={
    colors:{
      backgroundColor:'transparent'
    }
  }
  useEffect(
    function () {
      async function weatherdata() {
        if (locationcoordinated.lat && locationcoordinated.lng) {
          const value = await weatherreport(
            locationcoordinated.lat,
            locationcoordinated.lng
          );
          const value2 = await City(
            locationcoordinated.lat,
            locationcoordinated.lng
          );
          setcity(value2);
          setweather(value);
        }
      }
      weatherdata();
    },
    [locationcoordinated]
  );
  useEffect(function () {
    
    async function fetchingdata() {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "To fetch your location", [
          {
            text: "Cancell",
            style: "cancel",
            onPress: () => {
               setlocationcoordinates({ lat: 72.0, lng: 85.0 });
            },
          },
        ]);
      }
      if (status === "granted") {
        const value = await Location.getCurrentPositionAsync();
        setlocationcoordinates({
          lat: value.coords.latitude,
          lng: value.coords.longitude,
        });
      }
      setisloading(false);
    }
    fetchingdata();
    registerForPushNotificationsAsync()

    Notifications.addNotificationResponseReceivedListener((response)=>{
      console.log(response.notification.request.content.data)
    })

  }, []);

  const [Fontloaded] = useFonts({
    "Avata-font": require("./assets/Alata-Regular.ttf"),
  });


  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      let  {status}=await Notifications.getPermissionsAsync()
      if(status!=='granted'){
        status=await Notifications.requestPermissionsAsync()
          if(status!=='granted'){
            Alert.alert('Failed to get permissisons')
            return 
          }
      }

    token= await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas?.projectId,
  })

    console.log(token)
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }

  if (isloading)
    return (
      <ActivityIndicator
        size="large"
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          height: "50%",
        }}
      />
    );
  return (
    <ImageBackground
      imageStyle={{ opacity: 0.75 }}
      style={{ flex: 1, backgroundColor: "black" }}
      source={require("./assets/background.png")}
    >
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, padding: 10 }}>
          {Fontloaded && weather && (
            <NavigationContainer theme={thm}>
              <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false,animation:'fade'}}>
                <Stack.Screen name="Home" options={{
                  headerShown:false
                }}>
                  {()=><Home weather={weather} city={city} setlocationcoordinates={setlocationcoordinates} />}
                </Stack.Screen>
                <Stack.Screen name="Forcast" component={Forcast}/>
              </Stack.Navigator>
            </NavigationContainer>
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}
