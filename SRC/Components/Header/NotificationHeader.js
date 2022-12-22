import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

import colors from '../../Styles/colors';
import fontFamily from "../../Styles/fontFamily"

const NotificationHeader = ({ onPressRightImg, text, rightImg }) => {

    return (
        <View style={styles.mainView}>
            <LinearGradient
                colors={['#296cb1', '#2760a7', '#203d88']}
                style={styles.linearGradient}>
                <View style={styles.mainInnerView}>
                    <View style={styles.rightView}>
                        <Text style={styles.textStyle}>{text}</Text>
                    </View>
                    <TouchableOpacity onPress={onPressRightImg} style={styles.leftTouchable}>
                        <Image
                            source={{ uri: rightImg }}
                            style={styles.imageStyle}
                            resizeMode={"contain"}
                        />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>

    );
}

const styles = StyleSheet.create({
    mainView: {
        height: hp("7"),
        justifyContent: 'center',
    },
    linearGradient: {
        paddingVertical: hp('2')
    },
    rightView: {
        flex: 0.85,
        paddingLeft: wp('6'),
    },
    mainInnerView: {
        flexDirection: "row",
    },
    leftTouchable: {
        flex: 0.15,
        alignItems: "center",
        justifyContent: "center"
    },
    imageStyle: {
        height: hp('1.5'),
        width: wp("3")
    },

    textStyle: {
        fontSize: hp('1.85'),
        fontFamily: fontFamily.semiBold,
        color: colors.white,
        fontWeight: "bold"
    },
});
export default NotificationHeader;