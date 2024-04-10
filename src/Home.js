import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity, TextInput, StatusBar, } from "react-native";


import { useState, useEffect, useLayoutEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
//recurso do celular
import { useBatteryLevel } from 'expo-battery';
import * as Network from 'expo-network';

//contexto
import { UserContext } from "./context/UserContext";
//componentes
import MsgError from "./components/MsgError";
import TopTasks from "./components/TopTasks";
import ListTask from "./components/ListTask";
import Teste from "./CustomHeader";
import CustomHeader from "./CustomHeader";


export default function Home() {
  const [rede, setRede] = useState(false)
  const { usuario } = useContext(UserContext)
  const [bateria, setBateria] = useState()
  const batteryLevel = useBatteryLevel();
  useEffect(() => {
    setBateria((batteryLevel * 100).toFixed(0))
  }, [batteryLevel])

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