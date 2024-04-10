import { Image, Text, View, StyleSheet, Switch, Keyboard, Platform, FlatList, TouchableOpacity, ScrollView } from "react-native";
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

import { useBatteryLevel } from 'expo-battery';
import MsgError from "./components/MsgError";
import CustomHeader from "./CustomHeader";



export default function CreateTask() {
    const [bateria, setBateria] = useState()
    const batteryLevel = useBatteryLevel();
    const [exibirContatos, setExibirContatos] = useState(false)
    const [permissionGranted, setPermissionGranted] = useState(false);


    const getPermission = async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
            setPermissionGranted(true);
        }
    };

    useEffect(() => {
        getPermission();
    }, []);


    useEffect(() => {
        setBateria((batteryLevel * 100).toFixed(0))
    }, [batteryLevel])

    const { formData, updateFormData, resetFormData, adicionarEvento, addEvent } = useFormContext();


    //logica do switch
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    //informação do select
    const [selectedValue, setSelectedValue] = useState("Estudo");
    //msgError
    const [erro, setErro] = useState(false)



    useEffect (() => {
        if(selectedValue == "Evento em conjunto")
        {
            setExibirContatos(true)
        }else{
            setExibirContatos(false)
        }
    }, [selectedValue])



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
        <View>
            <CustomHeader />
            {bateria < 20 ? (<View style={styles.containerCreate}><MsgError bateria /></View>) : (
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
                        {exibirContatos && (<>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => setModalVisible(true)}
                            >
                                <Text style={styles.buttonText}>Selecionar Contatos</Text>
                            </TouchableOpacity>
                            {contatoSelecionado && (
                                <Text style={styles.selectedContactText}>
                                    Contato selecionado: {contatoSelecionado.name}
                                </Text>
                            )}
                        </>)}
                        {isEnabled ? (
                            <View style={styles.containerScroll}>
                                <ScrollView>
                                    <FormComponent date enventWithLocal onSubmit={addEvent} selectedValue={selectedValue} contatoSelecionado={contatoSelecionado} />
                                </ScrollView>
                            </View>
                        ) : (
                            <View>
                                <FormComponent date onSubmit={addEvent} selectedValue={selectedValue} contatoSelecionado={contatoSelecionado} />
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
                            <View style={styles.modalContainer}>
                                <FlatList
                                    data={contatos}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.itemContainer}
                                            onPress={() => {
                                                setContatoSelecionado(item);
                                                setModalVisible(false);
                                            }}
                                        >
                                            <Text style={styles.itemText}>{item.name}</Text>
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
            )}
        </View>


    );
}

const styles = StyleSheet.create({
    containerScroll: {
        flex: 1,
        padding: 10,
    },
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
    containerCreate:
    {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    itemText: {
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
    selectedContactText: {
        marginTop: 10,
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
});