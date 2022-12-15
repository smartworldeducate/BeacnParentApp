import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Linking,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';
import LeftImgTextHeader from '../Header/LeftImgTextHeader';

const PolicyModal = ({ modalVisible, onPressModal, textHeader, text }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={null}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#606060' }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.white }}>
          <StatusBar barStyle={'light-content'} backgroundColor={'#606060'} />

          <LeftImgTextHeader
            onPressLeftImg={onPressModal}
            leftImg={'backarrow'}
            text={textHeader}
          />

          <View
            style={{
              flex: 1,
              marginLeft: wp('8'),
              marginRight: wp('3'),
              // marginVertical: hp('1.5'),
              marginTop: hp("2"),
              marginBottom: hp("1")
            }}>
            <Text
              onPress={() => Linking.openURL(text)}
              style={{
                fontSize: hp('1.7'),
                fontFamily: fontFamily.helveticaRegular,
                color: colors.black,
              }}>
              {text}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({});
export default PolicyModal;
