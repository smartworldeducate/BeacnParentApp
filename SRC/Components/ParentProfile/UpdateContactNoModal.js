import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';
import NotificationHeader from '../Header/NotificationHeader';
import TextInputCustom from '../TextInput/TextInput';
import Button from '../Button/Button';


const UpdateContactNoModal = ({ modalVisible, onPressModal, modalUpperFlex, modalLowerFlex, headerTitle, onPressRightImg, inputContact, onChangeContact, text1 }) => {


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={null}
        >


            <TouchableOpacity
                onPress={onPressModal}
                style={{ flex: modalUpperFlex }}>

            </TouchableOpacity>

            <View style={{ flex: modalLowerFlex, backgroundColor: colors.white }}>
                <NotificationHeader
                    text={headerTitle}
                    rightImg={"crosscircle"}
                    onPressRightImg={onPressRightImg}
                />

                <ScrollView>
                    <View style={{ marginHorizontal: wp('6') }}>

                        <View style={{ marginTop: hp('2') }}>
                            <Text style={{ fontSize: hp('1.85'), fontFamily: fontFamily.semiBold, color: colors.lightBlack }}>{text1}</Text>

                            <TextInputCustom
                                value={inputContact}
                                onChangeText={onChangeContact}
                                keyboardType={"numeric"}
                                maxLength={12}
                                placeholder={"Enter Mobile Number"}
                                placeholderColor={colors.grey}
                                textColor={colors.appColor}
                                returnKeyType={"go"}

                                style={styles.textInputCustomStyle}
                            />

                            <Text style={{ fontSize: hp('1.25'), fontFamily: fontFamily.regular, color: colors.grey }}>Tap to edit</Text>
                        </View>

                        <View style={{ marginVertical: hp('2') }}>
                            <Text style={{ fontSize: hp('1.85'), fontFamily: fontFamily.regular, color: colors.grey, textAlign: "auto" }}>We will send you a code to verify your number</Text>
                        </View>

                        <View style={styles.textView}>
                            <Button
                                height={hp('4.5')}
                                borderRadius={wp('1.5')}
                                text="Update"
                                bgColor={colors.appColor}
                                textColor={colors.white}
                                textSize={hp('1.75')}
                            />
                        </View>

                    </View>

                </ScrollView>
            </View>

        </Modal>

    );
}

const styles = StyleSheet.create({
    textInputCustomStyle: {
        marginTop: wp('2'),
        fontSize: hp('1.75'),
        fontFamily: fontFamily.regular,
        height: hp('5'),
        borderRadius: wp('2'),
        borderColor: colors.grey,
        borderWidth: wp('0.15'),
        paddingHorizontal: wp('3')
    },
    textView: {
        justifyContent: 'center',
        marginHorizontal: wp('20'),
        marginBottom: hp('3')
    },
});
export default UpdateContactNoModal;