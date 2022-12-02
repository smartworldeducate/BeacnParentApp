import React, {useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import fontFamily from '../Styles/fontFamily';
import colors from '../Styles/colors';
import MainHeader from '../Components/Header/MainHeader';
import Button from '../Components/Button/Button';
import TextInputCustom from '../Components/TextInput/TextInput';
import FlatListItem from '../Components/FlatList/FlatList';
import LineSeprator from '../Components/LineSeprator/LineSeprator';
import {useDispatch, useSelector} from 'react-redux';

const ContactUs = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const childDatahere = useSelector(state => state.children);
  const [modalVisible, setModalVisible] = useState(false);
  const [innerModalVisible, setInnerModalVisible] = useState(false);

  const [inputContactState, setInputContactState] = useState('');
  const [selectedRec, setSelectedRec] = useState('');

  const [selectedCompl, setSelectedCompl] = useState('');

  const [recommendations, setRecommendations] = useState([
    {id: 1, recName: 'Suggestion', byDefault: true},
    {id: 2, recName: 'Complaint', byDefault: false},
  ]);

  const [allComplaints, setAllComplaints] = useState([
    {id: 1, complainTitle: 'Fee Challan Issue', byDefaultValue: true},
    {id: 2, complainTitle: 'School Adminstration', byDefaultValue: false},
    {id: 3, complainTitle: 'Teaching Staff', byDefaultValue: false},
    {id: 4, complainTitle: 'Student Well Being', byDefaultValue: false},
    {id: 5, complainTitle: 'Others', byDefaultValue: false},
  ]);

  const [suggestion, setSuggestion] = useState(true);
  const [Complaint, setComplaint] = useState(false);

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

  const onPressSelected = ({item}) => {
    // console.log("realVal", item.byDefault);
    // console.log("changeVal", item.byDefault = true ? true : false);
    setSelectedRec(item.recName);
    setModalVisible(!modalVisible);
    // console.log("recommendations", recommendations);

    if (item.id == 1) {
      setSuggestion(true);
      setComplaint(false);
    } else {
      setSuggestion(false);
      setComplaint(true);
    }

    // console.log("suggestion", suggestion);
    // console.log("Complaint", Complaint);

    // setRecommendations(recommendations.byDefault = item.byDefault = true ? true : false)
  };

  const onPressSelectedComplain = ({item}) => {
    setSelectedCompl(item.complainTitle);
    setInnerModalVisible(!innerModalVisible);
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => onPressSelected({item})}
          style={{flexDirection: 'row', marginHorizontal: wp('3')}}>
          <View style={{flex: 0.85, justifyContent: 'center'}}>
            <Text style={styles.modalText}>{item.recName}</Text>
          </View>
          <View
            style={{
              flex: 0.15,
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginVertical: hp('2'),
            }}>
            <Image
              source={{uri: 'circleselect'}}
              style={{height: hp('2'), width: wp('4')}}
              resizeMode={'contain'}
            />
          </View>
        </TouchableOpacity>

        <LineSeprator style={styles.lineSeprator} />
      </View>
    );
  };

  const renderItemComplaints = ({item}) => {
    console.log('itemComplaints', item);
    return (
      <View style={{}}>
        <TouchableOpacity
          onPress={() => onPressSelectedComplain({item})}
          style={{flexDirection: 'row', marginHorizontal: wp('3')}}>
          <View style={{flex: 0.85, justifyContent: 'center'}}>
            <Text style={styles.modalText}>{item.complainTitle}</Text>
          </View>
          <View
            style={{
              flex: 0.15,
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginVertical: hp('2'),
            }}>
            <Image
              source={{uri: 'circleselect'}}
              style={{height: hp('2'), width: wp('4')}}
              resizeMode={'contain'}
            />
          </View>
        </TouchableOpacity>
        <View style={{height: hp('0.1'), backgroundColor: colors.grey}}></View>
      </View>
    );
  };

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
          <View style={{flex: 0.85, justifyContent: 'center'}}>
            <Text
              style={{
                marginLeft: hp('2'),
                fontSize: hp('1.75'),
                fontFamily: fontFamily.regularAlatsi,
                color: colors.appColor,
              }}>
              {selectedRec.length > 0 ? selectedRec : 'Suggestion'}
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
                style={{flex: 0.4}}></TouchableOpacity>
              <View style={styles.modalView}>
                <FlatListItem data={recommendations} renderItem={renderItem} />
              </View>
              <TouchableOpacity
                onPress={onPressModal}
                style={{flex: 0.45}}></TouchableOpacity>
            </View>
          </Modal>

          <View
            style={{
              flex: 0.15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: 'arrowdown'}}
              style={{height: hp('2'), width: wp('4')}}
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
            <View style={{flex: 0.85, justifyContent: 'center'}}>
              <Text
                style={{
                  marginLeft: hp('2'),
                  fontSize: hp('1.75'),
                  fontFamily: fontFamily.regularAlatsi,
                  color: colors.appColor,
                }}>
                {selectedCompl.length > 0 ? selectedCompl : 'Others'}
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
                  style={{flex: 0.4}}></TouchableOpacity>
                <View style={styles.lowerModalView}>
                  <FlatListItem
                    data={allComplaints}
                    renderItem={renderItemComplaints}
                  />
                </View>
                <TouchableOpacity
                  onPress={onPressLowerModal}
                  style={{flex: 0.45}}></TouchableOpacity>
              </View>
            </Modal>

            <View
              style={{
                flex: 0.15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: 'arrowdown'}}
                style={{height: hp('2'), width: wp('4')}}
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

        <View style={{alignItems: 'center', marginVertical: hp('3')}}>
          <Button
            onPress={() => navigation.navigate('HomeDrawer')}
            height={hp('4.5')}
            width={wp('25')}
            borderRadius={wp('1.5')}
            text="Submit"
            bgColor={colors.appColor}
            textColor={colors.white}
            textSize={hp('1.55')}
            textWeight={'bold'}
          />
        </View>
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
    fontSize: hp('1.65'),
    fontFamily: fontFamily.regular,
    color: colors.appColor,
    // fontWeight:"bold"
    // backgroundColor:"red"
  },
  modalText: {
    color: colors.lightBlack,
    fontFamily: fontFamily.regular,
    fontSize: hp('1.65'),
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
