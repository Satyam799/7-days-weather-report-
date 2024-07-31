import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { weatherreport } from "./fetch";
import Basicdesign from "../THREE/Basics";
import Advanceweather from "../THREE/Advanceweather";
import Searchbar from "../THREE/Searchbar";

function Home({ weather, city,setlocationcoordinates }) {
  return (
    <>
      <Basicdesign weather={weather} city={city} />
      <View style={styles.Searchbar}>
      <Searchbar setlocationcoordinates={setlocationcoordinates}/>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center",marginBottom:20 }}>
        <Advanceweather  weather={weather}/>
      </View>
    </>
  );
}

export default Home;

const styles = StyleSheet.create({
  Basic: {
    flex: 2,
  },
  Searchbar: {
    flex: 2,
  },
  Advance: {
    flex: 1,
  },
  text: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Avata-font",
  },
});
