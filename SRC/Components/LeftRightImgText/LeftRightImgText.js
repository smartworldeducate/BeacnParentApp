import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import colors from '../../Styles/colors';
import fontFamily from "../../Styles/fontFamily";

const LeftRightImgText = ({ marginHorizontal, leftText, onPressRight, rightText, img }) => {

    return (
        <View style={{ flexDirection: 'row', marginHorizontal: marginHorizontal }}>
            <View style={styles.leftView}>
                <Text style={styles.leftText}>{leftText}</Text>
            </View>
            <TouchableOpacity
                onPress={onPressRight}
                style={styles.rightMainView}
            >
                <View style={styles.rightView}>
                    <Text style={styles.leftText}>{rightText}</Text>
                </View>
                <View style={styles.rightImageView}>
                    <Image
                        source={{ uri: img }}
                        style={styles.imageStyle}
                        resizeMode={"contain"}
                    />
                </View>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        marginHorizontal: wp('8')
    },
    leftView: {
        flex: 0.65,
        justifyContent: 'center',
    },
    leftText: {
        fontSize: hp('1.5'),
        fontFamily: fontFamily.regular,
        color: colors.appColor,
        fontWeight: "bold"
    },
    rightMainView: {
        flex: 0.35,
        flexDirection: 'row',
    },
    rightView: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: "flex-end",
    },
    rightImageView: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    imageStyle: {
        height: hp('1.5'),
        width: wp('2')
    },
});
export default LeftRightImgText;