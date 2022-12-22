import React, { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
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
      // source={{ uri: 'loginbglatest' }}
      source={require('../Images/splashhere.jpg')}
      style={{ flex: 1 }}
      resizeMode={'cover'}></ImageBackground>
  );
};

export default Splash;
const styles = StyleSheet.create({});










// import React from 'react';
// import { StyleSheet, ImageBackground } from 'react-native';
// import { useLinkProps, useNavigation, CommonActions } from '@react-navigation/native';

// const Splash = () => {

//   const navigation = useNavigation();
//   const handleNavigate = (routeName, clearStack, params) => {
//     navigation.navigate(routeName, params);
//     if (clearStack) {
//       console.log("Clear")
//     }

//   }

//   setTimeout(() => {
//     navigation.dispatch(
//       CommonActions.reset({
//         index: 1,
//         routes: [{ name: 'MobileNumperEnter' }],
//       }),
//     );
//     handleNavigate("MobileNumperEnter")
//   }, 40000)

//   return (
//     <ImageBackground
//       source={require('../Images/splashhere.jpg')}
//       style={{ flex: 1 }}
//       resizeMode={"cover"}>
//     </ImageBackground>
//   );
// }

// export default Splash;
// const styles = StyleSheet.create({
// });
