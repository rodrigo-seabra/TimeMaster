import { Image, Text, View, StyleSheet } from "react-native";
import React from "react";

import { FormProvider } from "./context/FormContext";

//Components
import FormComponent from "./components/FormComponent";

export default function CreateTask() {
    return (
        <FormProvider>
            <View style={styles.Container}>
                <View>
                    <Image source={require('../assets/photos/Logo.png')} />
                </View>
                <FormComponent
                    style={styles.form}
                    enventWithLocal
                />
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
        flexDirection: "column",
        alignItems: "center"
    }
})
