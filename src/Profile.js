import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useState, useEffect, useLayoutEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//component para fazer uma box com gradiente
import { LinearGradient } from "expo-linear-gradient";
//contexto
import { UserContext } from "./context/UserContext";

export default function Profile() {
    //context - user
    const { usuario } = useContext(UserContext)
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
    return (
        <View style={styles.globalContaine}>
            <Text style={styles.title}>Olá : {usuario}</Text>

            <TouchableOpacity>
                <LinearGradient
                    c
                    colors={[
                        "#0C8ABF",
                        "#54A1C1",
                        "#70B8D7",
                        "#BEDAE5",
                    ]}
                    style={styles.topTasksEfects}
                    start={{ x: 1, y: 0.5 }}
                    end={{ x: 0, y: 0.5 }}
                >
                    <View style={styles.boxPoints}>
                        <MaterialCommunityIcons name="lightbulb-outline" style={styles.icon} />
                        <Text style={styles.points}>Você tem 214 pontos</Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity>
                <LinearGradient
                    c
                    colors={[
                        "#0C8ABF",
                        "#54A1C1",
                        "#70B8D7",
                        "#BEDAE5",
                    ]}
                    style={styles.topTasksEfects}
                    start={{ x: 1, y: 0.5 }}
                    end={{ x: 0, y: 0.5 }}
                >
                    <View style={styles.ofensiva}>
                        <MaterialCommunityIcons name="calendar-blank-outline" style={styles.icon} />
                        <Text style={styles.textOfensiva}>Há 10 dias seguindo a rotina firme!</Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
            <View style={styles.containerExtras}>
                <Text style={styles.title}>Extra</Text>
                <TouchableOpacity>
                    <LinearGradient
                        c
                        colors={[
                            "#05BD2D",
                            "#3FC05B",
                            "#5CE97B",
                            "#8EFFA7",
                        ]}
                        style={styles.consultoria}
                        start={{ x: 1, y: 0.5 }}
                        end={{ x: 0, y: 0.5 }}
                    >
                        <View style={styles.ofensiva}>
                            <MaterialCommunityIcons name="application-edit-outline" style={styles.consult} />
                            <Text style={styles.cnsultoriaText}>Consultorias</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={styles.removeAd}>
                    <MaterialCommunityIcons name="alert-outline" style={styles.alert} />
                    <Text style={styles.textRemoveAd}>App sem anúncio</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    globalContaine: {
        width: '100%',
        height: '100%',
        backgroundColor: "white",
        alignItems: "center",
    },
    containerExtras: {
        alignItems: "center",
    },
    title: {
        color: "#0C8ABF",
        fontSize: 30,
        margin: 10,
    },
    topTasksEfects: {
        width: 310,
        height: 90,
        borderRadius: 5,
        justifyContent: "center",
        marginBottom: 4,
    },
    consultoria: {
        width: 240,
        height: 60,
        borderRadius: 5,
        justifyContent: "center",
        marginBottom: 4,
    },
    removeAd: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        fontSize: 50,
        color: "#0C8ABF",
    },
    consult: {
        fontSize: 30,
        color: "#05BD2D",
    },
    alert: {
        fontSize: 50,
        color: "#0C8ABF",
    },
    textRemoveAd: {
        fontSize: 30,
        color: "#0C8ABF",
    },
    points: {
        color: 'white',
        fontSize: 24,
        fontWeight: '400',
    },
    textOfensiva: {
        color: 'white',
        fontSize: 24,
        width: 220,
    },
    cnsultoriaText: {
        color: 'white',
        fontSize: 24,
    },
    boxPoints: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    ofensiva: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }

})