import React, { useState } from 'react';
import { SafeAreaView, ScrollView, RefreshControl, StatusBar, StyleSheet, View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';


const DrawerList = ({onPress, leftImg, rightText }) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.mainTouchableOpacity}
        >
            <View style={styles.leftView}>
                <Image
                    source={{ uri: leftImg }}
                    style={styles.imageStyle}
                    resizeMode={"contain"}
                />
            </View>
            <View style={styles.rightTextView}>
                <Text style={styles.rightText}>{rightText}</Text>
            </View>


        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    mainTouchableOpacity: {
        flexDirection: 'row',
        paddingVertical: hp('2')
    },
    leftView: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center",
        alignItems: "center"
    },
    imageStyle: {
        height: hp('2.5'),
        width: wp('5')
    },
    rightTextView: {
        flex: 0.8,
        justifyContent: "center"
    },
    rightText: {
        fontSize: hp('2'),
        fontFamily: fontFamily.bold,
        color: colors.grey,
        fontWeight: "bold"
    }
});

export default DrawerList;