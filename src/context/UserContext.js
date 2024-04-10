import { createContext, useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';

//import async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext()

function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [logado, setLogado] = useState(false)

    //cadastro de user
    async function RealizarCadastro(formData) {
        if (formData.nome && formData.email && formData.senha) {
            // Verificar se o nome contém apenas letras
            if (formData.nome.match(/^\D+$/) === null) {
                console.log("O nome deve conter apenas letras");
                return;
            }
            // Criar um objeto com os dados do usuário
            const user = {
                nome: formData.nome,
                email: formData.email,
                senha: formData.senha,
            };

            // Salvar os dados do usuário no AsyncStorage
            try {
                await AsyncStorage.setItem("user", JSON.stringify(user));
                console.log("Cadastro realizado com sucesso!");
                setLogado(true)
            } catch (error) {
                console.error("Erro ao salvar os dados do usuário:", error);
            }
        } else {
            console.log("Dados inválidos");
        }
    }


    //login
    async function RealizarLogin(formData) {
        // Recuperar os dados do usuário do AsyncStorage
        const userData = await AsyncStorage.getItem("user");
        if (!userData) {
            console.log("Usuário não encontrado");
            return;
        }

        // Parse dos dados do usuário para um objeto
        const user = JSON.parse(userData);

        // Verificar se o email e a senha estão corretos
        if (formData.email === user.email && formData.senha === user.senha) {
            await AsyncStorage.setItem("usuario", formData.email);
            setLogado(true);
            console.log("Login realizado com sucesso!");
        } else {
            console.log("Email ou senha incorretos");
        }
    }
    async function infoUsuario() {
        const usuarioData = await AsyncStorage.getItem("user")
        const usuario = JSON.parse(usuarioData);
        if (usuario) {
            setUser(usuario)
            setLogado(true)
        }
    }
    useEffect(() => {
        infoUsuario();
    }, [])
    return (
        <UserContext.Provider value={{ usuario: user, logado: logado, RealizarLogin, infoUsuario, RealizarCadastro }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;