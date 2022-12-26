import React, {useCallback, useEffect, useState} from 'react';
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

import {useDispatch, useSelector} from 'react-redux';
import {calanderAction} from '../Redux/Features/CalanderKit/CalanderKit';
import FlatListItem from '../Components/FlatList/FlatList';

import fontFamily from '../Styles/fontFamily';
import moment from 'moment';
import Loader from '../Components/Loader/Loader';

const Attendance = () => {
  const dispatch = useDispatch();
  const calanderHere = useSelector(state => state.calander);
  const childDatahere = useSelector(state => state.children);

  const navigation = useNavigation();
  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
  };

  useEffect(index => {
    dispatch(
      calanderAction(childDatahere?.posts?.result?.children[0]?.system_id),
    );
  }, []);

  const [todayDate, setMyTodsyDate] = useState(
    moment('12-6-2022').format('YYYY-DD-MM'),
  );
  // const [yesterDayDate, setYesterDayDate] = useState("11-10-2022");

  // const format = "YYYY/MM/DD";
  // const dateTime2 = moment(yesterDayDate).format('YYYY-MM-DD');

  // var datePoint = "11-11-2022";
  // var momentDate = moment(datePoint);
  // var formattedDate = momentDate.format("YYYY-MM-DD");
  // console.log("formattedDate", formattedDate);

  // var date2 = item.date_full;

  // dateTime2 = moment(date2).format(format2);

  // console.log("calanderHere", calanderHere?.posts?.result.attendance);

  // console.log(calanderHere?.posts?.result?.attendance.map((item) => {
  //     item.data.map((e) => {
  //         console.log("myDatesE", e.date_full);
  //     })
  // }));

  const renderItem = ({item, index}) => {
    return (
      <>
        <Text style={{fontSize: hp('2'), fontFamily: fontFamily.semiBold}}>
          {moment(item.date_full).format('YYYY-MM-DD')}
        </Text>
        {/* <FlatListItem
                    data={item.data}
                    renderItem={renderItemDates}
                /> */}
      </>
    );
  };

  const renderItemDates = ({item, index}) => {
    // console.log("itemDate", item.date_full);
    return (
      <>
        <Text>{item.date_full}</Text>
        {/* <Text>{`${moment(item.date_full).format("YYYY-MM-DD")}<<<<<<<<`}</Text> */}
      </>
    );
  };

  // var markedDay = {};

  // calanderHere?.posts?.result?.attendance.map((item) => {
  //     // console.log("itemCheck", item);
  //     item.data.map((e) => {
  //         // console.log("eDate", moment(e.date_full).format("YYYY-MM-DD"));
  //         let date = e.date_full;
  //         let date1 = moment(e.date_full).format("YYYY-DD-MM");
  //         // console.log("date<<<", date);
  //         // console.log("date1>>>>", date1);

  //         markedDay[date1] = {
  //             // markedDay[moment(e.date_full).format("YYYY-MM-DD")] = {
  //             selected: true,
  //             marked: true,
  //             selectedColor: "red",
  //         }
  //         // console.log("myDatesE", moment(e.date_full).format("YYYY-MM-DD"));
  //         // console.log("myDatesE", date);
  //     })
  // })

  var markedDay = {};

  calanderHere?.posts?.result?.attendance_calendar.map(item => {
    // console.log("item.date_full", item.date_full);
    let formattedDate = moment(item.start_date).format('YYYY-MM-DD');
    // console.log("formattedDate", formattedDate.toString());
    console.log('typeof', typeof formattedDate);
    markedDay[formattedDate.toString()] = {
      selected: true,
      // marked: true,
      selectedTextColor: 'white',
      selectedColor:
        item.status === 'Present'
          ? colors.lightGreen
          : item.status === 'Absent'
          ? '#8f211d'
          : item.status === 'Online_present'
          ? '#2f727e'
          : item.status === 'Holiday'
          ? '#8996a3'
          : null,
      // selectedColor: item.status === "Present" ? "green" : item.status === "Absent" ? "#8f211d" : item.status === "Online_present" ? "#2f727e" : null,
    };
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === 'android' ? colors.white : colors.white,
      }}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, backgroundColor: colors.white}}>
        <StatusBar barStyle={'default'} backgroundColor={colors.lightBlack} />

        {childDatahere?.posts?.result?.children.length > 0 && (
          <MainHeader
            onPressRightImg={() => navigation.goBack()}
            topLeftImg={'backarrow'}
            text={'Attendance'}
            data={childDatahere?.posts?.result?.children}
          />
        )}

        {/* calander work */}

        <Text>{}</Text>

        {calanderHere?.isLoading && <Loader></Loader>}

        <View
          style={{
            width: '100%',
            marginTop: hp('5'),
            paddingHorizontal: wp('3'),
          }}>
          <Calendar
            headerStyle={styles.calendarHeader}
            hideExtraDays={true}
            scrollEnabled={true}
            horizontal={true}
            // showScrollIndicator={true}
            enableSwipeMonths={true}
            // firstDay={1}

            theme={{
              // backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',

              // textSectionTitleColor: '#b6c1cd',
              // textSectionTitleDisabledColor: '#d9e1e8',
              // selectedDayBackgroundColor: colors.appColor,
              selectedDayBackgroundColor: 'white',
              selectedDayTextColor: colors.black,
              // todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              // dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: colors.white,
              disabledArrowColor: '#d9e1e8',
              monthTextColor: colors.white,
              // indicatorColor: 'blue',
              textDayFontFamily: fontFamily.helveticaBold,
              // textMonthFontFamily: 'monospace',
              // textDayHeaderFontFamily: 'monospace',
              // textDayFontWeight: "bold",
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: 'bold',
              // textDayFontSize: 16,
              // textMonthFontSize: 16,
              // textDayHeaderFontSize: 16
            }}
            // monthFormat={'DD-MM-YYYY'}

            // markingType={'custom'}
            markedDates={markedDay}

            // markedDates={{

            // }}

            // 16-10-2022

            // markedDates={{
            //     '16-11-2022': {
            //         customStyles: {
            //             container: {
            //                 backgroundColor: 'green'
            //             },
            //             text: {
            //                 color: 'black',
            //                 fontWeight: 'bold'
            //             }
            //         }
            //     },
            //     '15-11-2022': {
            //         customStyles: {
            //             container: {
            //                 backgroundColor: 'red',
            //                 elevation: 2
            //             },
            //             text: {
            //                 color: 'blue'
            //             }
            //         }
            //     }
            // }}

            // markedDates={{
            //     [calanderHere?.posts?.result?.attendance.map((item) => {
            //         return item.data.map((e) => {
            //             return moment(e.date_full).format("YYYY-MM-DD")
            //         })
            //     })]: {
            //         customStyles: {
            //             text: {
            //                 color: "blue", fontFamily: fontFamily.semiBold, fontSize: 12
            //             },
            //             container: {
            //                 backgroundColor: "red",
            //                 borderRadius: 5,
            //                 justifyContent: "center",
            //                 alignItems: "center",
            //                 elevation: 2, height: hp("3.5%")
            //             }
            //         },
            //     }
            // }}
          />

          {/* <Calendar
                        style={styles.calendar}
                        headerStyle={styles.calendarHeader}
                        dayComponent={day => {
                            const arrNew = day?.accessibilityLabel.split(' ');
                            // console.log(day.date.day, 'dayday');
                            // const count = calendarEvents?.filter((item: any) => {
                            //   return item?.dateString === day?.date?.dateString;
                            // }).length;
                            return (
                                <TouchableOpacity
                                    onPress={() => { }}
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
                            // console.log(date, 'date');
                        }}
                        theme={{
                            textDayFontSize: 12,
                        }}
                    /> */}
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
              <View style={[styles.box, {backgroundColor: '#8f211d'}]}></View>
              <Text style={styles.textStyle}>Absent</Text>
            </View>
            <View style={styles.row}>
              <View style={[styles.box, {backgroundColor: '#2c71b3'}]}></View>
              <Text style={styles.textStyle}>Exempted</Text>
            </View>
          </View>
          <View style={{width: '50%'}}>
            <View style={styles.row}>
              <View style={[styles.box, {backgroundColor: '#2f727e'}]}></View>
              <Text style={styles.textStyle}>Present Online</Text>
            </View>
            <View style={styles.row}>
              <View style={[styles.box, {backgroundColor: '#e27538'}]}></View>
              <Text style={styles.textStyle}>On Leave</Text>
            </View>
            <View style={styles.row}>
              <View style={[styles.box, {backgroundColor: '#8996a3'}]}></View>
              <Text style={styles.textStyle}>Holidays</Text>
            </View>
          </View>
        </View>

        {/* <FlatListItem
                    data={calanderHere?.posts?.result?.attendance_calendar}
                    renderItem={renderItem}
                /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  box: {
    height: hp('2.75'),
    width: wp('5.5'),
    backgroundColor: colors.lightGreen,
    borderRadius: wp('1.2'),
  },
  textStyle: {
    marginLeft: wp(1.5),
    color: colors.lightBlack,
    fontSize: hp('1.6'),
    fontFamily: fontFamily.helveticaLight,
  },
  calendarHeader: {
    backgroundColor: colors.appColor,
    borderRadius: 0,
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
