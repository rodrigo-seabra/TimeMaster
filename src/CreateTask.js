import { Image, Text, View, StyleSheet, Switch, Keyboard, Platform, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import * as Calendar from 'expo-calendar';
import uuid from "react-native-uuid"
import { Picker } from "@react-native-picker/picker";
//para alteração relacionadas ao react native navigation
import { useNavigation } from "@react-navigation/native";
//Contexto e formulario
import FormComponent from "./components/FormComponent";
import { FormProvider } from "./context/FormContext";
import { useFormContext } from "./context/FormContext";

//import async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Contacts from 'expo-contacts';
import { Modal } from "react-native";
import { Button } from "react-native";


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
  const { formData, updateFormData, resetFormData } = useFormContext();
  async function getPermission() {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    }
  }
  useEffect(() => {
    getPermission()
  }, [])

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
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await Calendar.getDefaultCalendarAsync()
        : { isLocalAccount: true, name: 'Expo Calendar' };

    //configuração de calendario
    const newCalendarID = await Calendar.createCalendarAsync({
      title: 'Expo Calendar',
      color: 'red',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });

    let inicioDataHora = formData.intalDate.split(" ");
    let inicioData = inicioDataHora[0].split("-")
    let inicioHora = inicioDataHora[1].split(".")

    let finalDataHora = formData.finalDate.split(" ");
    let finalData = finalDataHora[0].split("-")
    let finalHora = finalDataHora[1].split(".")


    const newEvent = {
      title: formData.nomeEvento,
      startDate: new Date(inicioData[2], inicioData[1] - 1, inicioData[0], inicioHora[0], inicioHora[1]),
      endDate: new Date(finalData[2], finalData[1] - 1, finalData[0], finalHora[0], finalHora[1]),
      location: "Sesi",
      notes: selectedValue,
    }

    Keyboard.dismiss();
    try {
      await Calendar.createEventAsync(newCalendarID, newEvent)
    } catch (err) {
      console.error('Erro ao adicionar evento:', err);
    }
    const eventObject = {
      nomeEvento: formData.nomeEvento,
      initalDate: new Date(inicioData[2], inicioData[1] - 1, inicioData[0], inicioHora[0], inicioHora[1]),
      finalDate: new Date(finalData[2], finalData[1] - 1, finalData[0], finalHora[0], finalHora[1]),
      type: selectedValue,
      contatoParceiroNome: contatoSelecionado ? contatoSelecionado.name : '',
    };
    adicionarEvento(eventObject);
    //Limpando os campos do form:
    resetFormData();
    // Adicionar o evento à lista de eventos
  }

  const [contatos, setContatos] = useState([]);
  const [contatoSelecionado, setContatoSelecionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const buscarContatos = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
      });
      if (data.length > 0) {
        setContatos(data);
      }
    }
  };

  useEffect(() => {
    buscarContatos();
  }, []);

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
          <View>
            <FormComponent date enventWithLocal />
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text>Selecionar Contatos</Text>
            </TouchableOpacity>
            {contatoSelecionado && (
              <Text>Contato selecionado: {contatoSelecionado.name}</Text>
            )}
          </View>
        ) : selectedValue === "Evento em conjunto" ? (
          <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text>Selecionar Contatos</Text>
            </TouchableOpacity>
            {contatoSelecionado && (
              <Text>Contato selecionado: {contatoSelecionado.name}</Text>
            )}
            <FormComponent date onSubmit={salvarTask} />

          </View>
        ) : (
          <View>
            <FormComponent date onSubmit={salvarTask} />
          </View>
        )}
        {erro && (<Text>Ocorreu um erro!</Text>)}

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View>
            <FlatList
              data={contatos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => {
                  setContatoSelecionado(item);
                  setModalVisible(false);
                }}>
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <Button
              title="Fechar"
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
        </Modal>
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