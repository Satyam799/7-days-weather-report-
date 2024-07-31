import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { Searchingcity } from "../Components/fetch";

export default function Searchbar({setlocationcoordinates}) {
const [submit,setsubmit]=useState('')

useEffect(function(){
   async function Cityweather(){
    if(!submit)return
    const coords=await Searchingcity(submit)
    if(!coords.results)return Alert.alert('No city fond with this name','Searchagain',[{text:'Ok',style:'default'}] )
    setlocationcoordinates({lat:coords.results[0].latitude,lng:coords.results[0].longitude})
   }
   Cityweather()
},[submit])

  return (
    <View style={styles.container}>
        <TextInput style={{width:'100%',height:"100%"}} placeholder="Type the city... "  name='city' onSubmitEditing={(e)=>setsubmit(e.nativeEvent.text)}/>
    </View>
  );
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        height:'15%',
        width:'100%',
        borderRadius:50,
        justifyContent:'center',
        alignItems:'flex-start',
        padding:10
    }
})