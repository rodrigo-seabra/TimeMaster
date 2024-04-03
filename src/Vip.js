import React, { useLayoutEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Modal, Button, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const consultorias = [
    {
        id: 1,
        title: 'Consultoria 1',
        image: require('../assets/photos/consultor1.jpg'),
        description: 'Descrição da consultoria 1.',
    },
    {
        id: 2,
        title: 'Consultoria 2',
        image: require('../assets/photos/consultor2.jpg'),
        description: 'Descrição da consultoria 2.',
    },
    {
        id: 3,
        title: 'Consultoria 3',
        image: require('../assets/photos/consultor3.jpg'),
        description: 'Descrição da consultoria 3.',
    },
    {
        id: 4,
        title: 'Consultoria 4',
        image: require('../assets/photos/consultor4.jpg'),
        description: 'Descrição da consultoria 4.',
    }
];

export default function Vip() {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Image
                    source={require("../assets/photos/LogoInline.png")}
                    style={{ width: 200, height: 70, marginLeft: 80 }}
                />
            ),
        });
    }, [navigation]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedConsultoria, setSelectedConsultoria] = useState(null);

    const handleConsultoriaPress = (id) => {
        const consultoria = consultorias.find((item) => item.id === id);
        setSelectedConsultoria(consultoria);
        setModalVisible(true);
    };
    return (
        <View style={styles.container}>
            <View style={styles.consultContainer}>
                <LinearGradient
                    colors={[
                        "#8EFFA7",
                        "#5CE97B",
                        "#5CE97B",
                        "#05BD2D",
                    ]}
                    style={styles.titleContainer}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                >
                    <MaterialCommunityIcons name="card-account-details-star-outline" color="#05BD2D" size={48} />
                    <Text style={styles.topTitle}>Consultoria</Text>
                </LinearGradient>
                <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                    {consultorias.map((consultoria) => (
                        <TouchableOpacity
                            key={consultoria.id}
                            style={styles.consultoria}
                            onPress={() => handleConsultoriaPress(consultoria.id)}>
                            <Image source={consultoria.image} style={styles.consultorImage} />
                            <View style={styles.detalhes} >
                                <Text style={styles.consultoriaTitle}>{consultoria.title}</Text>
                                <TouchableOpacity style={styles.button}
                                    key={consultoria.id}
                                    onPress={() => handleConsultoriaPress(consultoria.id)}
                                >
                                    <LinearGradient
                                        colors={['#8EFFA7', '#5CE97B', '#5CE97B', '#05BD2D']}
                                        style={styles.buttonGradient}
                                        start={{ x: 0, y: 0.5 }}
                                        end={{ x: 1, y: 0.5 }}>
                                        <Text style={styles.buttonText}>Ver detalhes</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{selectedConsultoria?.title}</Text>
                            <Text style={styles.modalDescription}>{selectedConsultoria?.description}</Text>
                            <Button title="Fechar" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </Modal>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    consultContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    topTitle: {
        fontSize: 28,
        color: 'white',

    },
    titleContainer: {
        width: '75%',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    consultoria: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '80%',
    },
    consultorImage: {
        width: 70,
        height: 70,
        borderRadius: 30,
        marginRight: 20,
    },
    consultoriaTitle: {
        color: '#7E7E7E',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalDescription: {
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        marginTop: 5,
    },
    buttonGradient: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    scrollContainer: {
        width: '100%',
        marginTop: 50,
    },
    scrollContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
});
