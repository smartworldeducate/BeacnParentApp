import React, {useState, useEffect} from 'react';
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

import {useDispatch, useSelector} from 'react-redux';
import {OTPCodeAction} from '../Redux/Features/PhoneNumberSignUp/EnterOTPSignUpKit';

import colors from '../Styles/colors';
import fontFamily from '../Styles/fontFamily';
import Button from '../Components/Button/Button';
import {concat} from 'react-native-reanimated';

const CELL_COUNT = 4;

const OTPEnter = ({route}) => {
  const [firstOTP, setFirstOTP] = useState('');
  const [secondOTP, setSecondOTP] = useState('');
  const [thirdOTP, setThirdOTP] = useState('');
  const [fourthOTP, setFourthOTP] = useState('');
  const [totalOTP, setTotalOTP] = useState('');
  const [value, setValue] = useState('');

  // console.log("routeParamsDeviceType", route.params.deviceTypeParam);
  // console.log("routeParamsMobile", route.params.contactNumberParam);
  // console.log("routeParamsDeviceIdentifier", route.params.deviceIdentifierParam);
  // console.log("routeParamsDeviceToken", route.params.deviceTokenParam);

  const onChangeFirstOTP = val => {
    setFirstOTP(val);
    setValuesObj({...valuesObj, pin_code_sms: val});
  };

  const [valuesObj, setValuesObj] = useState({
    device_type: route.params.deviceTypeParam,
    sms_number: route.params.contactNumberParam,
    device_identifier: route.params.deviceIdentifierParam,
    device_token: route.params.deviceTokenParam,
    pin_code_sms: firstOTP,
  });
  const dispatch = useDispatch();
  const OTPCodeHere = useSelector(state => state.OTPCodeStore);

  const [mobileNumber, setMobileNumber] = useState(
    route.params.notificationDataParam,
  );

  const onChangeSecondOTP = val => {
    setSecondOTP(val);
  };

  const onChangeThirdOTP = val => {
    setThirdOTP(val);
  };

  const onChangeFourthOTP = val => {
    setFourthOTP(val);
  };

  const navigation = useNavigation();
  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
  };

  const totalOTPFunction = () => {
    console.log('totalOTP', totalOTP);
  };

  const [inputContactState, setInputContactState] = useState('');
  const onChangeContact = val => {
    setInputContactState(val);
  };

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [isAllFilled, setIsAllFiilled] = useState(false);

  const renderCell = ({index, symbol, isFocused}) => {
    let textChild = null;

    if (symbol) {
      textChild = (
        <MaskSymbol
          maskSymbol="●"
          isLastFilledCell={
            (isLastFilledCell({index, value}),
            setIsAllFiilled(index === 3 ? true : false),
            console.log('123', index === 3 ? true : false))
          }>
          {symbol}
        </MaskSymbol>
      );
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Text
        key={index}
        style={[styles.cell, isFocused && styles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Text>
    );
  };

  const validateField = () => {
    if (firstOTP.length != 4) {
      alert('Please enter valid 4 digits OTP');
      return false;
    } else {
      handleNavigate('HomeScreen');
      return true;
    }
  };

  const onPressSubmitCode = async () => {
    validateField();

    dispatch(OTPCodeAction(valuesObj));
  };
  return (
    <ImageBackground
      source={{uri: 'mainsplash'}}
      style={{flex: 1}}
      resizeMode={'stretch'}>
      <View style={{flex: 3.5}}></View>

      <View style={{marginBottom: hp('1.5'), marginHorizontal: wp('5')}}>
        <Text style={{color: colors.white}}>
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
              style={{
                borderBottomColor: colors.grey,
                borderBottomWidth: wp('0.5'),
              }}>
              <TextInput
                keyboardType={'numeric'}
                maxLength={4}
                onChangeText={onChangeFirstOTP}
                returnKeyType="next"
                style={{
                  marginHorizontal: wp('5'),
                  fontSize: hp('1.75'),
                  fontFamily: fontFamily.regular,
                  height: hp('5'),
                  width: '100%',
                  color: 'black',
                }}
              />
            </View>

            {/* <View style={{ flex: 0.05 }}>

                        </View>

                        <View style={{ flex: 0.2, borderBottomColor: colors.grey, borderBottomWidth: wp('0.5') }}>
                            <TextInput keyboardType={"numeric"} maxLength={1}
                                onChangeText={onChangeSecondOTP}
                                returnKeyType="next"
                                style={{
                                    marginHorizontal: wp('5'), fontSize: hp('1.75'), fontFamily: fontFamily.regular, height: hp('5')
                                }}
                            />
                        </View>

                        <View style={{ flex: 0.05 }}>

                        </View>

                        <View style={{ flex: 0.2, borderBottomColor: colors.grey, borderBottomWidth: wp('0.5') }}>
                            <TextInput keyboardType={"numeric"} maxLength={1}
                                onChangeText={onChangeThirdOTP}
                                returnKeyType="next"
                                style={{
                                    marginHorizontal: wp('5'), fontSize: hp('1.75'), fontFamily: fontFamily.regular, height: hp('5')
                                }}
                            />
                        </View>

                        <View style={{ flex: 0.05 }}>

                        </View>

                        <View style={{ flex: 0.2, borderBottomColor: colors.grey, borderBottomWidth: wp('0.5') }}>
                            <TextInput keyboardType={"numeric"} maxLength={1}
                                onChangeText={onChangeFourthOTP}
                                returnKeyType="next"
                                style={{
                                    marginHorizontal: wp('5'), fontSize: hp('1.75'), fontFamily: fontFamily.regular, height: hp('5')
                                }}
                            />
                        </View> */}
          </View>

          {/* <View style={{ paddingHorizontal: wp('5') }}> */}
          {/* <CodeField
                        ref={ref}
                        {...props}
                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={renderCell}
                    /> */}
          {/* </View> */}

          {/* <OTPInputView
                        style={{ width: '80%', height: 200 }}
                        pinCount={4}
                        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        // onCodeChanged = {code => { this.setState({code})}}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled={(code) => {
                            console.log(`Code is ${code}, you are good to go!`)
                        }}
                    /> */}
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
            text="Submit Code"
            bgColor={colors.appColor}
            textColor={colors.white}
            textSize={hp('1.75')}
          />
        </View>
      </View>

      <View
        style={{flex: 0.5, marginVertical: hp('3'), marginHorizontal: wp('5')}}>
        <Text
          style={{
            color: colors.white,
            fontFamily: fontFamily.regular,
            fontSize: hp('1.5'),
          }}>
          Didn't receive the code? Tap here to{' '}
          <Text
            style={{
              fontSize: hp('1.55'),
              fontWeight: 'bold',
              textDecorationLine: 'underline',
            }}>
            Resend
          </Text>
          . {'\n'}Having trouble with the authentication? {'\n'}
          Raise a support request ticket.
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  // borderStyleBase: {
  //     width: 30,
  //     height: 45
  // },

  // borderStyleHighLighted: {
  //     borderColor: "#03DAC6",
  // },

  // underlineStyleBase: {
  //     width: 30,
  //     height: 45,
  //     borderWidth: 0,
  //     borderBottomWidth: 1,
  // },

  // underlineStyleHighLighted: {
  //     borderColor: "#03DAC6",
  // },

  root: {flex: 1, padding: 10},
  title: {textAlign: 'center', fontSize: 20},
  codeFieldRoot: {marginTop: 10},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 14,
    borderWidth: 2,
    borderColor: colors.borderColor,
    textAlign: 'center',
    // paddingTop: hp('0.35'),
  },
  focusCell: {
    borderColor: colors.fbColor,
  },
});
export default OTPEnter;
