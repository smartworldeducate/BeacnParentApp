import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

import colors from '../../Styles/colors';
import fontFamily from "../../Styles/fontFamily"

const LeftImgTextHeader = ({ onPressLeftImg, leftImg, text }) => {

    return (
        <View style={styles.mainView}>
            <LinearGradient
                colors={['#296cb1', '#2760a7', '#203d88']}
                style={styles.linearGradient}>
                <View style={styles.mainInnerView}>

                    <TouchableOpacity onPress={onPressLeftImg} style={styles.leftImgToucable}>
                        <Image
                            source={{ uri: leftImg }}
                            style={styles.leftImgStyle}
                            resizeMode={"contain"}
                        />
                    </TouchableOpacity>
                    <View style={styles.centralView}>
                        <Text style={styles.centralText}>{text}</Text>
                    </View>

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
        flex: 1
    },
    mainInnerView: {
        flex: 1,
        flexDirection: "row",
    },
    leftImgToucable: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftImgStyle: {
        height: hp('2'),
        width: wp('4')
    },
    centralView: {
        flex: 0.8,
        justifyContent: 'center'
    },
    centralText: {
        fontFamily: fontFamily.helveticaBold,
        fontSize: hp('1.7'),
        color: colors.white
    }
});
export default LeftImgTextHeader;