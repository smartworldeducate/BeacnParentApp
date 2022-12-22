import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Appearance,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  useLinkProps,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';

// or ES6+ destructured imports

import { getUniqueId, getManufacturer } from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../Styles/colors';
import fontFamily from '../Styles/fontFamily';
import Button from '../Components/Button/Button';
import TextInputCustom from '../Components/TextInput/TextInput';

import { useDispatch, useSelector } from 'react-redux';
import {
  clearState,
  createPost,
} from '../Redux/Features/PhoneNumberSignUp/PhoneNumberSignUp';
import Toast from 'react-native-toast-message';
import Loader from '../Components/Loader/Loader';

const MobileNumperEnter = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  Appearance.addChangeListener(scheme => {
    // console.log("scheme", scheme.colorScheme);
    setTheme(scheme.colorScheme);
  });

  useEffect(() => { }, [theme]);

  console.log('theme', theme);

  const dispatch = useDispatch();
  const post = useSelector(state => state.post);
  console.log(post, 'post');
  const [inputContactState, setInputContactState] = useState('');
  const [values, setValues] = useState({ sms_number: '' });
  const [deviceType, setDeviceType] = useState('android');
  const [deviceIdentifier, setDeviceIdentifier] = useState('asdf');
  const [deviceToken, setDeviceToken] = useState('asdf');
  const navigation = useNavigation();
  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
  };

  const onChangeContact = val => {
    setInputContactState(val);
    setValues({ ...values, sms_number: val });
  };

  const validateField = () => {
    if (inputContactState.length != 11) {
      alert('Please enter 11 digits number');
      return false;
    } else {
      return true;
    }
  };

  const onPressSendCode = () => {
    // validateField();
    dispatch(createPost(inputContactState.toString()));
    dispatch(clearState());
  };
  useEffect(() => {
    if (post.success) {
      AsyncStorage.setItem('number', inputContactState);
      handleNavigate('OTPEnter', false, {
        deviceTypeParam: deviceType,
        contactNumberParam: inputContactState,
        deviceIdentifierParam: deviceIdentifier,
        deviceTokenParam: deviceToken,
      });
      dispatch(clearState());
    }
    if (post.message) {
      Toast.show({
        // type: 'success',
        text2: `${post.message}`,
        visibilityTime: 4000,
        position: 'top',
      });
    }
  }, [post]);

  const toastConfig = {
    success: internalState => (
      <View
        style={{
          height: hp('8'),
          width: wp('90'),
          marginHorizontal: wp('5'),
          backgroundColor: '#333333',
          borderRadius: wp('1.5'),
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: hp('1.5'),
            fontFamily: fontFamily.helveticaLight,
            color: colors.white,
            paddingHorizontal: wp('3'),
            paddingVertical: hp('1.5'),
            lineHeight: hp('2.5'),
          }}>
          {internalState.text2}
        </Text>
      </View>
    ),
  };

  return (
    <ImageBackground
      source={{ uri: 'loginbglatest' }}
      style={{ flex: 1 }}
      resizeMode={'cover'}>
      <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />
      {post?.isLoading && <Loader></Loader>}
      <View style={styles.mainTopView}></View>
      <View style={styles.contactNumberMainView}>
        <View style={styles.contactTextInputView}>
          <TextInputCustom
            value={values.sms_number}
            onChangeText={onChangeContact}
            keyboardType={'numeric'}
            maxLength={11}
            returnKeyType={'go'}
            style={styles.textInputCustomStyle}
          />
        </View>

        <View style={styles.textView}>
          <Text style={styles.textStyle}>
            Enter your registered mobile number
          </Text>
        </View>

        <View style={styles.textView}>
          <Button
            // disabled={buttwithDrawlRequestHereonState}
            onPress={onPressSendCode}
            height={hp('4.5')}
            borderRadius={wp('1.5')}
            text="Send Code"
            colorsArray={['#296cb1', '#2760a7', '#203d88']}
            // bgColor={colors.appColor}
            textColor={colors.white}
            textSize={hp('1.75')}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainTopView: {
    flex: 4,
  },

  textInputCustomStyle: {
    marginHorizontal: wp('5'),
    fontSize: hp('1.6'),
    fontFamily: fontFamily.helveticaBold,
    height: hp('6'),
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: wp('0.25'),
    color: colors.lightGrey,
  },
  contactNumberMainView: {
    // flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginBottom: hp('5.5'),
    marginHorizontal: wp('5'),
    borderRadius: wp('5'),
  },
  contactTextInputView: {
    paddingTop: hp('2'),
  },
  textView: {
    justifyContent: 'center',
    marginHorizontal: wp('5'),
    marginVertical: hp('1'),
  },
  textStyle: {
    fontSize: hp('1.4'),
    fontFamily: fontFamily.helveticaLight,
    color: colors.lightGrey,
  },
});
export default MobileNumperEnter;
