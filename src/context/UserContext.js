import { createContext, useEffect, useState } from "react";

//import async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext()

function UserProvider ({children})
{
    const [user, setUser] = useState(null)
    const [logado, setLogado] = useState(false)


    async function RealizarLogin(formData) {
        if (formData.email == "rodrigo@1" && formData.senha == "123") {
          await AsyncStorage.setItem("usuario", formData.email);
          setLogado(true);
        } 
      }

    async function infoUsuario()
    {
        const usuario = await AsyncStorage.getItem("usuario")
        if ( usuario ){
                    setUser(usuario)

            setLogado(true)
        }
    }
    useEffect(()=> {
        infoUsuario();
    },[])
    return(
        <UserContext.Provider value={{usuario: user, logado:logado, RealizarLogin, infoUsuario }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;