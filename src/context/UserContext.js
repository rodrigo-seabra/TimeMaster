import { createContext } from "react";

export const UserContext = createContext()

function UserProvider ({children})
{
    return(
        <UserContext.Provider value={{usuario: "zago"}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;