//Components do react native
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
//hooks do react
import { useState, useEffect, useLayoutEffect } from "react";

//import async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

//usecontext
import { FormProvider } from "./context/FormContext";
import FormComponent from "./components/FormComponent";

export default function LoginECadastro({ setLogado }) {
  //gerenciadores da aparencia das telas
  const [cadastro, setCadastro] = useState(false);
  const [login, setLogin] = useState(true);
  const [recuperSenha, setRecuperarSenha] = useState(false);

  //erroMsg
  const [erro, setErro] = useState(false);

  async function RealizarLogin(formData) {
    if (formData.email == "rodrigo@1" && formData.senha == "123") {
      await AsyncStorage.setItem("usuario", formData.email);
      setLogado(true);
    } else {
      setErro(true);
    }
  }
  return (
    <FormProvider>
      <View style={styles.Container}>
        {cadastro && (
          <View>
            <View style={styles.BoxTitle}>
              <Text style={styles.title}>Cadastro</Text>
            </View>
            <FormComponent
              mostrarNome
              mostrarEmail
              mostrarConfirmarSenha
              mostrarSenha
            />
            <TouchableOpacity
              onPress={() => (setCadastro(false), setLogin(true))}
              style={styles.trocaForm}
            >
              <Text style={styles.TextTrocaForm}>Já tem uma conta</Text>
            </TouchableOpacity>
          </View>
        )}
        {login && (
          <View>
            <View style={styles.BoxTitle}>
              <Text style={styles.title}>Login</Text>
            </View>
            <FormComponent mostrarEmail mostrarSenha onSubmit={RealizarLogin} />
            <TouchableOpacity
              onPress={() => (setLogin(false), setCadastro(true))}
              style={styles.trocaForm}
            >
              <Text style={styles.TextTrocaForm}>Ainda não é usuário?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => (setLogin(false), setRecuperarSenha(true))}
              style={styles.trocaForm}
            >
              <Text style={styles.TextTrocaForm}>Esqueceu a senha?</Text>
            </TouchableOpacity>
            {erro && <Text>Dados inválidos</Text>}
          </View>
        )}
        {recuperSenha && (
          <View>
            <View style={styles.BoxTitle}>
              <Text style={styles.title}>Login</Text>
            </View>
            <FormComponent mostrarEmail />
            <TouchableOpacity
              onPress={() => (setRecuperarSenha(false), setLogin(true))}
              style={styles.trocaForm}
            >
              <Text style={styles.TextTrocaForm}>Voltar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  BoxImage: {
    width: "100%",
    alignItems: "center",
  },
  trocaForm: {
    alignItems: "center",
  },
  TextTrocaForm: {
    color: "rgba(126,126,126,1)",
    borderBottomColor: "#00A2FF",
    borderBottomWidth: 2,
  },
  BoxTitle: {
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    color: "#00A2FF",
  },
  Container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});
