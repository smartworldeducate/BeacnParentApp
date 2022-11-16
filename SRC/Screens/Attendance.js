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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';

import colors from '../Styles/colors';
import MainHeader from '../Components/Header/MainHeader';

const Attendance = () => {
  const navigation = useNavigation();

  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#606060'}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, backgroundColor: colors.white}}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#606060'} />

        <MainHeader
          onPressRightImg={() => navigation.goBack()}
          topLeftImg={'backarrow'}
          text={'Attendance'}
          stuName={'Azaan Ali'}
          stuNumber={'170838'}
          campName={'Canal side Campus'}
          className={'Class 3 - Red'}
          stuImage={'student'}
          stuStatus={'On-Roll'}
        />
        <View style={{width: '100%', padding: 20}}>
          <Calendar
            style={styles.calendar}
            headerStyle={styles.calendarHeader}
            dayComponent={day => {
              const arrNew = day?.accessibilityLabel.split(' ');
              console.log(day.date.day, 'dayday');
              // const count = calendarEvents?.filter((item: any) => {
              //   return item?.dateString === day?.date?.dateString;
              // }).length;
              return (
                <TouchableOpacity
                  onPress={() => {}}
                  style={[
                    styles.dayWrapper,
                    {
                      backgroundColor:
                        day.date.day > 5 &&
                        day.date.day < 13 &&
                        !(arrNew[1] == 'Saturday' || arrNew[1] == 'Sunday')
                          ? 'lightgreen'
                          : 'white',
                      borderRadius:
                        day.date.day > 5 &&
                        day.date.day < 13 &&
                        !(arrNew[1] == 'Saturday' || arrNew[1] == 'Sunday')
                          ? 100
                          : 0,
                    },
                  ]}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color:
                        arrNew[1] == 'Saturday' || arrNew[1] == 'Sunday'
                          ? 'blue'
                          : 'black',
                    }}>
                    {day.date && day.date.day}
                  </Text>
                </TouchableOpacity>
              );
            }}
            markingType={'multi-dot'}
            onMonthChange={date => {
              console.log(date, 'date');
            }}
            theme={{
              textDayFontSize: 12,
            }}
          />
        </View>
        <View style={{width: '100%', paddingHorizontal: 20}}>
          <View
            style={{
              height: 0.8,
              backgroundColor: 'black',
              width: '100%',
              alignSelf: 'center',
            }}></View>
        </View>
        <View style={{flexDirection: 'row', width: '100%', padding: 20}}>
          <View style={{width: '50%'}}>
            <View style={styles.row}>
              <View style={styles.box}></View>
              <Text style={styles.textStyle}>Present Physically</Text>
            </View>
            <View style={styles.row}>
              <View style={[styles.box, {backgroundColor: 'gray'}]}></View>
              <Text style={styles.textStyle}>Absent</Text>
            </View>
            <View style={styles.row}>
              <View style={[styles.box, {backgroundColor: 'black'}]}></View>
              <Text style={styles.textStyle}>Exempted</Text>
            </View>
          </View>
          <View style={{width: '50%'}}>
            <View style={styles.row}>
              <View style={[styles.box, {backgroundColor: 'skyblue'}]}></View>
              <Text style={styles.textStyle}>Present Online</Text>
            </View>
            <View style={styles.row}>
              <View style={[styles.box, {backgroundColor: 'pink'}]}></View>
              <Text style={styles.textStyle}>On Leave</Text>
            </View>
            <View style={styles.row}>
              <View style={[styles.box, {backgroundColor: 'blue'}]}></View>
              <Text style={styles.textStyle}>Holidays</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  box: {height: 25, width: 25, backgroundColor: 'red', borderRadius: 5},
  textStyle: {marginLeft: 8, color: 'black'},
  calendarHeader: {
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  dayWrapper: {
    height: 40,
    width: 40,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendar: {
    borderRadius: 8,
  },
});
export default Attendance;