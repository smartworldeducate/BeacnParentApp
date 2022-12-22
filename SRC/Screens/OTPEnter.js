import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Platform,
  Keyboard,
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

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  isLastFilledCell,
  MaskSymbol,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import { useDispatch, useSelector } from 'react-redux';
import {
  clearState,
  OTPCodeAction,
} from '../Redux/Features/PhoneNumberSignUp/EnterOTPSignUpKit';
import colors from '../Styles/colors';
import fontFamily from '../Styles/fontFamily';
import Button from '../Components/Button/Button';
import Toast from 'react-native-toast-message';
import Loader from '../Components/Loader/Loader';
import {
  addListener,
  getHash,
  getOtp,
  removeListener,
  startOtpListener,
  useOtpVerify,
} from 'react-native-otp-verify';
const CELL_COUNT = 4;
const OTPEnter = ({ route }) => {
  const [firstOTP, setFirstOTP] = useState('');
  const [otpCode, setOtpCode] = useState('');
  // const onChangeFirstOTP = val => {
  //   setFirstOTP(val);
  //   setValuesObj({...valuesObj, pin_code_sms: val});
  // };
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const dispatch = useDispatch();
  const OTPCodeHere = useSelector(state => state.OTP);

  const navigation = useNavigation();
  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
  };

  const [inputContactState, setInputContactState] = useState('');
  const onChangeContact = val => {
    setInputContactState(val);
  };

  const [valuesObj, setValuesObj] = useState({
    device_type: route.params.deviceTypeParam,
    sms_number: route.params.contactNumberParam,
    device_identifier: route.params.deviceIdentifierParam,
    device_token: route.params.deviceTokenParam,
    pin_code_sms: null,
  });

  // console.log('valuesObj', valuesObj);

  const { hash, otp, message, timeoutError, stopListener, startListener } =
    useOtpVerify({ numberOfDigits: 4 });
  useEffect(() => {
    getHash().then(console.log).catch(console.log);
    getOtp()
      .then(p => addListener(otpHandler))
      .catch(p => console.log(p));
  }, [otpCode]);
  const otpHandler = message => {
    const otp = /(\d{4})/g.exec(message)[1];
    console.log('otp<<', otp);
    setValue(otp);
    handleNavigate('HomeScreen');
    setValuesObj({ ...valuesObj, pin_code_sms: otp });
    // setOtpCode(otp);
    removeListener();
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (OTPCodeHere.success) {
      handleNavigate('HomeScreen');
      dispatch(clearState());
    }
    if (OTPCodeHere.message) {
      Toast.show({
        type: 'success',
        text1: `${OTPCodeHere.message}`,
        visibilityTime: 3000,
        position: 'top',
      });
    }
  }, [OTPCodeHere, value]);

  console.log('value111', value);

  const onPressSubmitCode = async () => {
    dispatch(OTPCodeAction(valuesObj));
    dispatch(clearState());
  };

  //   useEffect(() => {
  //     if (OTPCodeAction.success) {
  //       dispatch(OTPCodeAction(valuesObj)).then((OTPCodeAction)=>{
  // handleNavigate('HomeScreen')
  //       });
  //       dispatch(clearState());
  //     }
  //   }, []);

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
          {internalState.text1}
        </Text>
      </View>
    ),
  };

  return (
    <ImageBackground
      source={{ uri: 'loginbglatest' }}
      style={{ flex: 1 }}
      resizeMode={'cover'}>
      {/* <Toast /> */}
      <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />
      {OTPCodeHere?.isLoading && <Loader></Loader>}
      <View style={{ flex: 3.5 }}></View>

      <View style={{ marginBottom: hp('1.5'), marginHorizontal: wp('5') }}>
        <Text
          style={{
            color: "#1883b5",
            fontFamily: fontFamily.helvetica,
            fontSize: hp('1.5'),
          }}>
          {`Enter the 4-digit OTP sent to ${route.params.contactNumberParam}`}
        </Text>
      </View>

      <View
        style={{
          height: hp('20'),
          flexDirection: 'column',
          backgroundColor: 'white',
          marginHorizontal: wp('5'),
          borderRadius: wp('5'),
        }}>
        <View
          style={{
            paddingTop: wp('2'),
            height: hp('7'),
            justifyContent: 'flex-end',
            paddingTop: hp('2'),
            paddingHorizontal: wp('5'),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              justifyContent: 'center',
              marginHorizontal: wp('5'),
            }}>
            <View
              style={
                {
                  // borderBottomColor: colors.grey,
                  // borderBottomWidth: wp('0.5'),
                }
              }>
              {/* <View
                style={{
                  borderBottomColor: colors.grey,
                  borderBottomWidth: wp('0.2'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>{` ${
                  valuesObj?.pin_code_sms?.length > 0
                    ? valuesObj.pin_code_sms
                    : 'Pin code'
                }`}</Text>
              </View> */}

              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                // textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <View
                    // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                    onLayout={getCellOnLayoutHandler(index)}
                    key={index}
                    style={[styles.cellRoot, isFocused && styles.focusCell]}>
                    <Text style={styles.cellText}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            height: hp('8'),
            justifyContent: 'flex-end',
            marginHorizontal: wp('5'),
          }}>
          <Button
            onPress={onPressSubmitCode}
            height={hp('4.5')}
            borderRadius={wp('1.5')}
            text={'Submit OTP'}
            colorsArray={['#296cb1', '#2760a7', '#203d88']}
            // bgColor={colors.appColor}
            textColor={colors.white}
            textSize={hp('1.75')}
          />
        </View>
      </View>

      <View
        style={{
          flex: 0.5,
          marginVertical: hp('3'),
          marginLeft: wp('6'),
          marginRight: wp('3'),
        }}>
        <Text
          style={{
            color: "#1883b5",
            fontFamily: fontFamily.helveticaLight,
            fontSize: hp('1.6'),
            lineHeight: hp('2.5'),
          }}>
          Didn't receive the code?
          <Text
            style={{
              fontSize: hp('1.5'),
              fontFamily: fontFamily.helveticaLight,
              color: colors.white,
              lineHeight: hp('3'),
            }}>
            {' '}
            Tap here{' '}
          </Text>
          to {`\n`}resend. Having trouble with the authentication? {`\n`}
          <Text
            style={{
              fontSize: hp('1.5'),
              fontFamily: fontFamily.helveticaLight,
              color: colors.white,
              lineHeight: hp('3'),
            }}>
            Raise a support request ticket
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#000',
    fontSize: 30,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
});

export default OTPEnter;
