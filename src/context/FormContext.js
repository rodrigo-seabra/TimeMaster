import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Calendar from 'expo-calendar';
import { Platform, Keyboard } from "react-native";


const FormContext = createContext();

export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useFormContext must be used within a FormProvider");
    }
    return context;
};

export const FormProvider = ({ children }) => {

    const [ calendario, setCalendario ] = useState(0);
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmSenha: "",
        nomeEvento: "",
        intalDate: "",
        finalDate: "",
        numero: "",
        rua: "",
        cidade: "",
        estado: "",
        pais: "",
    });

    const updateFormData = (campo, valor) => {
        setFormData((prevData) => ({
            ...prevData,
            [campo]: valor,
        }));
    };

    const resetFormData = () => {
        setFormData({
            nome: "",
            email: "",
            senha: "",
            confirmSenha: "",
            nomeEvento: "",
            intalDate: "",
            finalDate: "",
            numero: "",
            rua: "",
            cidade: "",
            estado: "",
            pais: "",
        });
    };

    const getListaDeEventos = async () => {
        try {
            const listaDeEventos = await AsyncStorage.getItem('listaDeEventos');
            return listaDeEventos ? JSON.parse(listaDeEventos) : [];
        } catch (error) {
            console.error('Erro ao obter lista de eventos:', error);
            return [];
        }
    };

    const adicionarEvento = async (novoEvento) => {
        try {
            let listaDeEventos = await getListaDeEventos();
            listaDeEventos.push(novoEvento);
            await AsyncStorage.setItem('listaDeEventos', JSON.stringify(listaDeEventos));
            console.log('Evento adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar evento:', error);
        }
    };


    async function addEvent(formData, selectedValue, contatoSelecionado)
    {
        const defaultCalendarSource =
        Platform.OS === 'ios'
            ? await Calendar.getDefaultCalendarAsync()
            : { isLocalAccount: true, name: 'Expo Calendar' };
        const newCalendarID = await AsyncStorage.getItem( "calendario" );
        setCalendario( newCalendarID );
        let calendario = await AsyncStorage.getItem("calendario");
        if (!calendario) {
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
            await AsyncStorage.setItem("calendario", newCalendarID);
            calendario = newCalendarID;
            setCalendario( newCalendarID );
        }
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
            notes: "nada",
        }
        Keyboard.dismiss();
        try {
            await Calendar.createEventAsync(calendario, newEvent)
        } catch (err) {
            console.error('Erro ao adicionar evento:', err);
        }
        const eventObject = {
            nomeEvento: formData.nomeEvento,
            initialDate: new Date(inicioData[2], inicioData[1] - 1, inicioData[0], inicioHora[0], inicioHora[1]),
            finalDate: new Date(finalData[2], finalData[1] - 1, finalData[0], finalHora[0], finalHora[1]),
            type: selectedValue,
            contatoParceiroNome: contatoSelecionado ? contatoSelecionado.name : '',
        };
        adicionarEvento(eventObject)
    }


    return (
        <FormContext.Provider value={{ formData, updateFormData, resetFormData, adicionarEvento, addEvent, calendario }}>
            {children}
        </FormContext.Provider>
    );
};
