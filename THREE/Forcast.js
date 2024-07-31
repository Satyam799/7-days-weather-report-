import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Forcastlist from "./Forcastlist";

const { width } = Dimensions.get("window");

function Forcast({ navigation, route }) {
  const { city, weather } = route.params;
  return (<>
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.Containertext}>{`<`}</Text>
      </TouchableOpacity>
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <Text style={styles.citytext}>{city}</Text>
        <Text style={[styles.citytext,{fontSize:20}]}>7 days forcast</Text>
      </View>
      <View/>
    </View>
    <View style={styles.Listview}>
    <FlatList data={weather.daily.time} renderItem={({item,index})=>{
       return  <Forcastlist mage={weather.daily.weathercode[index]} date={item} temp={weather.daily.temperature_2m_max[index]}/>
    }} keyExtractor={({item,index})=>Math.random()}/>
    {/*<Forcastlist mage={require('../assets/sun.png')} day={'Mon'} date={'07/14'} temp={'39°'}/>
    <Forcastlist mage={require('../assets/sun.png')} day={'Mon'} date={'07/14'} temp={'9°'}/>*/}

    </View>
    </>
  );
}

const styles = StyleSheet.create({
  Containertext: {
    fontFamily: "Avata-font",
    fontSize: 40,
    color: "white",
    fontWeight: "bold",
  },
  container: {
    padding: 20,
    flexDirection: "row",
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  citytext: {
    fontFamily: "Avata-font",
    fontSize: 30,
    color: "white",
  },
  Listview:{
    paddingTop:30
  }
});

export default Forcast;
