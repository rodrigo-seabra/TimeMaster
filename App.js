//Components do react native
import { Text } from "react-native";
//imports da navegação nativa
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
//hoks react
import { useEffect, useState } from "react";
//screens
import Home from "./src/Home";
import CreateTask from "./src/CreateTask";
import Profile from "./src/Profile";
import Vip from "./src/Vip";
import LoginECadastro from "./src/LoginECadastro";

//import async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
export default function App() {
  const [logado, setLogado] = useState(false)


  async function verificaUser() {
    const usuario = await AsyncStorage.getItem("usuario")
    if (usuario != "") {
      setLogado(true)
    }
  }

  useEffect(() => {
    verificaUser()
  }, [])

  if (!logado) {
    return (
      <LoginECadastro setLogado={setLogado} />
    )
  }
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="CreateTask"
          component={CreateTask}
          options={{
            tabBarLabel: "CreateTask",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="clock-plus-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-circle-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Vip"
          component={Vip}
          options={{
            tabBarLabel: "Vip",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="crown-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
