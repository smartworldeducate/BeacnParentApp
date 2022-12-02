import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Button,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import { Picker, DatePicker } from 'react-native-wheel-pick';
import DatePicker from 'react-native-date-picker';
import colors from '../../Styles/colors';

import moment from 'moment';
import fontFamily from '../../Styles/fontFamily';

const DatePickerModal = ({modalVisible, onPressModal}) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // console.log("hook", moment(date).format("YYYY-DD-MM"))
  }, [date]);

  // const onPressDone = (date) => {
  //     console.log("date222", date);
  //     setDate(date);
  // }

  // const onPressDoneBtn = () => {
  //     onPressDone();
  //     onPressModal()
  // }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={null}>
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => onPressModal(date)}
          style={{
            flex: 0.7,
            backgroundColor: colors.transparentBlack,
          }}></TouchableOpacity>
        <View
          style={{
            flex: 0.3,
            backgroundColor: colors.white,
            justifyContent: 'center',
            alignItems: 'center',
            width: wp('100'),
          }}>
          {/* <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: hp('6') }}>
                        <View style={{ flex: 0.5, height: hp('6') }}></View>
                        <TouchableOpacity onPress={onPressModal} style={{ flex: 0.25, justifyContent: "center", alignItems: "center", height: hp('5') }}>
                            <Text style={{ color: colors.appColor, fontSize: hp('2.5'), fontFamily: fontFamily.semiBold }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressDoneBtn} style={{ flex: 0.25, justifyContent: "center", alignItems: "center", height: hp('5') }}>
                            <Text style={{ color: colors.appColor, fontSize: hp('2.5'), fontFamily: fontFamily.semiBold }}>Done</Text>
                        </TouchableOpacity>
                    </View> */}

          <DatePicker
            mode="date"
            minimumDate={new Date()}
            date={date}
            onDateChange={date => {
              // console.log("insideDate", date)
              setDate(date);
            }}

            // onDateChange={date => {
            //     onPressDone(date);
            // }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({});
export default DatePickerModal;
