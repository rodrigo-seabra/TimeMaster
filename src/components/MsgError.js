import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
//component para fazer uma box com gradiente
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

export default function MsgError({ bateria, internet }) {
    return (
        <View>
            {bateria && (<LinearGradient
                colors={[
                    "#FF9C07",
                    "#FDB852",
                    "#FFD697",
                    "#FFF5E5",
                ]}
                style={styles.msgSemBateria}
                start={{ x: 1, y: 0.5 }}
                end={{ x: 0, y: 0.5 }}
            >
                <MaterialCommunityIcons name="alert-outline" style={styles.alertBateria} />
                <Text style={styles.msgAlertBateria}>Pouca bateria, desligue o celular</Text>
            </LinearGradient>)}
            {internet && (<LinearGradient
                colors={[
                    "#FF9C07",
                    "#FDB852",
                    "#FFD697",
                    "#FFF5E5",
                ]}
                style={styles.msgSemBateria}
                start={{ x: 1, y: 0.5 }}
                end={{ x: 0, y: 0.5 }}
            >
                <MaterialCommunityIcons name="alert-outline" style={styles.alertBateria} />
                <Text style={styles.msgAlertBateria}>Sem rede disponivel</Text>
            </LinearGradient>)}
        </View>
    );
}

const styles = StyleSheet.create({
    msgSemBateria: {
        width: 240,
        height: 60,
        borderRadius: 5,
        justifyContent: 'space-evenly',
        marginBottom: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    alertBateria: {
        color: "#FF9C07",
        fontSize: 30,
    },
    msgAlertBateria: {
        width: 170,
        color: "#7E7E7E",
        fontSize: 16,
    }
})