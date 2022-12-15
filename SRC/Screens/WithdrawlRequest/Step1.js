import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Button from '../../Components/Button/Button';
import LeftRightImgText from '../../Components/LeftRightImgText/LeftRightImgText';
import LineSeprator from '../../Components/LineSeprator/LineSeprator';
import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';

const Step1 = ({ step1Text, onPressStep1Btn }) => {
  const navigation = useNavigation();
  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
  };

  return (
    <View style={{}}>
      <LeftRightImgText
        leftText={'Parent Profile'}
        onPressRight={() => handleNavigate('ParentProfileDrawer')}
        rightText={'Edit'}
        img={'rightarrow'}
        marginHorizontal={wp('5')}
      />

      <LineSeprator style={styles.lineSeprator} />

      <Text style={styles.text1Style}>{step1Text}</Text>

      <View style={styles.btnView}>
        <Button
          onPress={onPressStep1Btn}
          height={hp('4.5')}
          borderRadius={wp('1.5')}
          text="Next"
          bgColor={colors.appColor}
          textColor={colors.white}
          textSize={hp('1.75')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lineSeprator: {
    height: hp('0.2'),
    backgroundColor: colors.appColor,
    marginTop: hp('1'),
    marginBottom: hp('2'),
    marginHorizontal: wp('5'),
  },
  text1Style: {
    fontSize: hp('1.75'),
    fontFamily: fontFamily.helvetica,
    lineHeight: hp('2'),
    color: colors.lightBlack,
    textAlign: 'justify',
    marginHorizontal: wp('5'),
    lineHeight: hp('2.75'),
  },
  btnView: {
    marginVertical: hp('3'),
    marginHorizontal: wp('5'),
  },
});
export default Step1;
