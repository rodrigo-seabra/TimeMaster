import React, { useLayoutEffect } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Image
          source={require("../assets/photos/LogoInline.png")}
          style={{ width: 175, height: 60, marginLeft: 80, padding: 10 }}
        />
      ),
    });
  }, [navigation]);

  return null; 
};

export default CustomHeader;