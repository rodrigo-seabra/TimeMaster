import { Image, Text, View, StyleSheet, Switch } from "react-native";
import React, { useState, useLayoutEffect } from "react";

import { Picker } from "@react-native-picker/picker";

//para alteração relacionadas ao react native navigation
import { useNavigation } from "@react-navigation/native";

//Contexto e formulario
import FormComponent from "./components/FormComponent";
import { FormProvider } from "./context/FormContext";

//import async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateTask() {
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

  //logica do switch
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  //informação do select
  const [selectedValue, setSelectedValue] = useState("Estudo");

  //msgError
  const [erro, setErro] = useState(false)


  // Função para obter a lista de eventos da AsyncStorage
  const getListaDeEventos = async () => {
    try {
      const listaDeEventos = await AsyncStorage.getItem('listaDeEventos');
      return listaDeEventos ? JSON.parse(listaDeEventos) : [];
    } catch (error) {
      console.error('Erro ao obter lista de eventos:', error);
      return [];
    }
  };
  // Função para adicionar um novo evento à lista de eventos na AsyncStorage
  const adicionarEvento = async (novoEvento) => {
    try {
      // Obter a lista atual de eventos
      let listaDeEventos = await getListaDeEventos();

      // Adicionar o novo evento à lista
      listaDeEventos.push(novoEvento);

      // Salvar a lista atualizada na AsyncStorage
      await AsyncStorage.setItem('listaDeEventos', JSON.stringify(listaDeEventos));

      console.log('Evento adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar evento:', error);
    }
  };

  //função de salvar task
  async function salvarTask(formData) {
    console.log(formData.nomeEvento, formData.intalDate, formData.finalDate);
    if (formData.nomeEvento !== "" && formData.intalDate && formData.finalDate) {
      const eventObject = {
        nomeEvento: formData.nomeEvento,
        initalDate: formData.intalDate,
        finalDate: formData.finalDate,
        type: selectedValue,
      };
      // Adicionar o evento à lista de eventos
      await adicionarEvento(eventObject);
    } else {
      setErro(true);
    }
  }

  return (
    <FormProvider>
      <View style={styles.Container}>
        <View>
          <Text>Selecione o tipo de evento</Text>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="Estudo" value="Estudo" />
            <Picker.Item label="Urgentes" value="Urgentes" />
            <Picker.Item label="Evento" value="Evento" />
            <Picker.Item
              label="Evento em conjunto"
              value="Evento em conjunto"
            />
          </Picker>
        </View>
        <View style={styles.EventWithLocal}>
          <Text>Evento com local</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        {isEnabled ? (
          <FormComponent style={styles.form} date enventWithLocal />
        ) : (
          <FormComponent date onSubmit={salvarTask} />
        )}
        {erro && (<Text>Ocorreu um erro!</Text>)}
      </View>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  form: {
    textAlign: "center",
  },
  Container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  EventWithLocal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
