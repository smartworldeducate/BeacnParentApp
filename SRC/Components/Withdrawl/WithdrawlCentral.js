import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';

const WithdrawlCentral = ({backgroundColor, text1, text1Color, text2}) => {
  return (
    <View style={{}}>
      <View
        style={{
          height: hp('6'),
          width: wp('12'),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: backgroundColor,
          borderRadius: wp('1.5'),
        }}>
        <Text
          style={{
            color: text1Color,
            fontFamily: fontFamily.regular,
            fontSize: hp('1.5'),
          }}>
          {text1}
        </Text>
      </View>
      <View style={styles.text2ViewStyle}>
        <Text style={styles.text2Stle}>{text2}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // text1style: {
  //     color: colors.white,
  //     fontFamily: fontFamily.regular,
  //     fontSize: hp('1.5')
  // },
  text2ViewStyle: {
    marginVertical: hp('1.5'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text2Stle: {
    color: colors.appDarkColor,
    fontFamily: fontFamily.semiBold,
    fontSize: hp('1.85'),
  },
});
export default WithdrawlCentral;
