import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';
import NotificationHeader from '../Header/NotificationHeader';
import TextInputCustom from '../TextInput/TextInput';
import Button from '../Button/Button';


const UpdateAddressModal = ({ modalVisible, onPressModal, modalUpperFlex, modalLowerFlex, headerTitle, onPressRightImg, inputAddress, onChangeAddress }) => {

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
                            <Text style={{ fontSize: hp('1.85'), fontFamily: fontFamily.regular, color: colors.grey, textAlign: "auto" }}>Our Record indicates that your correspondence addresss registerd with us is as follows.</Text>
                        </View>

                        <View style={{ marginTop: hp('1.5') }}>

                            <TextInputCustom
                                value={inputAddress}
                                onChangeText={onChangeAddress}
                                maxLength={200}
                                placeholder={"Enter your correspondence address"}
                                multiline={true}
                                placeholderColor={colors.grey}
                                textColor={colors.appColor}
                                returnKeyType={"go"}
                                numberOfLines={10}

                                style={styles.textInputCustomStyle}
                            />

                            <Text style={{ fontSize: hp('1.25'), fontFamily: fontFamily.regular, color: colors.grey }}>Tap to edit</Text>
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
        marginTop: wp('1.5'),
        fontSize: hp('1.75'),
        fontFamily: fontFamily.regular,
        height: hp('15'),
        borderRadius: wp('2'),
        borderColor: colors.grey,
        borderWidth: wp('0.15'),
        paddingHorizontal: wp('3')
    },

    textView: {
        justifyContent: 'center',
        marginHorizontal: wp('20'),
        marginVertical: hp('3')
    },
});
export default UpdateAddressModal;