import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity, TextInput, } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Network from 'expo-network';


import { useState, useEffect, useLayoutEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
//recurso do celular
import { useBatteryLevel } from 'expo-battery';
//contexto
import { UserContext } from "./context/UserContext";
//componentes
import MsgError from "./components/MsgError";
import TopTasks from "./components/TopTasks";
//import async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListTask from "./components/ListTask";


export default function Home() {
  const [rede, setRede] = useState(false)
  const { usuario } = useContext(UserContext)
  const [bateria, setBateria] = useState()
  const batteryLevel = useBatteryLevel();
  useEffect(() => {
    setBateria((batteryLevel * 100).toFixed(0))
  }, [batteryLevel])
  //alterando header do navigation  
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Image
          source={require("../assets/photos/LogoInline.png")}
          style={{ width: 200, height: 70, marginLeft: 80 }}
        />
      ),
    });
  }, [navigation]);
  async function getStatus() {
    const status = await Network.getNetworkStateAsync()
    if (status.type == "WIFI") {
      setRede(true)
    }
  }

  useEffect(() => {
    getStatus()
  }, [])

  useEffect(() => {
    getStatus()
  }, [rede])


  return (
    <View style={styles.globalContainer}>
      {bateria < 20 && (
        <MsgError bateria />
      )}
      {!rede && (<MsgError internet />
      )}
      {rede && bateria >= 20 ? (
        <View>
          <TopTasks />
          <ListTask />
        </View>
      ) : (
        <View style={styles.container}>
          <MsgError bateria /> 
          <TopTasks />
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems :'center',
  },
  container: {
    alignItems: 'center'
  }
});