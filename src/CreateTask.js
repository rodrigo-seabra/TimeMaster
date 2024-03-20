import { Image, Text, View, StyleSheet, Switch } from "react-native";
import React, { useState, useLayoutEffect } from "react";

import { Picker } from "@react-native-picker/picker";

//para alteração relacionadas ao react native navigation
import { useNavigation } from "@react-navigation/native";

//Contexto e formulario
import FormComponent from "./components/FormComponent";
import { FormProvider } from "./context/FormContext";

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
      tabBarStyle: { display: "none" }, // Oculta a barra de navegação inferior
    });
  }, [navigation]);

  //logica do switch
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  //informação do select
  const [selectedValue, setSelectedValue] = useState("Estudo");

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
          <FormComponent date />
        )}
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
