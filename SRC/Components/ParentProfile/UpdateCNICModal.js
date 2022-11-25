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
import ImagePicker from 'react-native-image-crop-picker';
import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';
import NotificationHeader from '../Header/NotificationHeader';
import ImagePickerCrop from '../ImagePicker/ImagePickerCrop';
import TextInputCustom from '../TextInput/TextInput';
import Button from '../Button/Button';

const UpdateCNICModal = ({
  modalVisible,
  onPressModal,
  modalUpperFlex,
  modalLowerFlex,
  headerTitle,
  onPressRightImg,
  inputName,
  onChangeName,
  inputCNIC,
  onChangeCNIC,
  text1,
  text2,
}) => {
  const [idCardFront, setIdCardFront] = useState('idcard');
  const [idCardBack, setIdCardBack] = useState('idcard');

  const [frontModalValue, setFrontModalValue] = useState(false);
  const [backModalValue, setBackModalValue] = useState(false);

  const onPressFrontIdCardModal = () => {
    setFrontModalValue(!frontModalValue);
  };

  const onPressFrontPhotoLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setIdCardFront(image.path);
      setFrontModalValue(false);
    });
  };

  const onPressFrontCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setIdCardFront(image.path);
      setFrontModalValue(false);
    });
  };

  const onPressBackIdCardModal = () => {
    setBackModalValue(!backModalValue);
  };

  const onPressBackPhotoLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setIdCardBack(image.path);
      setBackModalValue(false);
    });
  };

  const onPressBackCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setIdCardBack(image.path);
      setBackModalValue(false);
    });
  };

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
              <Text style={styles.mainText}>
                Our Record indicates that your information registered with us is
                as follows.
              </Text>
            </View>

            <View style={{marginTop: hp('1.5')}}>
              <Text style={styles.textStyle}>{text1}</Text>

              <TextInputCustom
                Value={inputName}
                onChangeText={onChangeName}
                maxLength={30}
                placeholder={'Enter CNIC Name'}
                placeholderColor={colors.grey}
                textColor={colors.appColor}
                returnKeyType={'go'}
                style={styles.textInputCustomStyle}
              />

              <Text style={styles.tapEditText}>Tap to edit</Text>
            </View>

            <View style={{marginTop: hp('1.5')}}>
              <Text style={styles.textStyle}>{text2}</Text>

              <TextInputCustom
                Value={inputCNIC}
                onChangeText={onChangeCNIC}
                keyboardType={'numeric'}
                maxLength={30}
                placeholder={'Enter CNIC No.'}
                placeholderColor={colors.grey}
                textColor={colors.appColor}
                returnKeyType={'go'}
                style={styles.textInputCustomStyle}
              />

              <Text style={styles.tapEditText}>Tap to edit</Text>
            </View>

            <View style={{flexDirection: 'row', marginVertical: hp('2')}}>
              <View style={{flex: 0.1, justifyContent: 'center'}}></View>
              <TouchableOpacity
                onPress={onPressFrontIdCardModal}
                style={styles.idCardView}>
                <Image
                  source={{uri: idCardFront}}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />
              </TouchableOpacity>

              <View style={{flex: 0.1, justifyContent: 'center'}}></View>

              <TouchableOpacity
                onPress={onPressBackIdCardModal}
                style={styles.idCardView}>
                <Image
                  source={{uri: idCardBack}}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />
              </TouchableOpacity>
              <View style={{flex: 0.1, justifyContent: 'center'}}></View>
            </View>

            <View style={{marginVertical: hp('2')}}>
              <Text style={styles.instructionsText}>
                Please upload your valid CNIC (Front and Back) in PNG / JPEG
                format. File size should not exceed 3MB.
              </Text>
            </View>

            <View style={styles.textView}>
              <Button
                height={hp('4.5')}
                borderRadius={wp('1.5')}
                text="Update"
                bgColor={colors.appColor}
                textColor={colors.white}
                textSize={hp('1.75')}
              />
            </View>

            <ImagePickerCrop
              modalVisible={frontModalValue}
              onPressModal={onPressFrontIdCardModal}
              onPressPhotos={onPressFrontPhotoLibrary}
              onPressCamera={onPressFrontCamera}
            />

            <ImagePickerCrop
              modalVisible={backModalValue}
              onPressModal={onPressBackIdCardModal}
              onPressPhotos={onPressBackPhotoLibrary}
              onPressCamera={onPressBackCamera}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainText: {
    fontSize: hp('1.85'),
    fontFamily: fontFamily.regular,
    color: colors.grey,
    textAlign: 'auto',
  },
  tapEditText: {
    fontSize: hp('1.25'),
    fontFamily: fontFamily.regular,
    color: colors.grey,
  },
  textStyle: {
    fontSize: hp('1.85'),
    fontFamily: fontFamily.semiBold,
    color: colors.lightBlack,
  },
  idCardView: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputCustomStyle: {
    marginTop: wp('1.5'),
    fontSize: hp('1.75'),
    fontFamily: fontFamily.regular,
    height: hp('5'),
    borderRadius: wp('2'),
    borderColor: colors.grey,
    borderWidth: wp('0.15'),
    paddingHorizontal: wp('3'),
  },
  imageStyle: {
    height: hp('8'),
    width: wp('20'),
  },
  instructionsText: {
    fontSize: hp('1.85'),
    fontFamily: fontFamily.regular,
    color: colors.grey,
    textAlign: 'auto',
  },
  textView: {
    justifyContent: 'center',
    marginHorizontal: wp('20'),
    marginBottom: hp('3'),
  },
});
export default UpdateCNICModal;
