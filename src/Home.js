import { Text, View, Image, StyleSheet } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation } from '@react-navigation/native';
export default function Home() {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Image
                    source={require('../assets/photos/LogoInline.png')}
                    style={{ width: 200, height: 70, marginLeft: 80 }}
                />
            ),
        });
    }, [navigation]);
    return (
        <View>
            <Text>HOME</Text>
            <View style={styles.topTasks}>
                <View style={styles.topTasksEfects}>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topTasksEfects: {
        width: 300,
        height: 100,
        borderRadius: 5,
        // Gradient background
        backgroundColor: 'rgb(221, 111, 111 )',
        backgroundImage: 'linear-gradient(290deg, rgba(160, 69, 69, 1) 0%, rgba(210, 84, 84, 1) 35%, rgba(221, 111, 111, 1) 55%, rgba(253, 153, 153, 1) 90%)',
        // Fallback background color if linear gradient is not supported
        fallback: {
            backgroundColor: 'rgb(160, 69, 69)',
        },
    },
    topTasks: {
        alignItems: 'center',
    }
});

