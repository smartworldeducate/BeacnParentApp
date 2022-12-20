import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import colors from '../../Styles/colors';
import fontFamily from "../../Styles/fontFamily";

const HomeCentralView = ({ onPress, img, text }) => {

    return (
        <View>
            <TouchableOpacity
                style={styles.imageView}
                onPress={onPress}
            >
                <Image
                    source={{ uri: img }}
                    style={styles.imageStyle}
                    resizeMode={"contain"}
                />
            </TouchableOpacity>

            <View style={{ marginBottom: hp('1') }}>
                <Text style={styles.textStyle}>{text}</Text>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    imageStyle: {
        height: hp('7'),
        width: wp('14')
    },
    imageView: {
        height: hp('10'),
        width: hp('10'),
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: wp('3'),
        borderColor: colors.grey,
        borderWidth: wp('0.2')
    },
    textStyle: {
        fontSize: hp('1.8'),
        fontFamily: fontFamily.helveticaBold,
        paddingVertical: hp('0.5'),
        color: colors.grey,
        textAlign: 'center'
    }
});
export default HomeCentralView;