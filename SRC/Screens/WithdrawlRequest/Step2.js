import React, { useState, useEffect } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import Button from '../../Components/Button/Button';
import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';
import FlatListItem from '../../Components/FlatList/FlatList';
import LineSeprator from '../../Components/LineSeprator/LineSeprator';

import { useDispatch, useSelector } from 'react-redux';

const Step2 = ({ onPressBack, onPressNext, disabled }) => {
  const childDatahere = useSelector(state => state.children);
  // console.log("childDatahereStep2", childDatahere?.posts?.result);

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectRelation, setSelectRelation] = useState('Select');

  const [parentName, setParentName] = useState('');
  const [CNIC, setCNIC] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [parentsDetailsSection, setParentsDetailsSection] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  const [applicant_relation_id, set_applicant_relation_id] = useState(null);

  const [parentsList, setParentsList] = useState(
    childDatahere?.posts?.result?.children[0]?.guardians,
  );

  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
  };

  useEffect(() => {
    // dispatch(getChild(mobile?.posts?.result?.sms_number));
  }, [parentsList]);

  const onPressModal = () => {
    setModalVisible(!modalVisible);
  };

  const onPressSelected = ({ item, index }) => {
    // console.log("selectedGuardianIndex", index);
    // console.log("selectedGuardian", item);

    // "use strict";

    let ourGettingValue = [...JSON.parse(JSON.stringify(parentsList))];
    for (let i = 0; i < ourGettingValue.length; i++) {
      if (index === i) {
        ourGettingValue[i].checked = true;
        setParentsList(ourGettingValue);
      } else {
        ourGettingValue[i].checked = false;
      }
      // const element = ourGettingValue[i];
      // console.log("element", element);
      setParentsList(ourGettingValue);
    }
    // setParentsList(ourGettingValue);
    // console.log("parentsListInside", parentsList);
    // Object.preventExtensions(ourGettingValue);

    set_applicant_relation_id(item.RELATION_ID);
    setSelectRelation(item.RELATION_DESC);
    setParentName(item.CONTACT_INFO.GUARDIAN_NAME);
    setCNIC(item.CONTACT_INFO.NIC_NUMBER);
    setEmail(item.CONTACT_INFO.PRIMARY_E_MAIL);
    setContact(item.CONTACT_INFO.MOBILE_PHONE);
    // setAddress(item.correspondanceAdress);
    setParentsDetailsSection(true);
    // if (item.RELATION_ID == 1) {
    //     setFatherImgState(true);
    //     setMotherImgState(false);
    // }
    // if (item.RELATION_ID == 2) {
    //     setFatherImgState(false);
    //     setMotherImgState(true);
    // }
    setDisableBtn(true);
    setModalVisible(!modalVisible);
  };

  console.log('parentsListOutside', parentsList);

  // console.log("parentsList", parentsList);

  // console.log("applicant_relation_id", applicant_relation_id);

  const renderItem = ({ item, index }) => {
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

  return (
    <View style={{}}>
      <TouchableOpacity onPress={onPressModal} style={styles.mainView}>
        <View style={styles.selectValueLeftView}>
          <Text style={styles.selectValueText}>
            {'Relationship with student'}
          </Text>
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
              style={{ flex: 0.55 }}></TouchableOpacity>
            <View style={styles.modalView}>
              <FlatListItem data={parentsList} renderItem={renderItem} />
            </View>
            <TouchableOpacity
              onPress={onPressModal}
              style={{ flex: 0.25 }}></TouchableOpacity>
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

      {parentsDetailsSection && (
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
              <Text style={{ fontFamily: fontFamily.helveticaRegular }}>
                {childDatahere?.posts?.result.children[0].complete_address}
              </Text>
            </Text>
          </View>
        </View>
      )}

      <View style={styles.btnMainView}>
        <View style={{ flex: 0.47 }}>
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
        <View style={{ flex: 0.04 }}></View>
        <View style={{ flex: 0.47 }}>
          <Button
            onPress={() =>
              onPressNext(
                applicant_relation_id,
                selectRelation,
                parentName,
                CNIC,
                email,
                contact,
                parentsList,
              )
            }
            height={hp('4.5')}
            borderRadius={wp('1.5')}
            text="Next"
            textColor={colors.white}
            textSize={hp('1.75')}
            disabled={disableBtn ? false : true}
            // bgColor={selectRelation.length > 0 ? colors.appColor : colors.grey}
            bgColor={disableBtn ? colors.appColor : colors.grey}
          />
        </View>
      </View>
    </View>
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
  },

  selectValueLeftView: {
    flex: 0.65,
    justifyContent: 'center',
  },
  selectValueText: {
    marginLeft: hp('1.5'),
    fontSize: hp('1.7'),
    fontFamily: fontFamily.helveticaRegular,
    color: colors.appColor,
  },

  selectValueRightView: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnMainView: {
    flexDirection: 'row',
    marginTop: hp('4'),
    marginBottom: hp('2'),
    marginHorizontal: wp('5'),
  },

  lineSeprator: {
    height: hp('0.1'),
    backgroundColor: colors.grey,
    marginTop: hp('1'),
    marginBottom: hp('1'),
    marginLeft: wp('5'),
  },
  modalMainView: {
    flex: 1,
    flexDirection: 'column',
    margin: hp('5'),
    justifyContent: 'center',
  },
  selectRelationImgView: {
    flex: 0.2,
    justifyContent: 'center',
  },
  selectRelationText: {
    textAlign: 'right',
    color: colors.appColor,
    fontSize: hp('1.4'),
    fontFamily: fontFamily.helveticaRegular,
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
  modalText: {
    color: colors.lightBlack,
    fontFamily: fontFamily.regular,
    fontSize: hp('1.8'),
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
});
export default Step2;
