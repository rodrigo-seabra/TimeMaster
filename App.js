import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//screens
import Home from "./src/Home";
import CreateTask from "./src/CreateTask";
import Profile from "./src/Profile";
import Vip from "./src/Vip";

//tela de login - excluir dps
import LoginECadastro from "./src/LoginECadastro";

const Tab = createBottomTabNavigator();
export default function App() {
  
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
            name="LoginECadastro"
            component={LoginECadastro}
            options={{
              tabBarLabel: "LoginECadastro",
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
