import React, {Component} from 'react';
import {Text, StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../Styles/colors';
import fontFamily from "../../Styles/fontFamily";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Button = ({ colorsArray, disabled, onPress, borderRadius, bgColor, borderColor, borderWidth, height, width,
    text, textColor, textSize, textMargin, textWeight
}) => {
    return (
        <View style={{}}>
            <LinearGradient
                // colors={['#296cb1', '#2760a7', '#203d88']}
                colors={colorsArray}
                // start={{ x: 0.1, y: 0.1 }} end={{ x: 0.1, y: 0.5 }}
                // locations={[0, 0.5, 0.6]}
                style={{ borderRadius: wp('1.75') }}>

                <TouchableOpacity
                    disabled={disabled}
                    onPress={onPress}
                    style={{ borderRadius: borderRadius, justifyContent: "center", alignItems: "center", height: height, width: width, backgroundColor: bgColor, flexDirection: "row", borderColor: borderColor, borderWidth: borderWidth }}>

                    <Text
                        style={{ color: textColor, fontSize: textSize, fontFamily: fontFamily.regular, margin: textMargin, fontWeight: textWeight }}>
                        {text}
                    </Text>

                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
  // linearGradient: {
  //     flex: 1
  // },
});
export default Button;