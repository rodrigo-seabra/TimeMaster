import { Text, View, StyleSheet, Image } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";

import { useNavigation } from "@react-navigation/native";

//usecontext
import { FormProvider } from "./context/FormContext";
import FormComponent from "./components/FormComponent";
import { TouchableOpacity } from "react-native";

export default function LoginECadastro() {
  const [cadastro, setCadastro] = useState(false);
  const [login, setLogin] = useState(true);
  const [recuperSenha, setRecuperarSenha] = useState(false);
  const navigation = useNavigation();

  function RealizarLogin(formData) {
    console.log(formData);
  }

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
  // useEffect(() => {
  //     if(cadastro)
  //     {
  //         navigation.setOptions({
  //             title: 'Cadastre-se',
  //           });
  //     }else if (login)
  //     {
  //         navigation.setOptions({
  //             title: 'Login',
  //           });
  //     }else if(recuperSenha)
  //     {
  //         navigation.setOptions({
  //             title: 'Recuperar Senha',
  //           });
  //     }else{
  //         navigation.setOptions({
  //             title: 'Time Master',
  //           });
  //     }
  //   }, [cadastro, login, recuperSenha]);
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
          </View>
        )}
        {recuperSenha && (
          <View>
            <View style={styles.BoxTitle}>
              <Text style={styles.title}>Login</Text>
            </View>
            <FormComponent mostrarEmail />
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
