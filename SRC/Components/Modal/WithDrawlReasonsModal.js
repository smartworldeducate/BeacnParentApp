import React, { useState } from 'react';
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
import FlatListItem from '../FlatList/FlatList';
import NotificationHeader from '../Header/NotificationHeader';

const WithDrawlReasonsModal = ({
  modalVisible,
  onPressModal,
  modalUpperFlex,
  modalLowerFlex,
  flatlistData,
  flatlistRenderItem,
}) => {
  // const renderItem = ({ item, index }) => {
  //     console.log("item", item);
  // }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={null}>
      <View style={styles.modalView}>
        <TouchableOpacity
          onPress={onPressModal}
          style={{ flex: modalUpperFlex }}></TouchableOpacity>

        <View style={{ flex: modalLowerFlex, backgroundColor: colors.white }}>
          <NotificationHeader
            text={'Withdrawl Request Detail'}
            rightImg={'crosscircle'}
            onPressRightImg={onPressModal}
          />

          <ScrollView>
            <View style={styles.modalLowerInnerView}>
              <FlatListItem
                data={flatlistData}
                renderItem={flatlistRenderItem}
                keyExtractor={(item, index) => index.toString()}
                initialNumToRender={flatlistData?.length}
              />
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={{ marginBottom: hp('2') }}></View>
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
  },
  modalLowerInnerView: {
    padding: wp('5'),
  },
  sentToText: {
    fontSize: hp('1.85'),
    fontFamily: fontFamily.helveticaLight,
    color: colors.lightBlack,
    paddingVertical: hp('1'),
  },
  lowerText: {
    fontSize: hp('1.75'),
    fontFamily: fontFamily.helveticaLight,
    color: colors.lightBlack,
    paddingVertical: hp('1.5'),
  },
});
export default WithDrawlReasonsModal;
