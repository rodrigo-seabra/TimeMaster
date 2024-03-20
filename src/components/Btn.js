import React from "react"
import { TouchableOpacity } from "react-native"
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native"

export default function Btn({text, onPress})
{
    return(
        <View>
            <TouchableOpacity style={styles.Btn} onPress={onPress}>
                <Text>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    Btn: {
      marginTop: 20,
      width: 280,
      height: 45,
      paddingLeft: 105,
      paddingRight: 113,
      paddingTop: 5,
      paddingBottom: 14,
      borderWidth: 3,
      borderColor: "rgba(0,162,255,1)",
      boxSizing: "border-box",
    },
    Login: {
      color: "rgba(126,126,126,1)",
      fontSize: 20,
      lineHeight: 20,
      fontWeight: '400',
    },
  })
  
