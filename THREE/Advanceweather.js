import { Dimensions, StyleSheet, Text, View } from "react-native";


const {height,width}=Dimensions.get('window')

function Advanceweather({weather}) {


  
  return (
    <View style={styles.container}>
      <View style={styles.smallcontainer}>
      <Text style={styles.textcolorsmaller}>{weather.current_weather.windspeed}</Text>
      <Text style={styles.textcolorbigger}>Windspeed</Text>
      </View>
      <View style={styles.smallcontainer}>
      <Text style={styles.textcolorsmaller}>{weather.daily.sunrise[0].split('T')[1]}</Text>
        <Text style={styles.textcolorbigger}>Sunrise</Text>
      </View>
      <View style={styles.smallcontainer}>
        <Text style={styles.textcolorsmaller}>{weather.daily.sunset[0].split('T')[1]}</Text>
        <Text style={styles.textcolorbigger}>Sunset</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderWidth: 5,
    borderColor: "white",
    flexDirection:'row',
    height:height/6,
    width:width-((width/100)*15),
    borderRadius:20,
    justifyContent:'space-evenly',
    alignItems:'center',

  },
  smallcontainer: {
    justifyContent:'center',
    alignItems:'center'
  },
  textcolorbigger: {
    color: "white",
    fontSize:18,
    fontFamily:'Avata-font'
  },  textcolorsmaller: {
    color: "white",
    fontSize:14,
    fontFamily:'Avata-font'
  }
});

export default Advanceweather;
