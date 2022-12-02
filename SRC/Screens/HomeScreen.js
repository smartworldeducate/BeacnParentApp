import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  RefreshControl,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../Styles/colors';
import MainHeader from '../Components/Header/MainHeader';
import HomeCentralView from '../Components/HomeCentralView/HomeCentralView';
import LeftRightImgText from '../Components/LeftRightImgText/LeftRightImgText';
import LineSeprator from '../Components/LineSeprator/LineSeprator';
import FlatListItem from '../Components/FlatList/FlatList';
import fontFamily from '../Styles/fontFamily';
import ModalNotification from '../Components/Modal/ModalNotification';
import ListEmptyComponent from '../Components/FlatList/ListemptyComponent';
import Loader from '../Components/Loader/Loader';

import {getChild} from '../Redux/Features/getChildData/children';
import {useDispatch, useSelector} from 'react-redux';

import {getNotifications} from '../Redux/Features/NotificationsKit/NotificationsKit';
import moment from 'moment';
import RenderHtml from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';
import SingleLine from '../Components/SingleLine/SingleLine';

const HomeScreen = () => {
  const {width} = useWindowDimensions();

  const dispatch = useDispatch();
  const childDatahere = useSelector(state => state.children);
  const mobile = useSelector(state => state.OTPCodeStore);
  const notificationsHere = useSelector(state => state.notifications);

  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState();
  const [text, setText] = useState();
  const [type, setType] = useState();
  const [num, setNum] = useState();
  const [to, setTo] = useState();
  const [sentBy, setSentBy] = useState();
  const [details, setDetails] = useState();

  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
  };

  const onPressModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    dispatch(
      getNotifications(childDatahere?.posts?.result?.children[0]?.system_id),
    );
  }, [childDatahere]);

  // console.log("notificationsHere", notificationsHere);
  // console.log("notificationsHere", notificationsHere?.notifications?.notifications);
  // console.log("childDataHere", childDatahere);

  const [notificationData, setNotificationData] = useState([
    {
      id: 1,
      date: '03 Oct',
      text: 'Dispatch SMS',
      type: 'Notification',
      to: 'Dear Parents',
      sentBy: 'School Office',
      details:
        'Employing a parent notification system can ensure all your communications are streamlined and timely. When done manually, it can demand substantial effort. A parent alert is a text or call notification that goes out in bulk to your contacts. Schools employ such methods to ensure no delay in delivering the message to parents. First, let’s consider texts. Say your K-12 school has about 650 students. It can take anywhere between 10-30 minutes to create a group or broadcast list manually. This depends on the length of the list and also on the speed of the person in charge. We haven’t even considered the obstacle posed by your tool (like group strength limits). Employing a parent notification system can ensure all your communications are streamlined and timely. When done manually, it can demand substantial effort. A parent alert is a text or call notification that goes out in bulk to your contacts. Schools employ such methods to ensure no delay in delivering the message to parents. First, let’s consider texts. Say your K-12 school has about 650 students. It can take anywhere between 10-30 minutes to create a group or broadcast list manually. This depends on the length of the list and also on the speed of the person in charge. We haven’t even considered the obstacle posed by your tool (like group strength limits).',
    },
    {
      id: 2,
      date: '05 Oct',
      text: 'Dispatch SMS ',
      type: 'Notification',
      to: 'Dear Parents',
      sentBy: 'Beaconhouse',
      details:
        'Employing a parent notification system can ensure all your communications are streamlined and timely. When done manually, it can demand substantial effort.',
    },
    {
      id: 3,
      date: '18 Aug',
      text: 'Dispatch SMS ',
      type: 'Notification',
      to: 'Dear Parents',
      sentBy: 'School Office',
      details:
        'Employing a parent notification system can ensure all your communications are streamlined and timely. When done manually, it can demand substantial effort.',
    },
    {
      id: 4,
      date: '2 Aug',
      text: 'Dispatch SMS ',
      type: 'SMS',
      to: 'Dear Parents',
      sentBy: 'School Office',
      details:
        'Employing a parent notification system can ensure all your communications are streamlined and timely. When done manually, it can demand substantial effort.',
    },
    {
      id: 5,
      date: '29 Apr',
      text: 'Dispatch SMS ',
      type: 'SMS',
      to: 'Dear Parents',
      sentBy: 'Adminstration Beacohouse School System',
      details:
        'Employing a parent notification system can ensure all your communications are streamlined and timely. When done manually, it can demand substantial effort.',
    },
    {
      id: 6,
      date: '23 Apr',
      text: 'Dispatch SMS ',
      type: 'SMS',
      to: 'Dear Parents',
      sentBy: 'School Office',
      details:
        'Employing a parent notification system can ensure all your communications are streamlined and timely. When done manually, it can demand substantial effort.',
    },
    {
      id: 7,
      date: '03 Oct',
      text: 'Dispatch SMS ',
      type: 'Notification',
      to: 'Dear Parents',
      sentBy: 'School Office',
      details:
        'Employing a parent notification system can ensure all your communications are streamlined and timely. When done manually, it can demand substantial effort.',
    },
    {
      id: 8,
      date: '05 Oct',
      text: 'Dispatch SMS ',
      type: 'Notification',
      to: 'Dear Parents',
      sentBy: 'School Office',
      details:
        'Employing a parent notification system can ensure all your communications are streamlined and timely. When done manually, it can demand substantial effort.',
    },
    {
      id: 9,
      date: '18 Aug',
      text: 'Dispatch SMS ',
      type: 'Notification',
      to: 'Dear Parents',
      sentBy: 'School Office',
      details:
        'Employing a parent notification system can ensure all your communications are streamlined and timely. When done manually, it can demand substantial effort.',
    },
    {
      id: 10,
      date: '2 Aug',
      text: 'Dispatch SMS ',
      type: 'SMS',
      to: 'Dear Parents',
      sentBy: 'School Office',
      details:
        'Employing a parent notification system can ensure all your communications are streamlined and timely. When done manually, it can demand substantial effort.',
    },
    {
      id: 11,
      date: '29 Apr',
      text: 'Dispatch SMS ',
      type: 'SMS',
      to: 'Dear Parents',
      sentBy: 'School Office',
      details:
        'Employing a parent notification system can ensure all your communications are streamlined and timely. When done manually, it can demand substantial effort.',
    },
    {
      id: 12,
      date: '23 Apr',
      text: 'Dispatch SMS ',
      type: 'SMS',
      to: 'Dear Parents',
      sentBy: 'School Office',
      details:
        'Employing a parent notification system can ensure all your communications are streamlined and timely. When done manually, it can demand substantial effort.',
    },
  ]);

  const [timeOut, setTimeOut] = useState(false);

  useEffect(() => {
    AsyncStorage.setItem('token', 'token');
    getNumber();
    if (mobile?.posts?.result?.sms_number != undefined || num != '') {
      if (mobile?.posts?.result?.sms_number != undefined) {
        dispatch(getChild(mobile?.posts?.result?.sms_number));
      } else {
        dispatch(getChild(num));
      }
    }
  }, [mobile?.posts, num]);
  const getNumber = async () => {
    const number = await AsyncStorage.getItem('number');
    if (number != undefined) {
      setNum(number);
    } else {
      setNum('');
    }
  };

  const renderItem = ({item, index}) => {
    // console.log("item", item);
    var myDate1 = moment(item.date).format('D');
    var myDate2 = moment(item.date).format('MMM');
    return (
      <View style={styles.listMainView}>
        <View style={styles.listLeftView}>
          <Text
            style={{
              fontSize: hp('1.8'),
              fontFamily: fontFamily.bold,
              textAlign: 'center',
              color: colors.grey,
            }}>{`${myDate1}\n${myDate2}`}</Text>
        </View>
        <View style={styles.listCentralView}>
          <SingleLine
            text1={
              item.title.includes(
                '<br />',
                '\n',
                '\r',
                '<a href="https://bit.ly/3Su5JMP" >https://bit.ly/3Su5JMP</a>',
              ) ? (
                <RenderHtml
                  contentWidth={width}
                  source={{html: index != 0 ? item.body : item.title}}
                  defaultTextProps={
                    {
                      // numberOfLines: 1, ellipsizeMode: 'tail'
                    }
                  }
                />
              ) : (
                item.title
              )
            }
          />

          <Text style={styles.centalLowerText}>{item.notification_type}</Text>
        </View>
        <TouchableOpacity
          onPress={() => onPressRightImg({item})}
          style={styles.listRightView}>
          <Image
            source={{uri: 'forwardarrow'}}
            style={styles.listRightImg}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const onPressRightImg = ({item}) => {
    // setDate(item.date);
    // setText(item.text);
    // setType(item.type);
    // setTo(item.to);
    // setSentBy(item.sentBy);
    // setDetails(item.details);
    setDetails(item.body);
    onPressModal();
  };

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
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
          onPressRightImg={() => navigation.openDrawer()}
          topLeftImg={'menu'}
          text={'Student Profile'}
          data={childDatahere?.posts?.result?.children}
        />
      )}
      {!childDatahere?.posts?.result?.children.length > 0 ? (
        <Loader></Loader>
      ) : (
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
              colors={[colors.fbColor, colors.paratGreen, colors.red]}
              progressBackgroundColor={colors.silverGrey}
              tintColor={colors.appColor}
            />
          }>
          <View style={styles.mainCentral}>
            <View style={styles.centralView}>
              <HomeCentralView
                onPress={() => handleNavigate('Attendance')}
                img={'attendence'}
                text={'Attendance'}
              />
            </View>

            <View style={styles.centralView}>
              <HomeCentralView
                onPress={() => handleNavigate('Assessment')}
                img={'assesment'}
                text={'Assessment'}
              />
            </View>

            <View style={styles.centralView}>
              <HomeCentralView
                onPress={() => handleNavigate('Challans')}
                img={'challan'}
                text={'Challans'}
              />
            </View>
          </View>
          <LeftRightImgText
            onPressRight={() =>
              handleNavigate('ViewAllNotifications', false, {
                notificationDataParam:
                  notificationsHere?.notifications?.notifications,
              })
            }
            leftText={'Notifications'}
            rightText={'View All'}
            img={'rightarrow'}
            marginHorizontal={wp('8')}
          />

          <LineSeprator style={styles.lineSeprator} />
          {/* <Loader ></Loader> */}
          <FlatListItem
            data={notificationsHere?.notifications?.notifications}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            // ListEmptyComponent={
            //   <ListEmptyComponent
            //     img={'empty'}
            //     styleImg={styles.styleImg}
            //     style={styles.listEmptyComponent}
            //     text={'Right Now there is no notification'}
            //   />
            // }
            initialNumToRender={8}
            ItemSeparatorComponent={
              <LineSeprator style={styles.listSeprator} />
            }
          />

          <View style={styles.bottomView}></View>

          <ModalNotification
            modalVisible={modalVisible}
            onPressModal={onPressModal}
            modalUpperFlex={0.3}
            modalLowerFlex={0.7}
            to={to}
            details={details}
            sentBy={sentBy}
          />

          <View style={{marginBottom: hp('5')}}></View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainCentral: {
    flexDirection: 'row',
    marginHorizontal: hp('1'),
    marginTop: hp('3'),
    marginBottom: hp('2'),
    justifyContent: 'space-evenly',
  },
  centralView: {
    flex: 0.33,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineSeprator: {
    height: hp('0.2'),
    backgroundColor: colors.appColor,
    marginHorizontal: wp('8'),
    marginTop: hp('1'),
    marginBottom: hp('2'),
  },
  listMainView: {
    flexDirection: 'row',
    marginHorizontal: wp('6'),
  },
  listLeftView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('6'),
    width: wp('6'),
    borderRadius: wp('3'),
    borderWidth: wp('0.15'),
    borderColor: colors.appColor,
  },
  listCentralView: {
    flex: 0.7,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: wp('3'),
  },
  centalUpperText: {
    fontSize: hp('1.85'),
    fontFamily: fontFamily.regular,
    color: colors.grey,
    lineHeight: hp('2.5'),
  },
  centalLowerText: {
    fontSize: hp('2'),
    fontFamily: fontFamily.regular,
    color: colors.lightBlack,
    lineHeight: hp('2.5'),
  },
  listRightView: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listRightImg: {
    height: hp('1.5'),
    width: wp('3'),
  },
  styleImg: {
    height: hp('15'),
    width: wp('30'),
  },
  listEmptyComponent: {
    color: colors.appColor,
    fontFamily: fontFamily.semiBold,
    fontSize: hp('1.5'),
    paddingVertical: wp('2'),
    textAlign: 'center',
  },
  listSeprator: {
    height: hp('0.08'),
    backgroundColor: colors.grey,
    marginHorizontal: wp('8'),
    marginVertical: hp('0.85'),
  },
  bottomView: {
    marginBottom: hp('1'),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
export default HomeScreen;
