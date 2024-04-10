//Components do react native
import { View, StyleSheet, TextInput } from "react-native";

//hooks do react
import React, { useState } from "react";
//importando o contexto de formulario
import { useFormContext } from "../context/FormContext";
//components
import Btn from "./Btn";

export default function FormComponent({
  onSubmit,
  mostrarNome,
  mostrarEmail,
  mostrarSenha,
  mostrarConfirmarSenha,
  date,
  enventWithLocal,
  selectedValue, 
  contatoSelecionado
}) {
  const { formData, updateFormData, resetFormData } = useFormContext();

  const handleChange = (campo, valor) => {
    updateFormData(campo, valor);
  };

  const handleSubmit = () => {

    if (formData.nome != "") {
      if (formData.nome.match(/^\D+$/) === null) {
        console.log("O nome deve conter apenas letras");
        return;
      }
    }
    if (formData.senha != "") {
      if (formData.senha !== formData.confirmSenha) {
        console.log("As senhas não conferem");
        return;
      }
    }
    onSubmit(formData, selectedValue, contatoSelecionado );
    resetFormData();
  };

  return (
    <View style={styles.ContainerGlobal}>
      {mostrarNome && (
        <View style={styles.InputDiv}>
          <TextInput
            style={styles.placeholder}
            placeholder="Nome"
            value={formData.nome}
            onChangeText={(texto) => handleChange("nome", texto)}
          />
        </View>
      )}
      {mostrarEmail && (
        <View style={styles.InputDiv}>
          <TextInput
            style={styles.placeholder}
            placeholder="Email"
            value={formData.email}
            onChangeText={(texto) => handleChange("email", texto)}
          />
        </View>
      )}
      {mostrarSenha && (
        <View style={styles.InputDiv}>
          <TextInput
            style={styles.placeholder}
            placeholder="Senha"
            value={formData.senha}
            onChangeText={(texto) => handleChange("senha", texto)}
          />
        </View>
      )}
      {mostrarConfirmarSenha && (
        <View style={styles.InputDiv}>
          <TextInput
            style={styles.placeholder}
            placeholder="Confirmar senha"
            value={formData.confirmSenha}
            onChangeText={(texto) => handleChange("confirmSenha", texto)}
          />
        </View>
      )}
      {date && (
        <View>
          <View style={styles.InputDiv}>
            <TextInput
              style={styles.placeholder}
              placeholder="Nome do envento"
              value={formData.nomeEvento}
              TextInput={formData.nomeEvento}

              onChangeText={(texto) => handleChange("nomeEvento", texto)}
            />
          </View>
          <View style={styles.InputDiv}>
            <TextInput
              style={styles.placeholder}
              placeholder="Data de inicio"
              value={formData.intalDate}
              TextInput={formData.intalDate}

              onChangeText={(texto) => handleChange("intalDate", texto)}
            />
          </View>
          <View style={styles.InputDiv}>
            <TextInput
              style={styles.placeholder}
              placeholder="Data de término"
              value={formData.finalDate}
              TextInput={formData.finalDate}
              onChangeText={(texto) => handleChange("finalDate", texto)}
            />
          </View>
        </View>
      )}
      {enventWithLocal && (
        <View style={styles.containerLocal}>
          <View style={styles.InputDivRua}>
            <TextInput
              style={styles.placeholder}
              placeholder="Rua"
              value={formData.rua}
              onChangeText={(texto) => handleChange("rua", texto)}
            />
          </View>
          <View style={styles.containerDivisoes}>
            <View style={styles.InputDivNumero}>
              <TextInput
                style={styles.placeholder}
                placeholder="N°"
                value={formData.numero}
                keyboardType="numeric"
                onChangeText={(texto) => handleChange("numero", texto)}
              />
            </View>
            <View style={styles.InputDivCidade}>
              <TextInput
                style={styles.placeholder}
                placeholder="Cidade"
                value={formData.cidade}
                onChangeText={(texto) => handleChange("cidade", texto)}
              />
            </View>
          </View>
          <View style={styles.containerDivisoes}>
            <View style={styles.InputDivEstado}>
              <TextInput
                style={styles.placeholder}
                placeholder="Estado"
                value={formData.estado}
                onChangeText={(texto) => handleChange("estado", texto)}
              />
            </View>
            <View style={styles.InputDivPais}>
              <TextInput
                style={styles.placeholder}
                placeholder="País"
                value={formData.pais}
                onChangeText={(texto) => handleChange("pais", texto)}
              />
            </View>
          </View>
        </View>
      )}
      <View style={styles.btnSubmit}>
        <Btn text={"Enviar"} onPress={() => handleSubmit()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ContainerGlobal: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  InputDiv: {
    width: 325,
    height: 65,
    paddingRight: 155,
    paddingTop: 32,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderColor: "rgba(0,162,255,1)",
    boxSizing: "border-box",
  },
  containerLocal: {},
  InputDivRua: {
    width: 325,
    height: 65,
    paddingTop: 32,
    paddingBottom: 10,
    marginLeft: 10,
    borderBottomWidth: 3,
    borderColor: "rgba(0,162,255,1)",
    boxSizing: "border-box",
  },
  InputDivNumero: {
    width: "15%",
    height: 65,
    paddingTop: 32,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderColor: "rgba(0,162,255,1)",
    boxSizing: "border-box",
  },
  InputDivCidade: {
    width: "75%",
    height: 65,
    paddingTop: 32,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderColor: "rgba(0,162,255,1)",
    boxSizing: "border-box",
  },
  InputDivPais: {
    width: "45%",
    height: 65,
    paddingTop: 32,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderColor: "rgba(0,162,255,1)",
    boxSizing: "border-box",
  },
  InputDivEstado: {
    width: "45%",
    height: 65,
    paddingTop: 32,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderColor: "rgba(0,162,255,1)",
    boxSizing: "border-box",
  },
  placeholder: {
    color: "rgba(126,126,126,1)",
    fontSize: 20,
    lineHeight: 20,
    fontWeight: "400",
  },
  containerDivisoes: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  btnSubmit: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
