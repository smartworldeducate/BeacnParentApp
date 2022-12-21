import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
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
import TextInputCustom from '../TextInput/TextInput';
import Button from '../Button/Button';

const UpdateAddressModal = ({
  modalVisible,
  onPressModal,
  modalUpperFlex,
  modalLowerFlex,
  headerTitle,
  onPressRightImg,
  inputAddress,
  onChangeAddress,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={null}>
      <TouchableOpacity
        onPress={onPressModal}
        style={{flex: modalUpperFlex}}></TouchableOpacity>

      <View style={{flex: modalLowerFlex, backgroundColor: colors.white}}>
        <NotificationHeader
          text={headerTitle}
          rightImg={'crosscircle'}
          onPressRightImg={onPressRightImg}
        />

        <ScrollView>
          <View style={{marginHorizontal: wp('6')}}>
            <View style={{marginTop: hp('2')}}>
              <Text style={styles.textStyle}>
                Our Record indicates that your correspondence addresss registerd
                with us is as follows.
              </Text>
            </View>

            <View style={{marginTop: hp('1.5')}}>
              <TextInputCustom
                Value={inputAddress}
                onChangeText={onChangeAddress}
                maxLength={200}
                placeholder={'Enter your correspondence address'}
                multiline={true}
                placeholderColor={colors.grey}
                textColor={colors.appColor}
                returnKeyType={'go'}
                numberOfLines={10}
                style={styles.textInputCustomStyle}
              />

              <Text style={styles.tapEditText}>Tap to edit</Text>
            </View>

            <View style={styles.textView}>
              <Button
                height={hp('4.5')}
                borderRadius={wp('1.5')}
                text="Update"
                colorsArray={['#296cb1', '#2760a7', '#203d88']}
                textColor={colors.white}
                textSize={hp('1.75')}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: hp('1.85'),
    fontFamily: fontFamily.regular,
    color: colors.grey,
    textAlign: 'auto',
  },
  textInputCustomStyle: {
    marginTop: wp('1.5'),
    fontSize: hp('1.75'),
    fontFamily: fontFamily.regular,
    height: hp('15'),
    borderRadius: wp('2'),
    borderColor: colors.grey,
    borderWidth: wp('0.15'),
    paddingHorizontal: wp('3'),
  },
  tapEditText: {
    fontSize: hp('1.25'),
    fontFamily: fontFamily.regular,
    color: colors.grey,
  },
  textView: {
    justifyContent: 'center',
    marginHorizontal: wp('20'),
    marginVertical: hp('3'),
  },
});
export default UpdateAddressModal;
