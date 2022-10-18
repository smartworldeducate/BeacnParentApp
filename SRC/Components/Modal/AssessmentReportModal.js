import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar, Modal } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import colors from '../../Styles/colors';
import fontFamily from "../../Styles/fontFamily";
import FlatListItem from '../FlatList/FlatList';
import MainHeader from '../Header/MainHeader';

const AssessmentReportModal = ({ modalVisible, onPressModal, reportQuatar, assessmentYear, stdClass, campus, termAttendence, stdSubjectsResults, renderSubjectsItem, text1, text2, text3, text4 }) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={null}
        >
            <SafeAreaView style={{ flex: 1, backgroundColor: "#606060" }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.white }}>
                    <StatusBar barStyle={'light-content'} backgroundColor={"#606060"} />
                    <View style={{ flex: 1 }}>

                        <MainHeader
                            onPressRightImg={onPressModal}
                            topLeftImg={"backarrow"}
                            text={reportQuatar}
                            stuName={"Azaan Ali"}
                            stuNumber={"170838"}
                            campName={"Canal side Campus"}
                            className={"Class 3 - Red"}
                            stuImage={"student"}
                            stuStatus={"On-Roll"}
                        />

                        <View style={styles.detailsView}>
                            <Text style={styles.assessmentYearText}>{assessmentYear}</Text>
                            <Text style={styles.detailsText}>{stdClass}</Text>
                            <Text style={styles.detailsText}>{campus}</Text>
                            <Text style={styles.detailsText}>{termAttendence}</Text>

                        </View>

                        <View style={{ flexDirection: 'column' }}>

                            <View style={styles.tableMainView}>
                                <View style={{ flex: 0.35, alignItems: 'center' }}>
                                    <Text style={styles.tableHeader}>Subjects </Text>
                                </View>
                                <View style={{ flex: 0.35, alignItems: 'center' }}>
                                    <Text style={styles.tableHeader}>Marks</Text>
                                </View>
                                <View style={{ flex: 0.3, alignItems: 'center' }}>
                                    <Text style={styles.tableHeader}> Remarks</Text>
                                </View>
                            </View>

                            <View style={{}}>
                                <FlatListItem
                                    data={stdSubjectsResults}
                                    renderItem={renderSubjectsItem}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>

                        </View>

                        <View style={styles.remarksSection}>
                            <Text style={styles.remarksHeadsText}>School Head remarks</Text>
                            <Text style={styles.remarksDetailsText}>{text1}</Text>

                            <Text style={styles.remarksHeadsText}>Class Teacher remarks</Text>
                            <Text style={styles.remarksDetailsText}>{text2}</Text>

                            <Text style={styles.remarksHeadsText}>Achievements</Text>
                            <Text style={styles.remarksDetailsText}>{text3}</Text>

                            <Text style={styles.remarksHeadsText}>Self Assessment</Text>
                            <Text style={styles.remarksDetailsText}>{text4}</Text>
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </Modal>

    );
}

const styles = StyleSheet.create({
    detailsView: {
        marginHorizontal: wp('7'),
        marginVertical: hp('3'),
        borderRadius: hp('2'),
        borderColor: colors.appColor,
        borderWidth: wp('0.15'),
        paddingHorizontal: hp('2'),
        paddingVertical: hp('1')
    },
    assessmentYearText: {
        color: colors.appColor,
        fontSize: hp('1.65'),
        fontFamily: fontFamily.regularAlatsi,
        lineHeight: hp('3')
    },
    detailsText: {
        color: colors.lightBlack,
        fontSize: hp('1.65'),
        fontFamily: fontFamily.regular,
        lineHeight: hp('2.5')
    },
    tableMainView: {
        flexDirection: 'row',
        backgroundColor: colors.appColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: wp('7'),
        borderTopRightRadius: wp('2'),
        borderTopLeftRadius: wp('2'),
        borderColor: colors.appColor,
        borderWidth: wp('0.15'),
        justifyContent: "center",
        paddingVertical: hp('0.5')
    },
    tableHeader: {
        color: colors.white,
        fontFamily: fontFamily.semiBold,
        fontSize: hp('1.65')
    },
    remarksSection: {
        marginHorizontal: wp('7'),
        marginVertical: hp('3'),
        borderRadius: hp('2'),
        borderColor: colors.appColor,
        borderWidth: wp('0.15'),
        paddingHorizontal: hp('2'),
        paddingVertical: hp('1')
    },
    remarksHeadsText: {
        color: colors.appColor,
        fontSize: hp('1.6'),
        fontFamily: fontFamily.semiBold,
        lineHeight: hp('2.5')
    },
    remarksDetailsText: {
        color: colors.lightBlack,
        fontSize: hp('1.4'),
        fontFamily: fontFamily.regular,
        lineHeight: hp('2.5')
    }

});
export default AssessmentReportModal;