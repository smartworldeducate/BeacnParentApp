import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  RefreshControl,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import fontFamily from '../Styles/fontFamily';
import colors from '../Styles/colors';
import MainHeader from '../Components/Header/MainHeader';

import LineSeprator from '../Components/LineSeprator/LineSeprator';
import ParentProfileHeader from '../Components/Header/ParentProfileHeader';
import LeftTextsRightImg from '../Components/ParentProfile/LeftTextsRightImg';
import UpdateAddressModal from '../Components/ParentProfile/UpdateAddressModal';
import UpdateCNICModal from '../Components/ParentProfile/UpdateCNICModal';
import UpdateContactNoModal from '../Components/ParentProfile/UpdateContactNoModal';
import UpdateEmail from '../Components/ParentProfile/UpdateEmail';
import {useDispatch, useSelector} from 'react-redux';
import {getGuardian} from '../Redux/Features/StudentGuardian/StudentGuardian';
import {parentProfileUpdate} from '../Redux/Features/ParentProfileUpdate/ParentProfileUpdate';
import Loader from '../Components/Loader/Loader';

const ParentProfile = () => {
  const dispatch = useDispatch();
  const gurdians = useSelector(state => state.guardian);
  console.log(gurdians, 'uamrbhadsadsa');
  const childDatahere = useSelector(state => state.children);
  const parentProfileUpdateHere = useSelector(
    state => state.UpdateParentsStore,
  );
  console.log('parentProfileUpdateHere', parentProfileUpdateHere.posts.message);
  //   console.log(
  //     childDatahere?.posts?.result?.children[0]?.guardians[0]?.NIC_NUMBER,
  //     'sdsdsddsds',
  //   );

  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const [CNICModal, setCNICModal] = useState(false);
  const [contactNoModal, setContactNoModal] = useState(false);
  const [emailAddressModal, setEmailAddressModal] = useState(false);

  const [CNICModalMother, setCNICModalMother] = useState(false);
  const [contactNoModalMother, setContactNoModalMother] = useState(false);
  const [emailAddressModalMother, setEmailAddressModalMother] = useState(false);

  const [addressModal, setAddressModal] = useState(false);

  const [inputName, setInputName] = useState('');
  const [inputCNIC, setInputCNIC] = useState();

  const [checkContact, setCheckContact] = useState(
    childDatahere?.posts?.result?.children[0]?.guardians[0]?.CONTACT_INFO
      ?.MOBILE_PHONE,
  );

  const [fatherEmail, setFatherEmail] = useState(
    gurdians?.posts?.result?.guardians[0]?.primary_e_mail,
  );

  const onChangeName = val => {
    setInputName(val);
  };

  const onChangeCNIC = val => {
    setInputCNIC(val);
  };

  // liveWorking

  const onChangeContact = val => {
    setCheckContact(val);
  };

  // APIImpliments

  const [fatherEmailValues, setFatherEmailValues] = useState({
    system_id: '146660',
    sms_number: '03046121456',
    field_value: '',
    field_name: '3',
  });

  const [motherEmailValues, setMotherEmailValues] = useState({
    system_id: '146660',
    sms_number: '03046121456',
    field_value: '',
    field_name: '3',
  });

  const onChangeFatherEmail = val => {
    setFatherEmailValues({...fatherEmailValues, field_value: val});
    // console.log('inside', fatherEmailValues.field_value);
  };

  const onChangeMotherEmail = val => {
    setMotherEmailValues({...motherEmailValues, field_value: val});
    // console.log('inside', fatherEmailValues.field_value);
  };

  // console.log('outside', fatherEmailValues.field_value);

  const onPressUpdateFatherEmailBtn = () => {
    console.log('myObj', fatherEmailValues);
    dispatch(parentProfileUpdate(fatherEmailValues));
  };

  // const [inputEmail, setInputEmail] = useState('');
  // const onChangeEmail = val => {
  //   setInputEmail(val);
  // };

  const [inputAddress, setInputAddress] = useState('');

  const onChangeAddress = val => {
    setInputAddress(val);
  };

  const onRefresh = () => {
    setRefreshing(true);
    // initialCall();
    console.log('add', 2 + 2);
    setRefreshing(false);
    // console.log("calling again", initialCall());
  };

  const onPressCNICModal = () => {
    setCNICModal(!CNICModal);
  };
  const onPressContactNoModal = () => {
    setContactNoModal(!contactNoModal);
  };
  const onPressEmailAddressModal = () => {
    setEmailAddressModal(!emailAddressModal);
  };

  const onPressCNICModalMother = () => {
    setCNICModalMother(!CNICModalMother);
  };
  const onPressContactNoModalMother = () => {
    setContactNoModalMother(!contactNoModalMother);
  };
  const onPressEmailAddressModalMother = () => {
    setEmailAddressModalMother(!emailAddressModalMother);
  };

  const onPressAddressModal = () => {
    setAddressModal(!addressModal);
  };

  const onPressContactUpdate = () => {
    dispatch();
  };

  useEffect(() => {
    dispatch(getGuardian(childDatahere?.posts?.result?.children[0]?.system_id));
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === 'android' ? colors.white : colors.white,
      }}>
      <StatusBar barStyle={'default'} backgroundColor={colors.lightBlack} />

      {childDatahere?.posts?.result?.children.length > 0 && (
        <MainHeader
          onPressRightImg={() => navigation.goBack()}
          topLeftImg={'backarrow'}
          text={'Parent Profile'}
          data={childDatahere?.posts?.result?.children}
        />
      )}

      {gurdians?.isLoading && <Loader></Loader>}

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.white,
          marginVertical: hp(2),
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            // we can implement multiple colors in the form of array
            colors={[colors.fbColor, colors.paratGreen, colors.red]}
            // background color of the refresh indicator
            progressBackgroundColor={colors.silverGrey}
            tintColor={colors.appColor}

            // title={"loading"}
            // titleColor={colors.white}

            // size between 0 to 1
            // size={"large"}
          />
        }>
        <Text style={styles.mainText}>Parent/Guardian Information</Text>

        <View style={styles.parentView}>
          <ParentProfileHeader
            leftImg={'father'}
            text1={gurdians?.posts?.result?.guardians[0]?.guardian_name}
            text2={gurdians?.posts?.result?.guardians[0]?.relation_desc}
          />

          <LineSeprator style={styles.lineSeprator} />

          <LeftTextsRightImg
            text1={
              childDatahere?.posts?.result?.children[0]?.guardians[0]
                ?.CONTACT_INFO?.NIC_NUMBER
            }
            text2={'CNIC'}
            img={'edit'}
            onPressImg={onPressCNICModal}
            paddingHorizontal={wp('2')}
          />

          <LineSeprator style={styles.lineSepratorBelow} />

          <LeftTextsRightImg
            text1={
              childDatahere?.posts?.result?.children[0]?.guardians[0]
                ?.CONTACT_INFO?.MOBILE_PHONE
            }
            text2={'Phone Number'}
            img={'edit'}
            onPressImg={onPressContactNoModal}
            paddingHorizontal={wp('2')}
          />

          <LineSeprator style={styles.lineSepratorBelow} />

          <LeftTextsRightImg
            text1={gurdians?.posts?.result?.guardians[0]?.primary_e_mail}
            text2={'Email'}
            img={'edit'}
            onPressImg={onPressEmailAddressModal}
            paddingHorizontal={wp('2')}
          />

          <LineSeprator style={styles.lineSepratorBelow} />

          <View style={{marginBottom: hp('3')}}></View>

          <ParentProfileHeader
            leftImg={'mother'}
            text1={gurdians?.posts?.result?.guardians[1]?.guardian_name}
            text2={gurdians?.posts?.result?.guardians[1]?.relation_desc}
          />

          <LineSeprator style={styles.lineSeprator} />

          <LeftTextsRightImg
            text1={
              childDatahere?.posts?.result?.children[0]?.guardians[1]
                ?.CONTACT_INFO?.NIC_NUMBER
            }
            text2={'CNIC'}
            img={'edit'}
            onPressImg={onPressCNICModalMother}
            paddingHorizontal={wp('2')}
          />

          <LineSeprator style={styles.lineSepratorBelow} />

          <LeftTextsRightImg
            text1={
              childDatahere?.posts?.result?.children[0]?.guardians[1]
                ?.CONTACT_INFO?.MOBILE_PHONE
            }
            text2={'Phone Number'}
            img={'edit'}
            onPressImg={onPressContactNoModalMother}
            paddingHorizontal={wp('2')}
          />

          <LineSeprator style={styles.lineSepratorBelow} />

          <LeftTextsRightImg
            text1={gurdians?.posts?.result?.guardians[1]?.primary_e_mail}
            text2={'Email'}
            img={'edit'}
            onPressImg={onPressEmailAddressModalMother}
            paddingHorizontal={wp('2')}
          />
        </View>

        <Text style={styles.addressText}>Correspondence Information</Text>

        <View style={styles.addressView}>
          <LeftTextsRightImg
            text1={childDatahere?.posts?.result?.children[0]?.street_address}
            text2={'Home Address'}
            img={'edit'}
            onPressImg={onPressAddressModal}
            paddingHorizontal={wp('2')}
          />

          <LineSeprator style={styles.lineSepratorBelow} />

          <LeftTextsRightImg
            text1={
              childDatahere?.posts?.result?.children[0]?.guardians[1]
                ?.CONTACT_INFO?.MOBILE_PHONE
            }
            text2={'Phone Number'}
            paddingHorizontal={wp('2')}
          />
        </View>

        <View style={{marginBottom: hp('3')}}></View>

        {CNICModal && (
          <UpdateCNICModal
            modalUpperFlex={0.3}
            modalLowerFlex={0.7}
            inputName={gurdians?.posts?.result?.guardians[0]?.guardian_name}
            onChangeName={onChangeName}
            inputCNIC={
              childDatahere?.posts?.result?.children[0]?.guardians[0]
                ?.CONTACT_INFO?.NIC_NUMBER
            }
            onChangeCNIC={onChangeCNIC}
            text1={'Father Name'}
            text2={'Father CNIC'}
            modalVisible={CNICModal}
            headerTitle={"Update Father's Name and CNIC"}
            onPressRightImg={onPressCNICModal}
            onPressModal={onPressCNICModal}
          />
        )}

        {contactNoModal && (
          <UpdateContactNoModal
            modalUpperFlex={0.3}
            modalLowerFlex={0.7}
            inputContact={checkContact}
            onChangeContact={onChangeContact}
            text1={'Father Mobile Number'}
            modalVisible={contactNoModal}
            headerTitle={"Update Father's Mobile Number"}
            onPressRightImg={onPressContactNoModal}
            onPressModal={onPressContactNoModal}
            onPressBtn={onPressContactUpdate}
          />
        )}

        {emailAddressModal && (
          <UpdateEmail
            modalUpperFlex={0.3}
            modalLowerFlex={0.7}
            inputEmail={fatherEmailValues.field_value}
            onChangeEmail={onChangeFatherEmail}
            text1={'Father Email Address'}
            text2={'Qasim.ali@bh.edu.pk'}
            modalVisible={emailAddressModal}
            headerTitle={"Update Father's Email Address"}
            onPressRightImg={onPressEmailAddressModal}
            onPressModal={onPressEmailAddressModal}
            onPressUpdateBtn={onPressUpdateFatherEmailBtn}
          />
        )}

        {/* mother info */}

        {CNICModalMother && (
          <UpdateCNICModal
            modalUpperFlex={0.3}
            modalLowerFlex={0.7}
            inputName={gurdians?.posts?.result?.guardians[1]?.guardian_name}
            onChangeName={onChangeName}
            inputCNIC={
              childDatahere?.posts?.result?.children[0]?.guardians[1]
                ?.CONTACT_INFO?.NIC_NUMBER
            }
            onChangeCNIC={onChangeCNIC}
            text1={'Mother Name'}
            text2={'Mother CNIC'}
            modalVisible={CNICModalMother}
            headerTitle={"Update Mother's Name and CNIC"}
            onPressRightImg={onPressCNICModalMother}
            onPressModal={onPressCNICModalMother}
          />
        )}

        {contactNoModalMother && (
          <UpdateContactNoModal
            modalUpperFlex={0.3}
            modalLowerFlex={0.7}
            inputContact={
              childDatahere?.posts?.result?.children[0]?.guardians[1]
                ?.CONTACT_INFO?.MOBILE_PHONE
            }
            onChangeContact={onChangeContact}
            text1={'Mother Mobile Number'}
            modalVisible={contactNoModalMother}
            headerTitle={"Update Mother's Mobile Number"}
            onPressRightImg={onPressContactNoModalMother}
            onPressModal={onPressContactNoModalMother}
          />
        )}

        {emailAddressModalMother && (
          <UpdateEmail
            modalUpperFlex={0.3}
            modalLowerFlex={0.7}
            inputEmail={gurdians?.posts?.result?.guardians[1]?.primary_e_mail}
            onChangeEmail={onChangeMotherEmail}
            text1={'Mother Email Address'}
            text2={'Ayeshakhan@bh.edu.pk'}
            modalVisible={emailAddressModalMother}
            headerTitle={"Update Mother's Email Address"}
            onPressRightImg={onPressEmailAddressModalMother}
            onPressModal={onPressEmailAddressModalMother}
          />
        )}

        {addressModal && (
          <UpdateAddressModal
            modalUpperFlex={0.3}
            modalLowerFlex={0.7}
            inputAddress={
              childDatahere?.posts?.result?.children[0]?.street_address
            }
            onChangeAddress={onChangeAddress}
            headerTitle={'Update Correspondence Address'}
            modalVisible={addressModal}
            onPressRightImg={onPressAddressModal}
            onPressModal={onPressAddressModal}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainText: {
    fontSize: hp('2'),
    fontFamily: fontFamily.semiBold,
    color: colors.lightBlack,
    textAlign: 'center',
    marginTop: hp('2'),
  },
  parentView: {
    marginHorizontal: wp('6'),
    marginTop: hp('2'),
    borderRadius: wp('3'),
    borderColor: colors.grey,
    borderWidth: wp('0.15'),
    paddingVertical: hp('1'),
    paddingHorizontal: wp('2'),
  },
  lineSeprator: {
    height: hp('0.2'),
    backgroundColor: colors.appColor,
    marginVertical: hp('1'),
  },
  addressText: {
    fontSize: hp('2'),
    fontFamily: fontFamily.semiBold,
    color: colors.lightBlack,
    textAlign: 'center',
    marginTop: hp('2'),
  },
  addressView: {
    marginHorizontal: wp('6'),
    marginTop: hp('2'),
    borderRadius: wp('3'),
    borderColor: colors.grey,
    borderWidth: wp('0.15'),
    paddingVertical: hp('1'),
    paddingHorizontal: wp('2'),
  },
  lineSepratorBelow: {
    height: hp('0.1'),
    backgroundColor: colors.grey,
    marginVertical: hp('1'),
  },
});
export default ParentProfile;
