import "react-native-gesture-handler";
import UserProvider from "./src/context/UserContext";
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
