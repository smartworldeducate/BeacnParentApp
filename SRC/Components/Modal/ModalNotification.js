import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';
import NotificationHeader from '../Header/NotificationHeader';
import RenderHtml from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';
import SingleLine from '../SingleLine/SingleLine';

const ModalNotification = ({
  modalVisible,
  onPressModal,
  modalUpperFlex,
  modalLowerFlex,
  to,
  details,
  sentBy,
}) => {
  const {width} = useWindowDimensions();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={null}>
      <View style={styles.modalView}>
        <TouchableOpacity
          onPress={onPressModal}
          style={{flex: modalUpperFlex}}></TouchableOpacity>

        <View style={{flex: modalLowerFlex, backgroundColor: colors.white}}>
          <NotificationHeader
            text={'Notification Details'}
            rightImg={'closesilver'}
            onPressRightImg={onPressModal}
          />

          <ScrollView>
            <View style={styles.modalLowerInnerView}>
              <RenderHtml contentWidth={width} source={{html: details}} />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    flexDirection: 'column',
  },
  modalUpperView: {
    flex: 0.4,
  },
  modalLowerView: {
    flex: 0.6,
    backgroundColor: colors.white,
  },
  modalLowerInnerView: {
    marginVertical: hp('2'),
    marginHorizontal: wp('5'),
  },
  sentToText: {
    fontSize: hp('1.85'),
    fontFamily: fontFamily.regular,
    color: colors.lightBlack,
    paddingVertical: hp('1'),
  },
  lowerText: {
    fontSize: hp('1.75'),
    fontFamily: fontFamily.regular,
    color: colors.lightBlack,
    paddingVertical: hp('1.5'),
  },
});
export default ModalNotification;
