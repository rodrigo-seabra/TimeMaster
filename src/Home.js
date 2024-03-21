import { Text, View, Image, StyleSheet } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
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
  return (
    <View style={styles.globalContainer}>
      <View style={styles.topTasks}>
        <LinearGradient
          c
          colors={[
            "rgba(160, 69, 69, 1)",
            "rgba(210, 84, 84, 1)",
            "rgba(221, 111, 111, 1)",
            "rgba(253, 153, 153, 1)",
          ]}
          style={styles.topTasksEfects}
          start={{ x: 1, y: 0.5 }}
          end={{ x: 0, y: 0.5 }}
        >
          <View style={styles.infos}>
            <MaterialCommunityIcons name="fire" style={styles.fire} />
            <Text style={styles.MaisImportante}>+ Importantes hoje</Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topTasksEfects: {
    width: 310,
    height: 210,
    borderRadius: 5,
  },
  infos: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  fire: {
    fontSize: 50,
    color: "rgba(160, 69, 69, 1)",
  },
  topTasks: {
    alignItems: "center",
  },
  MaisImportante: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  globalContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
