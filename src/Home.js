import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity, TextInput, } from "react-native";
import { useState, useEffect, useLayoutEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
//recurso do celular
import { useBatteryLevel } from 'expo-battery';
//component para fazer uma box com gradiente
import { LinearGradient } from "expo-linear-gradient";
//contexto
import { UserContext } from "./context/UserContext";

import MsgError from "./components/MsgError";
import TopTasks from "./components/TopTasks";
import { Picker } from "@react-native-picker/picker";
//import async storage
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home() {
  const { usuario } = useContext(UserContext)
  const [bateria, setBateria] = useState()
  const batteryLevel = useBatteryLevel();
  useEffect(() => {
    setBateria((batteryLevel * 100).toFixed(0))
  }, [batteryLevel])
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


  const [tipoEvento, setTipoEvento] = useState('');
  const [eventosFiltrados, setEventosFiltrados] = useState([]);

  const handleTipoEvento = (itemValue) => {
    setTipoEvento(itemValue);
    if (itemValue !== '') {
      const eventosFiltrados = listaDeEventos.filter((evento) => {
        return evento.type.toLowerCase() === itemValue.toLowerCase();
      });
      setEventosFiltrados(eventosFiltrados);
    } else {
      setEventosFiltrados(listaDeEventos); // Exibe todos os eventos se nenhum filtro for selecionado
    }
  };
  const [listaDeEventos, setListaDeEventos] = useState([]); //array com a lista do eventos
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
    <View style={styles.globalContainer}>
      {bateria < 20 && (
        <MsgError bateria />
      )}
      <Text>Bem vindo: {usuario} </Text>
      <TopTasks />
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
      <FlatList
        data={eventosFiltrados}
        keyExtractor={(item) => item.nomeEvento}
        renderItem={({ item, index }) => (
          <View>
            <Text style={styles.eventoNome}>{item.nomeEvento} - <Text style={styles.tipoEvento}>{item.type}</Text></Text>
            <Text style={styles.eventoData}><MaterialCommunityIcons name="timer-outline" />  {item.initalDate} - {item.finalDate}</Text>
            <TouchableOpacity onPress={() => removerEvento(index)} style={styles.removerButton}>
              <Text style={styles.removerButtonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
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
});
