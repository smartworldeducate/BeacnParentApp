import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';
import fontFamily from '../../Styles/fontFamily';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Styles/colors';

const SingleLine = ({text1, text2}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={{}}>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          fontFamily: fontFamily.regular,
          fontSize: hp('2'),
          color: colors.grey,
        }}>
        {text1}
      </Text>
      {/* <RenderHtml contentWidth={width} source={{ html: text2 }} /> */}
    </View>
  );
};
const styles = StyleSheet.create({});
export default SingleLine;
