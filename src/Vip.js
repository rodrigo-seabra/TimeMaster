import { Text, View, StyleSheet, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//component para fazer uma box com gradiente
import { LinearGradient } from "expo-linear-gradient";

//para alteração relacionadas ao react native navigation
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
export default function Vip()
{

      //alterando a imagem do header do navigation
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
    return (
        <View style={styles.globalContainer}>
            <LinearGradient
                colors={[
                    "#8EFFA7",
                    "#5CE97B",
                    "#5CE97B",
                    "#05BD2D",
                ]}
                style={styles.consultoria}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
            >
                <MaterialCommunityIcons name="card-account-details-star-outline" color="#05BD2D" size={48} />
                <Text style={styles.Title}>Consultoria</Text>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    consultoria: {
        width: 255,
        height: 80,
        borderRadius: 5,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    Title:{
        color:"white", 
        fontSize: 28,
    },
    globalContainer:{
        width:'100%',
        height: '100%',
        backgroundColor: 'white',
        alignItems:"center"
    }
})