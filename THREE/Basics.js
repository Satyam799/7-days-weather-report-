import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WEATHER_INTERPRATIONS } from "../Components/Weatherinterpation";
import Clock from "../Components/Clock";
import { useNavigation } from "@react-navigation/native";
import { weatherreport } from "../Components/fetch";

const { height, width } = Dimensions.get("window");
function Basicdesign({ weather, city }) {
  const navigation = useNavigation();
  const Weatherimage = WEATHER_INTERPRATIONS.find((el) =>
    el.codes.some((ele) => ele === weather?.current_weather?.weathercode)
  );

  return (
    <View>
      <View style={{ alignItems: "flex-end" }}>
        <Clock />
      </View>
      <View>
        <Text style={styles.Basicstyling}>{city}</Text>
      </View>
      <View
        style={{ transform: [{ rotate: "-90deg" }], alignSelf: "flex-end" }}
      >
        <Text style={[styles.Basicstyling, { fontSize: 20, padding: 10 }]}>
          {Weatherimage?.label}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Forcast", { city: city, weather: weather })
          }
        >
          <Text style={[styles.Basicstyling, { fontSize: 150 }]}>
            {Math.round(weather?.current_weather?.temperature)}°
          </Text>
        </TouchableOpacity>
        <Image
          resizeMode="contain"
          style={{ height: height / 9, width: width / 5 }}
          source={Weatherimage?.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Basicstyling: {
    fontFamily: "Avata-font",
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Basicdesign;
