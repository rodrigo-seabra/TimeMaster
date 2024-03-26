import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useState, useEffect, useLayoutEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//component para fazer uma box com gradiente
import { LinearGradient } from "expo-linear-gradient";
//contexto
import { UserContext } from "./context/UserContext";

//import async storage
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home() {
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

  //exibindo eventos vindo da async storage
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
  // Função para remover um evento da lista
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
      <View style={styles.topTasks}>
        <Text>Bem vindo: {usuario} </Text>
        <LinearGradient
          c
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
              <Text style={styles.eventoData}><MaterialCommunityIcons name="timer-outline"/>  {evento.initalDate} - {evento.finalDate}</Text>
              <TouchableOpacity onPress={() => removerEvento(index)} style={styles.removerButton}>
                <Text style={styles.removerButtonText}>Remover</Text>
              </TouchableOpacity>

            </View>
          ))}
        </LinearGradient>
      </View>
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
  globalContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
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

    fontWeight:'normal',
    fontStyle:'italic',
    fontSize: 18,
  },
  eventoData: {
    color: 'white',
    fontSize: 14,
  },
});
