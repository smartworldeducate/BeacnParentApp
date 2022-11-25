import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';

const ParentProfileHeader = ({leftImg, text1, text2}) => {
  const navigation = useNavigation();

  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
  };

  return (
    <View style={{flexDirection: 'row', paddingVertical: hp('0.5')}}>
      <View style={{flex: 0.1, justifyContent: 'center'}}>
        <Image
          source={{uri: leftImg}}
          style={styles.leftImageStyle}
          resizeMode={'contain'}
        />
      </View>
      <View style={{flex: 0.7, justifyContent: 'center'}}>
        <Text style={styles.textStyle}>{text1}</Text>
      </View>
      <View
        style={{
          flex: 0.2,
          justifyContent: 'center',
          alignItems: 'center',
          //   backgroundColor: 'red',
        }}>
        <Text style={styles.textStyle}>{text2}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  leftImageStyle: {
    height: hp('3'),
    width: wp('6'),
  },
  textStyle: {
    fontSize: hp('1.7'),
    fontFamily: fontFamily.semiBold,
    color: colors.appColor,
  },
});
export default ParentProfileHeader;
