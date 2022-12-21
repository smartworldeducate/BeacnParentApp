import React, {useEffect, useState} from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import {
  useLinkProps,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const [intialRoute, setIntialRoute] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    getToken();
  }, []);
  useEffect(() => {
    if (intialRoute != '') {
      handleNavigate(intialRoute);
    }
  }, [intialRoute]);
  const handleNavigate = routeName => {
    navigation.navigate(routeName);
  };
  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token, 'token');
    if (token != undefined) {
      setIntialRoute('HomeScreen');
    } else {
      setIntialRoute('MobileNumperEnter');
    }
  };

  return (
    <ImageBackground
      source={{uri: 'mainsplashhere'}}
      style={{flex: 1}}
      resizeMode={'cover'}></ImageBackground>
  );
};

export default Splash;
const styles = StyleSheet.create({});
