import { Text, View,Image, StyleSheet } from "react-native";
import { WEATHER_INTERPRATIONS } from "../Components/Weatherinterpation";

function Forcastlist({mage,date,temp}){

const magerequired=WEATHER_INTERPRATIONS.find((el)=>el.codes.find((ele)=>mage===0 ? el[0] :ele===mage))  
const days=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const FullDate=new Date(date)
const datee=FullDate.getDay()
const Day=days.find((el,i)=>i===datee).slice(0,3)
return <View style={styles.constainer}>
       <Image style={styles.imagestyling} resizeMode='contain' source={magerequired.image}/>
        <Text style={[styles.textstyling,{minWidth:60,textAlign:'center'}]}>{Day.toUpperCase()}</Text>
        <Text style={styles.textstyling}>{`${FullDate.getDate()}/${FullDate.getMonth().toString().padStart(2,0)}`}</Text>
        <Text style={[styles.textstyling,{fontSize:30,minWidth:50,textAlign:'right',}]}>{Math.round(temp)}</Text>
    </View>
}
const styles=StyleSheet.create({

    constainer:{
       flexDirection:'row',
       justifyContent:'space-evenly',
       alignItems:'center',
    },
    imagestyling:{
        height:40,
        width:40
    },
    textstyling:{
        fontFamily:'Avata-font',
        color:'white',
        fontSize:20
    }
})

export default Forcastlist