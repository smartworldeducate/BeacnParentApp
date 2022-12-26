import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Modal,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';
import FlatListItem from '../FlatList/FlatList';
import {useDispatch, useSelector} from 'react-redux';
import MainHeader from '../Header/MainHeader';
import {useNavigation} from '@react-navigation/native';
import RenderHTML from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';
import SingleLine from '../SingleLine/SingleLine';
import AssessmentReportHeader from '../Header/AssessmentReportHeader';

const AssessmentReportModal = ({
  modalVisible,
  onPressModal,
  reportQuatar,
  assessmentYear,
  stdClass,
  campus,
  termAttendence,
  stdSubjectsResults,
  renderSubjectsItem,
  text1,
  text2,
  text3,
  text4,
}) => {
  const childDatahere = useSelector(state => state.children);
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const regex = /(<([^>]+)>)/gi;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={null}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor:
            Platform.OS === 'android' ? colors.white : colors.white,
        }}>
        <StatusBar barStyle={'default'} backgroundColor={'#606060'} />

        {childDatahere?.posts?.result?.children.length > 0 && (
          <AssessmentReportHeader
            onPressRightImg={onPressModal}
            topLeftImg={'close'}
            text={'End of Year Report'}
            data={childDatahere?.posts?.result?.children}
          />
        )}

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: colors.white,
            marginVertical: hp(2),
          }}>
          <View style={{flex: 1}}>
            <View style={styles.detailsView}>
              <Text style={styles.assessmentYearText}>{assessmentYear}</Text>
              <Text style={styles.detailsText1}>{stdClass}</Text>
              <Text style={styles.detailsText}>{campus}</Text>
              <Text style={styles.detailsText}>{termAttendence}</Text>
            </View>

            <View style={{flexDirection: 'column'}}>
              <View style={styles.tableMainView}>
                <View style={{flex: 0.35, alignItems: 'center'}}>
                  <Text style={styles.tableHeader}>Subjects </Text>
                </View>
                <View style={{flex: 0.35, alignItems: 'center'}}>
                  <Text style={styles.tableHeader}>Marks</Text>
                </View>
                <View style={{flex: 0.3, alignItems: 'center'}}>
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
              <View style={styles.remarksDetailsText}>
                {<RenderHTML contentWidth={width} source={{html: text4}} />}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  detailsView: {
    marginHorizontal: wp('7'),
    marginVertical: hp('3'),
    borderRadius: hp('2'),
    borderColor: colors.appColor,
    borderWidth: wp('0.15'),
    paddingHorizontal: hp('2'),
    paddingVertical: hp('1'),
  },
  assessmentYearText: {
    color: colors.appColor,
    fontSize: hp('1.65'),
    fontFamily: fontFamily.regularAlatsi,
    lineHeight: hp('3'),
  },
  detailsText1: {
    color: colors.lightBlack,
    fontSize: hp('1.65'),
    fontFamily: fontFamily.regular,
    lineHeight: hp('2.5'),
    marginLeft: wp('-0.75'),
  },
  detailsText: {
    color: colors.lightBlack,
    fontSize: hp('1.65'),
    fontFamily: fontFamily.regular,
    lineHeight: hp('2.5'),
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
    justifyContent: 'center',
    paddingVertical: hp('0.5'),
  },
  tableHeader: {
    color: colors.white,
    fontFamily: fontFamily.semiBold,
    fontSize: hp('1.65'),
  },
  remarksSection: {
    marginHorizontal: wp('7'),
    marginVertical: hp('3'),
    borderRadius: hp('2'),
    borderColor: colors.appColor,
    borderWidth: wp('0.15'),
    paddingHorizontal: hp('2'),
    paddingVertical: hp('1'),
  },
  remarksHeadsText: {
    color: colors.appColor,
    fontSize: hp('1.6'),
    fontFamily: fontFamily.semiBold,
    lineHeight: hp('2.5'),
  },
  remarksDetailsText: {
    color: colors.lightBlack,
    fontSize: hp('1.4'),
    fontFamily: fontFamily.regular,
    lineHeight: hp('2.5'),
  },
  remarksDetailsText1: {
    color: colors.lightBlack,
    fontSize: hp('1'),
    fontFamily: fontFamily.regular,
    lineHeight: hp('1'),
  },
});

const tagsStyles = {
  body: {
    whiteSpace: 'normal',
    // color: 'red',
  },
  a: {
    color: 'green',
  },
};
export default AssessmentReportModal;
