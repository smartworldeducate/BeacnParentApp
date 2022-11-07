import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';


const BottomTab = ({ state, descriptors, navigation }) => {

    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                // console.log("route", route, index);

                return (

                    <View key={index} style={styles.innerMainView}>
                        {
                            index === 0 ?
                                <TouchableOpacity onPress={onPress} style={styles.touchableIcon}>
                                    <Image
                                        source={{
                                            uri: isFocused ? "notificationblue" : "notificationblue",
                                        }}
                                        style={styles.imgStyle}
                                        resizeMode={"contain"}
                                    />
                                    <Text style={styles.textStyle}>Notifications</Text>
                                </TouchableOpacity>
                                :
                                index === 1 ?
                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                        <TouchableOpacity onPress={onPress} style={styles.centralIcon}>
                                            <Image
                                                source={{ uri: isFocused ? "studentblue" : "studentblue" }}
                                                style={styles.centralImgStyle}
                                                resizeMode={"contain"}
                                            />

                                        </TouchableOpacity>
                                        <View style={{}}>
                                            <Text style={styles.textStyle}>Student Profile</Text>
                                        </View>
                                    </View>

                                    :
                                    index === 2 ?
                                        <TouchableOpacity onPress={onPress} style={styles.touchableIcon}>
                                            <Image
                                                source={{ uri: isFocused ? "contactblue" : "contactblue" }}
                                                style={styles.imgStyle}
                                                resizeMode={"contain"}
                                            />
                                            <Text style={styles.textStyle}>Contact Us</Text>
                                        </TouchableOpacity>

                                        : null
                        }

                    </View>
                );
            })}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: Platform.OS === "android" ? hp("9") : hp("10"),
        justifyContent: "center",
        // elevation: 2,
        flexDirection: "row",
        backgroundColor: colors.white,
        borderTopColor: colors.appColor,
        borderTopWidth: wp('0.15'),
        paddingBottom: hp('2'),
    },
    innerMainView: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    touchableIcon: {
        justifyContent: "center",
        alignItems: "center",
    },
    imgStyle: {
        height: hp('4'), width: wp('8')
    },
    centralIcon: {
        alignItems: "center",
        marginTop: hp('-4')
    },
    centralImgStyle: {
        height: hp('8'),
        width: wp('16')
    },
    textStyle: {
        alignItems: "center",
        fontSize: hp('1.65'),
        fontFamily: fontFamily.bold,
        color: colors.grey,
        fontWeight: "bold",
        paddingHorizontal: wp('2')
    }
});

export default BottomTab;