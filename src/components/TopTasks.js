import { Text, View,StyleSheet,  TouchableOpacity, Alert } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Calendar from 'expo-calendar';

import { useFormContext } from "../context/FormContext";
//component para fazer uma box com gradiente
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
//import async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TopTasks() {
    const [listaDeEventos, setListaDeEventos] = useState([]);


    useEffect(() => {
        const getListaDeEventos = async () => {
            try {
                const lista = await AsyncStorage.getItem('listaDeEventos');
                if (lista) {
                    setListaDeEventos(JSON.parse(lista));
                }
            } catch (error) {
                console.error('Erro ao obter lista de eventos:', error);
            }
        };
        getListaDeEventos();
    }, [listaDeEventos]);
    const removerEvento = async (index) => {
        try {
            let novaListaDeEventos = [...listaDeEventos];
            novaListaDeEventos.splice(index, 1);
            setListaDeEventos(novaListaDeEventos);
            Alert.alert(
                'Excluir',
                'Você tem certeza que deseja excluir?',
                [
                    {
                        text: 'Cancelar',
                        onPress: () => console.log('Cancelado'),
                        style: 'cancel',
                    },
                    {
                        text: 'Confirmar',
                        onPress: async () => {
                            console.log('Evento removido com sucesso!');
                            await AsyncStorage.setItem('listaDeEventos', JSON.stringify(novaListaDeEventos));
                            setListaDeEventos(novaListaDeEventos);
                            Alert.alert('Sucesso', 'Evento removido com sucesso!');
                        },
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error('Erro ao remover evento:', error);
            alert('Erro ao remover evento:', error);
        }
    };

    return (
        <View style={styles.topTasks}>
            <LinearGradient
                colors={[
                    "rgba(160, 69, 69, 1)",
                    "rgba(210, 84, 84, 1)",
                    "rgba(221, 111, 111, 1)",
                    "rgba(253, 153, 153, 1)",
                ]}
                style={styles.topTasksEfects}
                start={{ x: 1, y: 0.5 }}
                end={{ x: 0, y: 0.5 }}
            >
                <View style={styles.infos}>
                    <MaterialCommunityIcons name="fire" style={styles.fire} />
                    <Text style={styles.MaisImportante}>+ Importantes hoje</Text>
                </View>
                {listaDeEventos.slice(0, 2).map((evento, index) => {
                    const initialDate = new Date(evento.initialDate);
                    const finalDate = new Date(evento.finalDate);

                    const formattedInitialDate = `${initialDate.getDate()}/${initialDate.getMonth() + 1} ${initialDate.getHours()}:${initialDate.getMinutes()}`;
                    const formattedFinalDate = `${finalDate.getDate()}/${finalDate.getMonth() + 1} ${finalDate.getHours()}:${finalDate.getMinutes()}`;

                    return (
                        <View key={index} style={styles.evento}>
                            <View style={styles.TextInfos}>
                                <Text style={styles.eventoNome}>{evento.nomeEvento} - <Text style={styles.tipoEvento}>{evento.type}</Text></Text>
                                <Text style={styles.eventoData}><MaterialCommunityIcons name="timer-outline" />  {formattedInitialDate} - {formattedFinalDate}</Text>
                            </View>
                            <TouchableOpacity onPress={() => removerEvento(index)} style={styles.removerButton}>
                                <MaterialCommunityIcons name="trash-can-outline" size={28} color="white" />
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </LinearGradient>
        </View>
    );
}


const styles = StyleSheet.create({
    topTasksEfects: {
        width: 315,
        height: 210,
        borderRadius: 5,
    },
    infos: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    fire: {
        fontSize: 50,
        color: "rgba(160, 69, 69, 1)",
    },
    topTasks: {
        alignItems: "center",
    },
    MaisImportante: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
    evento: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    eventoNome: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
    tipoEvento: {

        fontWeight: 'normal',
        fontStyle: 'italic',
        fontSize: 18,
    },
    eventoData: {
        color: 'white',
        fontSize: 14,
    },
    removerButton: {
        backgroundColor: 'transparent',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
})