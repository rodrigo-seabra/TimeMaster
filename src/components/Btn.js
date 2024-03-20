import React from "react"
import { TouchableOpacity } from "react-native"
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native"

export default function Btn({text, onPress})
{
    return(
        <View>
            <TouchableOpacity style={styles.Btn} onPress={onPress}>
                <Text style={styles.Login}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    Btn: {
      marginTop: 20,
      width: 160,
      height: 45,
      paddingTop: 3,
      borderWidth: 3,
      borderColor: "rgba(0,162,255,1)",
      boxSizing: "border-box",
    },
    Login: {
      color: "rgba(126,126,126,1)",
      fontSize: 20,
      textAlign: 'center',
      textAlignVertical: "center",
      fontWeight: '400',
    },
  })
  
