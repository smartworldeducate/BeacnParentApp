import React, {useState} from 'react';
import {
  SafeAreaView,
  RefreshControl,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useNavigation} from '@react-navigation/native';
import DrawerHeader from '../../Components/Drawer/DrawerHeader';
import DrawerList from '../../Components/Drawer/DrawerList';
import colors from '../../Styles/colors';

import {useDispatch, useSelector} from 'react-redux';
import {getNotifications} from '../../Redux/Features/NotificationsKit/NotificationsKit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerContent = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const notificationsHere = useSelector(state => state.notifications);

  // console.log('notificationsFromDrawer', notificationsHere);

  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
  };

  const onPressLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('number');
    handleNavigate('MobileNumperEnter', true);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === 'android' ? colors.white : colors.white,
      }}>
      <View style={{paddingLeft: wp('3')}}>
        <View style={{marginTop: hp('2')}}>
          <DrawerHeader
            leftText={'Menu'}
            rightImg={'menublue'}
            // onPressRightImg={() => navigation.closeDrawer()}
          />
        </View>

        <View style={{marginVertical: hp('2')}}>
          <DrawerList
            leftImg={'home'}
            rightText={'Home'}
            onPress={() => navigation.navigate('HomeDrawer')}
          />

          <DrawerList
            leftImg={'attendancegrey'}
            rightText={'Attendance'}
            onPress={() => navigation.navigate('AttendanceDrawer')}
          />

          <DrawerList
            leftImg={'attendancegrey'}
            rightText={'Assessments'}
            onPress={() => navigation.navigate('AssessmentDrawer')}
          />

          <DrawerList
            leftImg={'challangrey'}
            rightText={'Challans'}
            onPress={() => navigation.navigate('ChallansDrawer')}
          />

          <DrawerList
            leftImg={'parentsprofile'}
            rightText={'Parents Profile'}
            onPress={() => navigation.navigate('ParentProfileDrawer')}
          />

          <DrawerList
            leftImg={'parentsprofile'}
            rightText={'Withdrawal Request'}
            onPress={() => navigation.navigate('WithdrawlRequestDrawer')}
          />

          <DrawerList
            leftImg={'attendancegrey'}
            rightText={'Notifications'}
            onPress={() =>
              handleNavigate('ViewAllNotifications', false, {
                notificationDataParam:
                  notificationsHere?.notifications?.notifications,
              })
            }
          />

          <DrawerList
            leftImg={'challangrey'}
            rightText={'Contact Us'}
            onPress={() => navigation.navigate('ContactUsDrawer')}
          />

          <DrawerList
            leftImg={'parentsprofile'}
            rightText={'Policies'}
            onPress={() => navigation.navigate('AllPoliciesDrawer')}
          />

          <DrawerList
            leftImg={'logoutgrey'}
            rightText={'Logout'}
            onPress={onPressLogout}
            // onPress={()=>navigation.navigate("")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default DrawerContent;
