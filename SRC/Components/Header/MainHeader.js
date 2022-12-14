import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';

import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';

import Swiper from 'react-native-swiper';
import ImagePickerCrop from '../ImagePicker/ImagePickerCrop';
import StudentInstructionModal from '../ImagePicker/StudentInstructionModal';
import {useDispatch, useSelector} from 'react-redux';
import {getChallan} from '../../Redux/Features/getChallans/challans';
import Loader from '../Loader/Loader';
import {getAssessment} from '../../Redux/Features/Assessments/assessment';
import {calanderAction} from '../../Redux/Features/CalanderKit/CalanderKit';
import {getNotifications} from '../../Redux/Features/NotificationsKit/NotificationsKit';
import {imageUpload} from '../../Redux/Features/ImageUploadKit/ImageUploadKit';

const MainHeader = ({
  onPressRightImg,
  topLeftImg,
  text,
  stuName,
  stuNumber,
  campName,
  className,
  stuImage,
  stuStatus,
  isLoading,
  data,
}) => {
  const dispatch = useDispatch();
  const feeChallan = useSelector(state => state.feeChallan);
  const notificationsHere = useSelector(state => state.notifications);
  const imageUploadHere = useSelector(state => state.imageUpload);
  const childDatahere = useSelector(state => state.children);
  const mobile = useSelector(state => state.OTPCodeStore);

  // console.log('imageUploadHere', imageUploadHere);

  const [defaultImg, setDefaultImg] = useState('student');
  const [imgBase64, setImgBase64] = useState();
  const [modalValue, setModalValue] = useState(false);
  const [instructionModal, setInstructionModal] = useState(false);
  const [number, setNumber] = useState('03334788728');
  const [systemId, setSystemId] = useState(
    childDatahere?.posts?.result?.children[0]?.system_id,
  );

  const [values, setValues] = useState({
    sms_number: '03334788728',
    system_id: childDatahere?.posts?.result?.children[0]?.system_id,
    // system_id: 146660,
    picture: imgBase64,
  });

  // console.log("imgBase64", imgBase64);
  // console.log("imgBase64Type", typeof imgBase64);

  const navigation = useNavigation();

  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
  };

  const onPressPhotoLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      // console.log('fromLibrary', image.data);
      setImgBase64(image.data);
      // setDefaultImg(image.path);
      setModalValue(!modalValue);
      // dispatch(imageUpload(values));
      dispatch(
        imageUpload({
          sms_number: number,
          system_id: systemId,
          picture: image.data,
        }),
      );
    });
  };

  const onPressCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      // console.log('fromCamera', image.data);
      setImgBase64(image.data);
      // setDefaultImg(image.path);
      // dispatch(imageUpload(values));
      dispatch(
        imageUpload({
          sms_number: number,
          system_id: systemId,
          picture: image.data,
        }),
      );

      // console.log('checkType', typeof image.data);
      // console.log('imageBase64', image.data);
      setModalValue(!modalValue);
    });
    // dispatch(imageUpload(data[index]?.system_id))
  };

  // const onPressProceed = () => {
  //     setModalValue(!modalValue);
  // }

  const onPressCameraImg = () => {
    setInstructionModal(!instructionModal);
  };

  const onPressClose = () => {
    setInstructionModal(false);
  };

  const onPressProceed = () => {
    setInstructionModal(false);
    setModalValue(true);
  };

  const onPressModal = () => {
    setModalValue(false);
  };

  // useEffect(() => {
  //   console.log("console");
  // }, [defaultImg])

  return (
    <View>
      <View style={styles.mainView}>
        <LinearGradient
          colors={['#296cb1', '#2760a7', '#203d88']}
          style={styles.linearGradient}>
          <View style={styles.leftView}>
            <TouchableOpacity
              onPress={onPressRightImg}
              style={styles.leftTouchable}>
              <Image
                source={{uri: topLeftImg}}
                style={styles.imageStyle}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <View style={styles.rightView}>
              <Text style={styles.textStyle}>{text}</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.infoMainView}>
        <Swiper
          loop={false}
          index={0}
          style={styles.wrapper}
          paginationStyle={{bottom: -19}}
          containerStyle={{borderRadius: wp('4')}}
          showsButtons={false}
          showsPagination={true}
          onIndexChanged={index => {
            dispatch(getChallan(data[index]?.system_id));
            dispatch(getAssessment(data[index]?.system_id));
            dispatch(calanderAction(data[index]?.system_id));
            dispatch(getNotifications(data[index]?.system_id));
          }}>
          {data?.length > 0 &&
            data?.map(item => {
              // console.log("itemImg", item?.picture);
              // setDefaultImg(item?.picture)

              return (
                <View style={styles.slide1}>
                  {/* {console.log(item?.std_name, 'name')} */}

                  <View
                    style={{
                      flex: 0.6,
                      justifyContent: 'center',
                      marginVertical: hp('1'),
                      paddingLeft: wp('3'),
                    }}>
                    <View>
                      {/* <Text style={styles.titleMain}>{stuName}</Text> */}

                      <Text style={styles.titleMain}>{item?.std_name}</Text>
                    </View>
                    <View style={styles.sepratorView}></View>

                    <View>
                      {/* <Text style={styles.textDetails}>{stuNumber}</Text>
        <Text style={styles.textDetails}>{campName}</Text>
        <Text style={styles.textDetails}>{className}</Text> */}

                      <Text style={styles.textDetails}>{item.system_id}</Text>
                      <Text style={styles.textDetails}>
                        {item.branch_info.br_name}
                      </Text>
                      <Text
                        style={
                          styles.textDetails
                        }>{`${item.class_name}-${item.section_name}`}</Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 0.35,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <View style={{flexDirection: 'column'}}>
                      <TouchableOpacity
                        onPress={onPressCameraImg}
                        style={styles.imageView}>
                        <Image
                          source={{uri: item.picture}}
                          style={styles.mainImageStyle}
                          resizeMode={'cover'}
                        />
                      </TouchableOpacity>
                      <View style={styles.textView}>
                        <View
                          style={{
                            flex: 0.3,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              height: hp('1.5'),
                              width: wp('3'),
                              backgroundColor: '#adff2f',
                              borderRadius: wp('3'),
                            }}></View>
                        </View>
                        <View style={{flex: 0.7, justifyContent: 'center'}}>
                          <Text style={styles.textStatus}>
                            {`${item.std_status}`}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={{flex: 0.05}}>
                    <TouchableOpacity onPress={onPressCameraImg}>
                      <Image
                        source={{uri: 'camera'}}
                        style={{
                          height: hp('4'),
                          width: wp('8'),
                          zIndex: 1,
                          left: wp('-10'),
                          top: hp('1'),
                        }}
                        resizeMode={'contain'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
        </Swiper>
      </View>

      <StudentInstructionModal
        modalVisible={instructionModal}
        onPressModal={onPressCameraImg}
        onPressClose={onPressClose}
        onPressProceed={onPressProceed}
      />

      <ImagePickerCrop
        modalVisible={modalValue}
        onPressModal={onPressModal}
        onPressPhotos={onPressPhotoLibrary}
        onPressCamera={onPressCamera}
      />
      {feeChallan?.isLoading && <Loader></Loader>}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: hp('18'),
  },
  linearGradient: {
    flex: 1,
  },
  leftView: {
    flexDirection: 'row',
    paddingTop: hp('2.5'),
  },
  leftTouchable: {
    flex: 0.2,
    alignItems: 'center',
  },
  imageStyle: {
    height: hp('3'),
    width: wp('6'),
  },
  rightView: {
    flex: 0.8,
  },
  textStyle: {
    fontSize: hp('1.85'),
    fontFamily: fontFamily.regularAlatsi,
    color: colors.white,
  },
  infoMainView: {
    marginTop: hp('-10'),
    height: hp('16'),
    flexDirection: 'row',
    marginHorizontal: wp('6'),
    borderColor: colors.white,
    borderWidth: wp('0.15'),
    backgroundColor: colors.white,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    borderRadius: wp('4'),
  },
  infoDetailsView: {
    flex: 0.65,
    flexDirection: 'column',
    padding: hp('2'),
  },
  titleMain: {
    fontSize: hp('2'),
    fontFamily: fontFamily.regular,
    color: '#296cb1',
  },
  titleText: {
    color: colors.fbColor,
    fontSize: hp('1.8'),
    fontFamily: fontFamily.regular,
  },
  sepratorView: {
    height: hp('0.25'),
    width: wp('15'),
    backgroundColor: colors.lightOrange,
    marginVertical: hp('1'),
  },
  textDetails: {
    color: colors.grey,
    fontSize: hp('1.5'),
    fontFamily: fontFamily.regularAlatsi,
    lineHeight: hp('2'),
  },
  imageMainView: {
    flex: 0.35,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    height: hp('10'),
    width: hp('10'),
    marginVertical: hp('1'),
  },
  mainImageStyle: {
    height: hp('10'),
    width: hp('10'),
    borderRadius: wp('3'),

    borderColor: colors.lightOrange,
    borderWidth: wp('0.75'),
  },
  statusSymbol: {
    fontSize: hp('1'),
  },
  textView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textStatus: {
    color: colors.grey,
    fontSize: hp('1.2'),
    fontFamily: fontFamily.regular,
    alignItems: 'center',
  },

  wrapper: {
    borderRadius: wp('4'),
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: wp('4'),
    flexDirection: 'row',
    overflow: 'hidden',
  },
});
export default MainHeader;
