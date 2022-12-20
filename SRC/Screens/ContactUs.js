import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
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
import { useNavigation } from '@react-navigation/native';
import fontFamily from '../Styles/fontFamily';
import colors from '../Styles/colors';
import MainHeader from '../Components/Header/MainHeader';
import Button from '../Components/Button/Button';
import TextInputCustom from '../Components/TextInput/TextInput';
import FlatListItem from '../Components/FlatList/FlatList';
import LineSeprator from '../Components/LineSeprator/LineSeprator';
import { useDispatch, useSelector } from 'react-redux';
import { contactAction } from '../Redux/Features/ContactKit/ContactKit';
import {
  contactComplaintAction,
  clearState,
} from '../Redux/Features/ContactKit/ContactComplaintKit';
import Loader from '../Components/Loader/Loader';
import Toast from 'react-native-toast-message';

const ContactUs = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const childDatahere = useSelector(state => state.children);

  const contactDatahere = useSelector(state => state.contactStore);
  const contactComplaintDatahere = useSelector(
    state => state.contactComplaintStore,
  );
  // console.log("contactDatahere", contactDatahere);
  const [contactData, setContactData] = useState('');

  useEffect(() => {
    dispatch(contactAction());
  }, []);

  const [selectedIssue, setSelectedIssue] = useState(contactDatahere?.posts?.result?.categories[0].cat_desc);

  // console.log("contactDatahere", contactDatahere);
  // console.log("contactComplaintDatahere", contactComplaintDatahere);

  const [modalVisible, setModalVisible] = useState(false);
  const [innerModalVisible, setInnerModalVisible] = useState(false);

  const [selectedCompl, setSelectedCompl] = useState('');
  const [allComplaints, setAllComplaints] = useState(null);
  const [Complaint, setComplaint] = useState(false);
  const [complaintInitialValue, setComplaintInitialValue] = useState(null);

  // sendingValues on post API
  const [categoryId, setCategoryId] = useState(3);
  const [typeId, setTypeId] = useState(categoryId === 3 ? null : 34);
  const [inputContactState, setInputContactState] = useState(null);

  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
  };


  const onPressDropDown = () => {
    setModalVisible(!modalVisible);
  };

  const onPressModal = () => {
    setModalVisible(!modalVisible);
  };

  const onPressLowerModal = () => {
    setInnerModalVisible(!innerModalVisible);
  };

  const onChangeContact = val => {
    setInputContactState(val);
  };

  const onPressSelected = ({ item, index }) => {
    // console.log("indexSelected", index);
    // console.log("itemSelected", item);

    setCategoryId(item?.cat_id);
    setModalVisible(!modalVisible);
    setSelectedIssue(item.cat_desc);

    let ourGettingValue = [
      ...JSON.parse(JSON.stringify(contactDatahere?.posts?.result?.categories)),
    ];
    // console.log('ourGettingValue', ourGettingValue);

    for (let i = 0; i < ourGettingValue.length; i++) {
      if (index === i) {
        ourGettingValue[i].checked = true;
      } else {
        ourGettingValue[i].checked = false;
      }
    }

    // console.log("selectedLength", item?.types?.length);
    if (item?.types?.length > 0) {
      setAllComplaints(item?.types);
      setComplaint(true);
      // let last = item[item?.length - 1];
      // console.log("last", last);
      // setComplaintInitialValue()
    } else {
      setComplaint(false);
    }
  };

  const onPressSelectedComplain = ({ item, index }) => {
    // console.log('selectedComplaintIndex', index);
    // console.log('selectedComplaintItem', item);

    if (categoryId == 3) {
      setTypeId(null);
    } else {
      setTypeId(item?.type_id);
    }

    setInnerModalVisible(!innerModalVisible);
    setSelectedCompl(item?.type_desc);
  };
  // console.log("categoryId", categoryId);
  // console.log("typeId", typeId);
  // console.log("inputContactState", inputContactState);

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => onPressSelected({ item, index })}
          style={{ flexDirection: 'row', marginHorizontal: wp('3') }}>
          <View style={{ flex: 0.85, justifyContent: 'center' }}>
            <Text style={styles.modalText}>{item.cat_desc}</Text>
          </View>
          <View
            style={{
              flex: 0.15,
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginVertical: hp('2'),
            }}>
            <Image
              source={{
                uri: item.checked
                  ? 'addlocation' : 'circleselect'
              }}
              style={{ height: hp('2'), width: wp('4') }}
              resizeMode={'contain'}
            />
          </View>
        </TouchableOpacity>

        <LineSeprator style={styles.lineSeprator} />
      </View>
    );
  };

  const renderItemComplaints = ({ item, index }) => {
    // console.log('itemComplaints', item);
    return (
      <View style={{}}>
        <TouchableOpacity
          onPress={() => onPressSelectedComplain({ item, index })}
          style={{ flexDirection: 'row', marginHorizontal: wp('3') }}>
          <View style={{ flex: 0.85, justifyContent: 'center' }}>
            <Text style={styles.modalText}>{item.type_desc}</Text>
          </View>
          <View
            style={{
              flex: 0.15,
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginVertical: hp('2'),
            }}>
            <Image
              source={{ uri: 'circleselect' }}
              style={{ height: hp('2'), width: wp('4') }}
              resizeMode={'contain'}
            />
          </View>
        </TouchableOpacity>
        <View style={{ height: hp('0.1'), backgroundColor: colors.grey }}></View>
      </View>
    );
  };

  const onPressSubmit = () => {
    // dispatch(
    //   contactComplaintAction({
    //     system_id: '170838',
    //     parent_mobile: '03164025665',
    //     remarks: inputContactState,
    //     category_id: categoryId,
    //     type_id: typeId,
    //   }),
    // );

    // const funHere = () => {
    // if (contactComplaintDatahere?.reasons?.message.length > 0) {
    Toast.show({
      type: 'success',
      text2: `${"contactComplaintDatahere?.reasons?.message"}`,
      visibilityTime: 4000,
      position: 'top',
    });
    // }
    // }
    // dispatch(clearState());
    // funHere();
    // handleNavigate("HomeScreen")


  };

  // console.log("contactComplaintDatahere", contactComplaintDatahere?.reasons?.message);

  // console.log("111", contactDatahere?.posts?.result?.categories[0]);

  const toastConfig = {
    success: internalState => (
      <View style={{ height: hp('8'), width: wp('90'), marginHorizontal: wp('5'), backgroundColor: "#333333", borderRadius: wp('1.5'), justifyContent: "center" }}>
        <Text style={{ fontSize: hp('1.5'), fontFamily: fontFamily.helveticaLight, color: colors.white, paddingHorizontal: wp('3'), paddingVertical: hp('1.5'), lineHeight: hp('2.5') }}>{internalState.text2}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === 'android' ? colors.white : colors.white,
      }}>
      <StatusBar barStyle={'default'} backgroundColor={colors.lightBlack} />
      <Toast />

      {childDatahere?.posts?.result?.children.length > 0 && (
        <MainHeader
          onPressRightImg={() => navigation.goBack()}
          topLeftImg={'backarrow'}
          text={'Contact Us'}
          data={childDatahere?.posts?.result?.children}
        />
      )}

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.white,
          marginVertical: hp(2),
        }}>
        {contactDatahere?.isLoading && <Loader></Loader>}
        {contactComplaintDatahere?.isLoading && <Loader></Loader>}

        <TouchableOpacity
          onPress={onPressDropDown}
          style={{
            flexDirection: 'row',
            height: hp('6'),
            marginHorizontal: wp('6'),
            borderColor: colors.grey,
            borderWidth: wp('0.15'),
            borderRadius: wp('3'),
            marginTop: hp('7'),
          }}>
          <View style={{ flex: 0.85, justifyContent: 'center' }}>
            <Text
              style={{
                marginLeft: hp('2'),
                fontSize: hp('1.5'),
                fontFamily: fontFamily.helveticaBold,
                color: colors.appColor,
              }}>
              {/* {contactDatahere?.posts?.result?.categories[0].cat_desc} */}
              {selectedIssue?.length > 0 ? selectedIssue : 'Suggestion'}
              {/* {selectedIssue} */}
              {/* {contactDatahere?.posts?.result?.categories.map((e) => {
                console.log("e", e.cat_desc[0]);
                return e.cat_desc
              }
              )} */}
              {/* {contactDatahere?.posts?.result?.categories[1]?.cat_desc} */}
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
                style={{ flex: 0.4 }}></TouchableOpacity>
              <View style={styles.modalView}>
                <FlatListItem
                  data={contactDatahere?.posts?.result?.categories}
                  renderItem={renderItem}
                />
              </View>
              <TouchableOpacity
                onPress={onPressModal}
                style={{ flex: 0.45 }}></TouchableOpacity>
            </View>
          </Modal>

          <View
            style={{
              flex: 0.15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{ uri: 'arrowdown' }}
              style={{ height: hp('1.5'), width: wp('3') }}
              resizeMode={'contain'}
            />
          </View>
        </TouchableOpacity>

        {/* below */}

        {Complaint ? (
          <TouchableOpacity
            onPress={onPressLowerModal}
            style={{
              flexDirection: 'row',
              height: hp('6'),
              marginHorizontal: wp('6'),
              borderColor: colors.grey,
              borderWidth: wp('0.15'),
              borderRadius: wp('3'),
              marginTop: hp('3'),
            }}>
            <View style={{ flex: 0.85, justifyContent: 'center' }}>
              <Text
                style={{
                  marginLeft: hp('2'),
                  fontSize: hp('1.5'),
                  fontFamily: fontFamily.helveticaBold,
                  color: colors.appColor,
                }}>
                { }
                {selectedCompl.length > 0 ? selectedCompl : 'Fee Challan'}
              </Text>
            </View>

            <Modal
              animationType="fade"
              transparent={true}
              visible={innerModalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setInnerModalVisible(!innerModalVisible);
              }}>
              <View style={styles.modalMainView}>
                <TouchableOpacity
                  onPress={onPressLowerModal}
                  style={{ flex: 0.4 }}></TouchableOpacity>
                <View style={styles.lowerModalView}>
                  <FlatListItem
                    data={allComplaints}
                    renderItem={renderItemComplaints}
                  />
                </View>
                <TouchableOpacity
                  onPress={onPressLowerModal}
                  style={{ flex: 0.45 }}></TouchableOpacity>
              </View>
            </Modal>

            <View
              style={{
                flex: 0.15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{ uri: 'arrowdown' }}
                style={{ height: hp('1.5'), width: wp('3') }}
                resizeMode={'contain'}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <></>
        )}

        <View
          style={{
            height: hp('20'),
            marginHorizontal: wp('6'),
            borderColor: colors.grey,
            borderWidth: wp('0.15'),
            borderRadius: wp('3'),
            marginTop: hp('3'),
          }}>
          <TextInputCustom
            value={inputContactState}
            onChangeText={onChangeContact}
            keyboardType={'default'}
            placeholder={'Remarks'}
            placeholderColor={colors.appColor}
            textColor={colors.appColor}
            multiline={true}
            returnKeyType={'go'}
            style={styles.textInputCustomStyle}
          />
        </View>

        <View style={{ alignItems: 'center', marginVertical: hp('3') }}>
          <Button
            // onPress={() => navigation.navigate('HomeDrawer')}
            onPress={onPressSubmit}
            height={hp('4.5')}
            width={wp('25')}
            borderRadius={wp('1.5')}
            text="Submit"
            colorsArray={['#296cb1', '#2760a7', '#203d88']}
            // bgColor={colors.appColor}
            textColor={colors.white}
            textSize={hp('1.55')}
            textWeight={'bold'}
          />
        </View>

        <TouchableOpacity onPress={() => {
          Toast.show({
            type: 'success',
            text2: `${"contactComplaintDatahere?.reasons?.message"}`,
            visibilityTime: 4000,
            position: 'top',
          });
        }}><Text>KKKKK</Text>

        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalMainView: {
    flex: 1,
    flexDirection: 'column',
    margin: hp('5'),
    justifyContent: 'center',
  },
  modalView: {
    flex: 0.15,
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
  textInputCustomStyle: {
    paddingLeft: wp('4'),
    paddingVertical: hp('1'),
    fontSize: hp('1.5'),
    fontFamily: fontFamily.helveticaBold,
    color: colors.appColor,
    // fontWeight:"bold"
    // backgroundColor:"red"
  },
  modalText: {
    color: colors.lightBlack,
    fontFamily: fontFamily.helveticaLight,
    fontSize: hp('1.5'),
  },
  lineSeprator: {
    height: hp('0.05'),
    backgroundColor: colors.grey,
    marginLeft: wp('5'),
  },
  lowerModalView: {
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
});
export default ContactUs;
