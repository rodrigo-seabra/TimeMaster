//imports da navegação nativa
import "react-native-gesture-handler";
//provedor do user
import UserProvider from "./src/context/UserContext";
//import routes
import Routes from "./src/Routes/routes";
import { FormProvider } from "./src/context/FormContext";

export default function App() {

  return (
    <UserProvider>
      <FormProvider>
        <Routes />
      </FormProvider>
    </UserProvider>
  );
}
