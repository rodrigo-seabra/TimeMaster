import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity, TextInput, } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
//import async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListTask() {
    const [tipoEvento, setTipoEvento] = useState('');
    const [eventosFiltrados, setEventosFiltrados] = useState([]);
    const [listaDeEventos, setListaDeEventos] = useState([]); //array com a lista do eventos

    const handleTipoEvento = (itemValue) => {
        setTipoEvento(itemValue);
        if (itemValue !== '') {
            const eventosFiltrados = listaDeEventos.filter((evento) => {
                console.log('Tipo do evento:', evento.type);
                console.log('Item selecionado:', itemValue);
                return evento.type.toLowerCase() === itemValue.toLowerCase();
            });
            console.log('Eventos filtrados:', eventosFiltrados);
            setEventosFiltrados(eventosFiltrados);
        } else {
            setEventosFiltrados(listaDeEventos); // Exibe todos os eventos se nenhum filtro for selecionado
        }
    };
    //exibindo os dados na tela
    useEffect(() => {
        // Função para obter a lista de eventos da AsyncStorage
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
        // Chamar a função para obter a lista de eventos ao carregar a tela
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
        <View style={styles.container}>
            <View style={styles.filtroContainer}>
                <Text style={styles.filtroText}>Filtrar por tipo:</Text>
                <Picker
                    style={styles.filtroPicker}
                    selectedValue={tipoEvento}
                    onValueChange={handleTipoEvento}
                >
                    <Picker.Item label="Todos" value="" />
                    <Picker.Item label="Estudo" value="Estudo" />
                    <Picker.Item label="Urgentes" value="Urgentes" />
                    <Picker.Item label="Evento" value="Evento" />
                    <Picker.Item label="Evento em conjunto" value="Evento em conjunto" />
                </Picker>
            </View>
            {eventosFiltrados.map((evento, index) => (
                <View key={index} style={styles.evento}>
                    <Text style={styles.eventoNome}>{evento.nomeEvento} - <Text style={styles.tipoEvento}>{evento.type}</Text></Text>
                    <Text style={styles.eventoData}><MaterialCommunityIcons name="timer-outline" />  {evento.initalDate} - {evento.finalDate}</Text>
                    <TouchableOpacity onPress={() => removerEvento(index)} style={styles.removerButton}>
                        <Text style={styles.removerButtonText}>Remover</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    )

}

const styles = StyleSheet.create({
    filtroContainer: {
        margin: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        backgroundColor: "#f9f9f9",
    },
    filtroText: {
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 10,
        color: '#7E7E7E'
    },
    filtroPicker: {
        flex: 1,
        marginLeft: 10,
    },
    listaItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#7E7E7E",
    },
    listaItemText: {
        fontSize: 16,
    },
    listagem: {
        width: 240,
    },
    evento: {
        marginBottom: 10,
        alignItems: 'center',
    },
    eventoNome: {
        color: '#7E7E7E',
        fontSize: 20,
        fontWeight: '600',
    },
    tipoEvento: {

        fontWeight: 'normal',
        fontStyle: 'italic',
        fontSize: 18,
    },
    container: {
        alignItems: "center",
    }
});