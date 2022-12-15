import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';

import Button from '../../Components/Button/Button';
import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';
import FlatListItem from '../../Components/FlatList/FlatList';
import LineSeprator from '../../Components/LineSeprator/LineSeprator';
import ImagePickerCrop from '../../Components/ImagePicker/ImagePickerCrop';
import DatePicker from 'react-native-date-picker';
import DatePickerModal from '../../Components/DatePicker/DatePicker';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

const Step4 = ({
  propRelation,
  propParentName,
  propCNIC,
  propEmail,
  propContact,
  propParentsListFromStep2,
  propBenificiaryId,
  onPressBack,
  onPressNext,
}) => {
  const dispatch = useDispatch();
  const childDatahere = useSelector(state => state.children);
  // console.log("childDatahere", childDatahere?.posts?.result?.children[0]?.branch_info?.branch_id);

  const [branchId, setBranchId] = useState(
    childDatahere?.posts?.result?.children[0]?.branch_info?.branch_id,
  );
  const [classId, setClassId] = useState(
    childDatahere?.posts?.result?.children[0]?.class_id,
  );
  const [sectionId, setSectionId] = useState(
    childDatahere?.posts?.result?.children[0]?.section_id,
  );
  const [systemId, setSystemId] = useState(
    childDatahere?.posts?.result?.children[0]?.system_id,
  );

  // console.log("branchId", branchId);
  // console.log("classId", classId);
  // console.log("sectionId", sectionId);
  // console.log("sysytemId", sysytemId);

  const navigation = useNavigation();
  const [disableBtn, setDisableBtn] = useState(true);
  const [idCardFront, setIdCardFront] = useState('idcard');
  const [idCardBack, setIdCardBack] = useState('idcard');
  const [frontModalValue, setFrontModalValue] = useState(false);
  const [backModalValue, setBackModalValue] = useState(false);

  const [imgBase64Side1, setImgBase64Side1] = useState(null);
  const [imgBase64Side2, setImgBase64Side2] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const [selectRelation, setSelectRelation] = useState(propRelation);
  const [parentName, setParentName] = useState(propParentName);
  const [CNIC, setCNIC] = useState(propCNIC);
  const [email, setEmail] = useState(propEmail);
  const [contact, setContact] = useState(propContact);
  const [address, setAddress] = useState(
    childDatahere?.posts?.result.children[0].complete_address,
  );

  const [parentsDetailsSection, setParentsDetailsSection] = useState(false);

  const [parentsList, setParentsList] = useState(
    childDatahere?.posts?.result?.children[0]?.guardians,
  );
  const [parentsListFromStep2, setParentsListFromStep2] = useState(
    propParentsListFromStep2,
  );

  const [checkbox, setCheckbox] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [withrawDateFromPicker, setWithdrawDateFromPicker] = useState(
    moment(new Date()).format('DD-MM-YYYY'),
  );
  const [benificiaryId, setBenificiaryId] = useState(propBenificiaryId);

  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
  };

  const onPressModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => { }, [parentsListFromStep2]);

  const renderItem = ({ item, index }) => {
    // console.log("itemAtRender", item);
    return (
      <View>
        <TouchableOpacity
          onPress={() => onPressSelected({ item, index })}
          style={{ flexDirection: 'row', marginHorizontal: wp('3') }}>
          <View style={{ flex: 0.85, justifyContent: 'center' }}>
            <Text style={styles.modalText}>{item.RELATION_DESC}</Text>
          </View>
          <View
            style={{
              flex: 0.15,
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginVertical: hp('2'),
            }}>
            <Image
              source={{ uri: item.checked ? 'addlocation' : 'circleselect' }}
              style={{ height: hp('2'), width: wp('4') }}
              resizeMode={'contain'}
            />
          </View>
        </TouchableOpacity>

        <LineSeprator style={styles.lineSeprator} />
      </View>
    );
  };

  const onPressSelected = ({ item, index }) => {
    // let parentsListArray = [...parentsListFromStep2];
    let ourGettingValue = [...JSON.parse(JSON.stringify(parentsListFromStep2))];

    for (let i = 0; i < ourGettingValue.length; i++) {
      if (index === i) {
        ourGettingValue[i].checked = true;
        setParentsListFromStep2(ourGettingValue);
      } else {
        ourGettingValue[i].checked = false;
        setParentsListFromStep2(ourGettingValue);
      }
      // const element = ourGettingValue[i];
    }

    // console.log("item>>>", item);
    setBenificiaryId(item.RELATION_ID);
    setSelectRelation(item.RELATION_DESC);
    setParentName(item.CONTACT_INFO.GUARDIAN_NAME);
    setCNIC(item.CONTACT_INFO.NIC_NUMBER);
    setEmail(item.CONTACT_INFO.PRIMARY_E_MAIL);
    setContact(item.CONTACT_INFO.MOBILE_PHONE);
    setAddress(childDatahere?.posts?.result.children[0].complete_address);
    setParentsDetailsSection(true);
    setModalVisible(!modalVisible);
  };

  console.log('parentsListFromStep2', parentsListFromStep2);

  // console.log("benificiaryId", benificiaryId);

  const onPressCheckbox = () => {
    setCheckbox(!checkbox);
    setDisableBtn(!disableBtn);
  };

  const onPressFrontIdCardModal = () => {
    setFrontModalValue(!frontModalValue);
  };

  const onPressFrontPhotoLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      // console.log(image);
      setImgBase64Side1(image.data);
      // console.log("frontLibraryBase64", image.data);
      setIdCardFront(image.path);
      setFrontModalValue(false);
    });
  };

  const onPressFrontCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      // console.log(image);
      setIdCardFront(image.path);
      setImgBase64Side1(image.data);
      // console.log("frontCameraBase64", image.data);
      setFrontModalValue(false);
    });
  };

  const onPressBackIdCardModal = () => {
    setBackModalValue(!backModalValue);
  };

  const onPressBackPhotoLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      // console.log(image);
      setImgBase64Side2(image.data);
      // console.log("backLibraryBase64", image.data);
      setIdCardBack(image.path);
      setBackModalValue(false);
    });
  };

  const onPressBackCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      // console.log(image);
      setImgBase64Side2(image.data);
      // console.log("backCameraBase64", image.data);
      setIdCardBack(image.path);
      setBackModalValue(false);
    });
  };

  // console.log("imgBase64Side1", imgBase64Side1);
  // console.log("imgBase64Side2", imgBase64Side2);

  const onPressDate = data => {
    setDateModal(!dateModal);
    // console.log("datedData", data);
    setWithdrawDateFromPicker(moment(data).format('DD-MM-YYYY'));
  };

  // console.log("address", address);

  return (
    <>
      <View style={{ marginHorizontal: wp('4'), marginBottom: hp('2') }}>
        <Text
          style={{
            marginHorizontal: wp('3'),
            fontFamily: fontFamily.helveticaLight,
            fontSize: hp('1.7'),
            color: colors.lightBlack,
            textAlign: 'justify',
            lineHeight: hp('2.5'),
          }}>
          {
            'If applicable for security refund, the cheque will be issued in the parents name. This will be dispatched through registered mail to the address given below.'
          }
        </Text>
      </View>

      <TouchableOpacity onPress={onPressModal} style={styles.mainView}>
        <View style={styles.selectValueLeftView}>
          <Text style={styles.selectValueText}>{'Cheque Beneficiary'}</Text>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalMainView}>
            <TouchableOpacity
              onPress={onPressModal}
              style={{ flex: 0.4 }}></TouchableOpacity>
            <View style={styles.modalView}>
              <FlatListItem
                data={parentsListFromStep2}
                renderItem={renderItem}
              />
            </View>
            <TouchableOpacity
              onPress={onPressModal}
              style={{ flex: 0.4 }}></TouchableOpacity>
          </View>
        </Modal>

        <View style={styles.selectRelationImgView}>
          <Text style={styles.selectRelationText}>{selectRelation}</Text>
        </View>

        <View style={styles.selectValueRightView}>
          <Image
            source={{ uri: 'arrowdown' }}
            style={{ height: hp('1.5'), width: wp('3') }}
            resizeMode={'contain'}
          />
        </View>
      </TouchableOpacity>

      {/* {
 parentsDetailsSection && */}

      <View style={styles.parentDetailsView}>
        <View style={styles.selectedRelationUpperView}>
          <Text style={styles.selectedRelationHeaderText}>{parentName}</Text>
        </View>

        <View style={styles.selectedRelationLowerView}>
          <Text style={styles.selectedRelatioDetailsText}>
            CNIC: <Text style={{ fontFamily: fontFamily.helveticaRegular }}>{CNIC}</Text>
          </Text>
          <Text style={styles.selectedRelatioDetailsText}>
            Email: <Text style={{ fontFamily: fontFamily.helveticaRegular }}>{email}</Text>
          </Text>
          <Text style={styles.selectedRelatioDetailsText}>
            Contact Number:{' '}
            <Text style={{ fontFamily: fontFamily.helveticaRegular }}>{contact}</Text>
          </Text>
          <Text style={styles.selectedRelatioDetailsText}>
            Correspondance Address:{' '}
            <Text style={{ fontFamily: fontFamily.helveticaRegular }}>{address}</Text>
          </Text>
        </View>
      </View>
      {/* }

 <Text>{CNIC}</Text> */}

      <View style={{ flexDirection: 'row', marginVertical: hp('2') }}>
        <View style={{ flex: 0.1, justifyContent: 'center' }}></View>
        <TouchableOpacity
          onPress={onPressFrontIdCardModal}
          style={{ flex: 0.35, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={{ uri: idCardFront }}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />
        </TouchableOpacity>

        <View style={{ flex: 0.1, justifyContent: 'center' }}></View>

        <TouchableOpacity
          onPress={onPressBackIdCardModal}
          style={{ flex: 0.35, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={{ uri: idCardBack }}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />
        </TouchableOpacity>
        <View style={{ flex: 0.1, justifyContent: 'center' }}></View>
      </View>

      <View style={{ marginHorizontal: wp('4'), marginVertical: hp('2') }}>
        <Text
          style={{
            marginHorizontal: wp('3'),
            fontFamily: fontFamily.helveticaRegular,
            fontSize: hp('1.6'),
            color: colors.grey,
            textAlign: 'justify',
            lineHeight: hp('2.5'),
          }}>
          {
            'Please upload your valid CNIC (Front and Back) in PNG / JPEG format. File size should not exceed 3MB.'
          }
        </Text>
      </View>

      <TouchableOpacity onPress={onPressDate} style={styles.mainView}>
        <View style={styles.selectValueLeftView}>
          <Text style={styles.selectValueText}>{'Last day in school'}</Text>
        </View>

        <View style={{ flex: 0.4, justifyContent: 'center' }}>
          <Text style={styles.selectDateText}>{withrawDateFromPicker}</Text>
        </View>

        <View style={{}}></View>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: wp('4'),
          marginTop: hp('2'),
        }}>
        <TouchableOpacity
          onPress={onPressCheckbox}
          style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={{ uri: checkbox ? 'checked' : 'uncheck' }}
            style={{ height: hp('3'), width: wp('6') }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <View style={{ flex: 0.8, justifyContent: 'center', marginRight: wp('7') }}>
          <Text
            style={{

              fontFamily: fontFamily.helveticaRegular,
              fontSize: hp('1.6'),
              color: colors.lightBlack,
              textAlign: 'left',
              lineHeight: hp('2.75'),
            }}>
            {
              "I hereby understand that one month written notice of withdrawal is required for refund of the security fee, alternatively, one month's fee must be paid in lieu of such notice."
            }
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginVertical: hp('3'),
          marginHorizontal: wp('5'),
        }}>
        <View style={{ flex: 0.4 }}>
          <Button
            onPress={onPressBack}
            height={hp('4.5')}
            borderRadius={wp('1.5')}
            text="Back"
            bgColor={colors.appColor}
            textColor={colors.white}
            textSize={hp('1.75')}
          />
        </View>
        <View style={{ flex: 0.05 }}></View>
        <View style={{ flex: 0.55 }}>
          <Button
            onPress={() =>
              onPressNext(
                branchId,
                classId,
                withrawDateFromPicker,
                sectionId,
                systemId,
                benificiaryId,
                imgBase64Side1,
                imgBase64Side2,
              )
            }
            height={hp('4.5')}
            borderRadius={wp('1.5')}
            text="Submit Application"
            textColor={colors.white}
            textSize={hp('1.75')}
            bgColor={disableBtn ? colors.grey : colors.appColor}
            disabled={disableBtn}
          />
        </View>
      </View>

      <View style={{ marginBottom: hp('1.5') }}></View>

      <ImagePickerCrop
        modalVisible={frontModalValue}
        onPressModal={onPressFrontIdCardModal}
        onPressPhotos={onPressFrontPhotoLibrary}
        onPressCamera={onPressFrontCamera}
      />

      <ImagePickerCrop
        modalVisible={backModalValue}
        onPressModal={onPressBackIdCardModal}
        onPressPhotos={onPressBackPhotoLibrary}
        onPressCamera={onPressBackCamera}
      />

      {dateModal && (
        <View style={{ marginHorizontal: wp('0') }}>
          <DatePickerModal
            modalVisible={dateModal}
            onPressModal={onPressDate}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    height: hp('6'),
    marginHorizontal: wp('6'),
    borderColor: colors.grey,
    borderWidth: wp('0.15'),
    borderRadius: wp('3'),
    marginTop: hp('1')
  },

  selectValueLeftView: {
    flex: 0.65,
    justifyContent: 'center',
  },
  selectValueText: {
    marginLeft: hp('2'),
    fontSize: hp('1.7'),
    fontFamily: fontFamily.helveticaRegular,
    color: colors.appColor,
  },

  selectRelationImgView: {
    flex: 0.2,
    justifyContent: 'center',
  },
  selectRelationText: {
    textAlign: 'right',
    color: colors.appColor,
    fontSize: hp('1.6'),
    fontFamily: fontFamily.helveticaRegular,
  },
  selectDateText: {
    textAlign: 'center',
    color: colors.appColor,
    fontSize: hp('1.6'),
    fontFamily: fontFamily.helveticaRegular,
  },
  selectValueRightView: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalMainView: {
    flex: 1,
    flexDirection: 'column',
    margin: hp('5'),
    justifyContent: 'center',
  },

  modalView: {
    flex: 0.2,
    justifyContent: 'center',

    backgroundColor: 'white',
    padding: hp('1'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },

  lineSeprator: {
    height: hp('0.1'),
    backgroundColor: colors.grey,
    marginTop: hp('1'),
    marginBottom: hp('1'),
    marginLeft: wp('5'),
  },

  parentDetailsView: {
    flexDirection: 'column',
    marginHorizontal: wp('6'),
    marginVertical: hp('2'),
    backgroundColor: colors.white,

    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    borderRadius: wp('2'),
  },
  selectedRelationUpperView: {
    paddingVertical: hp('2'),
    paddingHorizontal: wp('3'),
    backgroundColor: colors.grey,
    borderTopLeftRadius: wp('1'),
    borderTopRightRadius: wp('1'),
  },
  selectedRelationHeaderText: {
    fontSize: hp('1.7'),
    fontFamily: fontFamily.helveticaRegular,
    color: colors.silverGrey,
  },
  selectedRelationLowerView: {
    marginTop: hp('1.5'),
    marginHorizontal: wp('3'),
    paddingBottom: hp('2'),
  },
  selectedRelatioDetailsText: {
    fontSize: hp('1.7'),
    fontFamily: fontFamily.helveticaBold,
    color: colors.grey,
    lineHeight: hp('3'),
  },

  imageStyle: {
    height: hp('8'),
    width: wp('18'),
    borderRadius: wp('1'),
  },
});
export default Step4;
