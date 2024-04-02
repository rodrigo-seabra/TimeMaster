import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//component para fazer uma box com gradiente
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect, useLayoutEffect, useContext } from "react";
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
            await AsyncStorage.setItem('listaDeEventos', JSON.stringify(novaListaDeEventos));
            setListaDeEventos(novaListaDeEventos);
            console.log('Evento removido com sucesso!');
        } catch (error) {
            console.error('Erro ao remover evento:', error);
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
                {listaDeEventos.slice(0, 2).map((evento, index) => (
                    <View key={index} style={styles.evento}>
                        <Text style={styles.eventoNome}>{evento.nomeEvento} - <Text style={styles.tipoEvento}>{evento.type}</Text></Text>
                        <Text style={styles.eventoData}><MaterialCommunityIcons name="timer-outline" />  {evento.initalDate} - {evento.finalDate}</Text>
                        <TouchableOpacity onPress={() => removerEvento(index)} style={styles.removerButton}>
                            <Text style={styles.removerButtonText}>Remover</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </LinearGradient>
        </View>
    );
}


const styles = StyleSheet.create({
    topTasksEfects: {
        width: 310,
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
})