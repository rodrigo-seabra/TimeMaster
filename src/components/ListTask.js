import { Text, View,  StyleSheet,  TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
//import async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

export default function ListTask() {
    const [tipoEvento, setTipoEvento] = useState('');
    const [eventosFiltrados, setEventosFiltrados] = useState([]);
    const [listaDeEventos, setListaDeEventos] = useState([]); //array com a lista do eventos
    const [filtro, setFiltro] = useState(false);

    const handleTipoEvento = (itemValue) => {
        setTipoEvento(itemValue);
        setFiltro(itemValue !== ''); // Atualiza o estado do filtro com base no valor selecionado
        if (itemValue !== '') {
            const eventosFiltrados = listaDeEventos.filter((evento) => {
                return evento.type.toLowerCase() === itemValue.toLowerCase();
            });
            setEventosFiltrados(eventosFiltrados);
        } else {
            setEventosFiltrados(listaDeEventos); // Exibe todos os eventos se nenhum filtro for selecionado
        }
    };

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
                        style: 'cancel',
                    },
                    {
                        text: 'Confirmar',
                        onPress: async () => {
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
    const formatarData = (data) => {
        const date = new Date(data);
        const dia = date.getDate().toString().padStart(2, '0');
        const mes = (date.getMonth() + 1).toString().padStart(2, '0');
        const hora = date.getHours().toString().padStart(2, '0');
        const minutos = date.getMinutes().toString().padStart(2, '0');
        return `${dia}/${mes} ${hora}:${minutos}`;
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
            {filtro ? eventosFiltrados.map((evento, index) => (
                <View key={index} style={styles.evento}>
                    <View style={styles.TextInfos}>
                        <Text style={styles.eventoNome}>{evento.nomeEvento} - <Text style={styles.tipoEvento}>{evento.type}</Text></Text>
                        <Text style={styles.eventoData}><MaterialCommunityIcons name="timer-outline" />  {formatarData(evento.initialDate)} - {formatarData(evento.finalDate)}</Text>
                    </View>
                    <TouchableOpacity onPress={() => removerEvento(index)} style={styles.removerButton}>
                        <MaterialCommunityIcons name="trash-can-outline" size={28} color="black" />
                    </TouchableOpacity>
                </View>
            )) : listaDeEventos.map((evento, index) => (
                <View key={index} style={styles.evento}>
                    <View style={styles.TextInfos}>
                        <Text style={styles.eventoNome}>{evento.nomeEvento} - <Text style={styles.tipoEvento}>{evento.type}</Text></Text>
                        <Text style={styles.eventoData}><MaterialCommunityIcons name="timer-outline" />  {formatarData(evento.initialDate)} - {formatarData(evento.finalDate)}</Text>
                    </View>
                    <TouchableOpacity onPress={() => removerEvento(index)} style={styles.removerButton}>
                        <MaterialCommunityIcons name="trash-can-outline" size={28} color="black" />
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
    },
    evento: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    removerButton: {
        backgroundColor: 'transparent',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
});