//screens
import Home from "../Home";
import CreateTask from "../CreateTask";
import Profile from "../Profile";
import Vip from "../Vip";
import LoginECadastro from "../LoginECadastro";
//hooks do react
import { useContext } from "react";

//context
import { UserContext } from "../context/UserContext";

//navegacao
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createBottomTabNavigator();


export default function Routes ()
{

    const { logado } = useContext(UserContext)

    if(logado == true)
    {
        return(<LoginECadastro/>)
    }

    return(
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