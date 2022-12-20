import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  RefreshControl,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import FlatListItem from '../Components/FlatList/FlatList';

import colors from '../Styles/colors';
import MainHeader from '../Components/Header/MainHeader';
import fontFamily from '../Styles/fontFamily';
import LineSeprator from '../Components/LineSeprator/LineSeprator';
import Button from '../Components/Button/Button';
import AssessmentReportModal from '../Components/Modal/AssessmentReportModal';
import ViewReportModal from '../Components/Modal/ViewReportModal';
import {getAssessment} from '../Redux/Features/Assessments/assessment';
import {useDispatch, useSelector} from 'react-redux';
import {logProfileData} from 'react-native-calendars/src/Profiler';
import Loader from '../Components/Loader/Loader';

const Assessment = () => {
  const dispatch = useDispatch();
  const assessmentHere = useSelector(state => state.assessment);

  const childDatahere = useSelector(state => state.children);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);

  const [dateFrom, setDateFrom] = useState();
  // const [dateTo, setDateTo] = useState();
  const [stdSection, setStdSection] = useState();
  const [campus, setCampus] = useState();

  const [headRemarksDetails, setHeadRemarksDetails] = useState();
  const [classRemarksDetails, setClassRemarksDetails] = useState();
  const [achievements, setAchievements] = useState();
  const [selfAssessment, setSelfAssessment] = useState();

  const [subName, setSubName] = useState();
  const [obtainMarks, setObtainMarks] = useState();
  const [totalMarks, setTotalMarks] = useState();
  const [subRemaks, setSubRemarks] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);

  const [className, setClassName] = useState();
  const [attendencePercentage, setAttendencePercentage] = useState();
  const [inititalData, setInitialData] = useState(
    assessmentHere?.posts?.result?.gradebook?.class_info,
  );

  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
  };

  // console.log("assessmentHere", assessmentHere);

  useEffect(() => {
    dispatch(
      getAssessment(childDatahere?.posts?.result?.children[0]?.system_id),
    );
    // setPayablesChallans(feeChallanHere);
    // if (feeChallanHere) {
    //     setPaidChallans(feeChallanHere);
    //     setPayablesChallans(feeChallanHere)
    // }
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // initialCall();
    // console.log('add', 2 + 2);
    setRefreshing(false);
    // console.log("calling again", initialCall());
  };

  const onPressModal = () => {
    setModalVisible(!modalVisible);
  };

  const onPressViewReport = ({item}) => {
    // console.log('itemModal', item);
    setDateFrom(item?.acad_year_title);
    // setDateTo(assessmentHere.posts?.result?.gradebook.class_info[0].acad_year_title);
    setStdSection(item?.section_name);
    setCampus(item?.branch_name);
    setHeadRemarksDetails(item?.school_head_remarks);
    setClassRemarksDetails(item?.class_teacher_remarks);

    setAchievements(item?.achievements);
    setSelfAssessment(item?.self_assessment);
    setClassName(item?.class_name);
    setAttendencePercentage(`${item?.attendance}/${item?.days_out_of}`);
    onPressModal();
  };

  const renderSubjectsItem = ({item, index}) => {
    return (
      <FlatListItem
        data={item?.subjects}
        renderItem={renderMarksTable}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const renderMarksTable = ({item, index}) => {
    // console.log('itemMarks', item);
    return (
      <View style={styles.tableMainView}>
        <View style={styles.subViews}>
          <Text style={styles.tableText}>{item?.subject_name} </Text>
        </View>
        <View style={styles.marksViews}>
          <Text
            style={
              styles.tableText
            }>{`${item?.obtained_marks}/ ${item?.total_marks}`}</Text>
        </View>
        <TouchableOpacity
          onPress={() => onPressView({item})}
          style={{
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.tableText}>
            <Text style={{fontFamily: fontFamily.semiBold}}>View</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const onPressSelected = ({item, index}) => {
    let ourGettingValue = [
      ...JSON.parse(
        JSON.stringify(assessmentHere?.posts?.result?.gradebook?.class_info),
      ),
    ];
    for (let i = 0; i < ourGettingValue.length; i++) {
      if (index === i) {
        ourGettingValue[i].checked = !ourGettingValue[i].checked;
        setInitialData(ourGettingValue);
      } else {
        ourGettingValue[i].checked = false;
      }
      // const element = ourGettingValue[i];
      // console.log("element", element);
      setInitialData(ourGettingValue);
    }

    // ourGettingValue.checked = true;
    // console.log("ourGettingValue", ourGettingValue);
  };

  const onPressViewModal = () => {
    setViewModalVisible(!viewModalVisible);
    // console.log('adder1', 2 + 2);
  };

  const onPressView = ({item, index}) => {
    setViewModalVisible(!viewModalVisible);
    setSubName(
      `${item.subject_name}(${item.obtained_marks}/${item.total_marks})`,
    );
    setSubRemarks(item.remarks);
  };

  const renderItem = ({item, index}) => {
    // console.log('itemLength', item);
    return (
      <View>
        <View style={styles.renderMainView}>
          <View View style={styles.mainInnerView}>
            <View style={styles.innerHeaderView}>
              <View
                style={{
                  flex: 0.85,
                  justifyContent: 'center',
                  // backgroundColor: 'green',
                }}>
                <Text style={styles.datesText}>
                  {`${item?.class_name} ${item?.acad_year_title}`}
                </Text>
                {item.terms.length === 0 && (
                  <Text>{'No assessment uploaded yet'}</Text>
                )}
              </View>
              <TouchableOpacity
                onPress={() => onPressSelected({item, index})}
                style={{
                  flex: 0.15,
                  justifyContent: 'center',
                  // backgroundColor: 'red',
                }}>
                <Image
                  source={{uri: 'arrowdown'}}
                  style={{height: hp('2'), width: wp('4')}}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
          </View>
          {item.terms.length > 0 && (
            <LineSeprator style={styles.lineSeprator} />
          )}

          <View style={styles.bottomRowView}>
            <View style={{}}>
              <FlatListItem
                data={item?.terms}
                renderItem={renderItemAssessmentReports}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>

            <AssessmentReportModal
              modalVisible={modalVisible}
              onPressModal={onPressModal}
              reportQuatar={'Mid Year Report'}
              assessmentYear={`${dateFrom}`}
              stdClass={` ${className} - ${stdSection}`}
              campus={campus}
              termAttendence={`Term Attendance ${attendencePercentage}`}
              text1={headRemarksDetails}
              text2={classRemarksDetails}
              text3={achievements}
              text4={selfAssessment}
              stdSubjectsResults={item?.terms}
              renderSubjectsItem={renderSubjectsItem}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderItemAssessmentReports = ({item, index}) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: wp('2'),
              paddingVertical: hp('1'),
            }}>
            <View style={{flex: 0.5}}>
              <Text
                style={
                  styles.sectionText
                }>{`${`Section: ${item?.section_name}`}`}</Text>
              <Text style={styles.campusText}>{item?.branch_name}</Text>
            </View>
            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Button
                onPress={() => onPressViewReport({item})}
                height={hp('3.5')}
                width={wp('25')}
                borderRadius={wp('1')}
                text="View Report"
                bgColor={colors.appColor}
                textColor={colors.white}
                textSize={hp('1.5')}
              />
            </View>
          </View>
        </View>
        <LineSeprator style={styles.lineSeprator} />
      </>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === 'android' ? colors.white : colors.white,
      }}>
      <StatusBar barStyle={'default'} backgroundColor={'#606060'} />
      {assessmentHere?.isLoading && <Loader></Loader>}
      {childDatahere?.posts?.result?.children.length > 0 && (
        <MainHeader
          onPressRightImg={() => navigation.goBack()}
          topLeftImg={'backarrow'}
          text={'Assessment'}
          data={childDatahere?.posts?.result?.children}
        />
      )}

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.white,
          marginVertical: hp(2),
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            // we can implement multiple colors in the form of array
            colors={[colors.fbColor, colors.paratGreen, colors.red]}
            // background color of the refresh indicator
            progressBackgroundColor={colors.silverGrey}
            tintColor={colors.appColor}

            // title={"loading"}
            // titleColor={colors.white}

            // size between 0 to 1
            // size={"large"}
          />
        }>
        <View style={{marginHorizontal: wp('8'), marginVertical: hp('2')}}>
          <FlatListItem
            data={assessmentHere?.posts?.result?.gradebook?.class_info}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        {viewModalVisible && (
          <ViewReportModal
            modalVisible={viewModalVisible}
            onPressModal={onPressViewModal}
            modalUpperFlex={0.3}
            modalCentralFlex={0.4}
            modalLowerFlex={0.3}
            text1={subName}
            text2={subRemaks}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: hp('2'),
    width: wp('4'),
  },
  renderMainView: {
    flexDirection: 'column',
    borderColor: colors.appColor,
    borderWidth: wp('0.15'),
    borderRadius: wp('4'),
    marginVertical: hp('1'),
    paddingVertical: hp('1.5'),
  },
  mainInnerView: {
    flexDirection: 'row',
    marginHorizontal: wp('2'),
  },
  innerHeaderView: {
    flex: 0.85,
    justifyContent: 'center',
    flexDirection: 'row',
  },

  datesText: {
    fontFamily: fontFamily.semiBold,
    color: colors.appColor,
    fontSize: hp('1.65'),
  },

  imageView: {
    flex: 0.15,
    alignItems: 'center',
  },
  bottomRowView: {
    flexDirection: 'row',
  },
  sectionText: {
    fontFamily: fontFamily.semiBold,
    color: colors.lightBlack,
    fontSize: hp('1.5'),
    lineHeight: hp('2.5'),
  },
  campusText: {
    fontFamily: fontFamily.regular,
    color: colors.lightBlack,
    fontSize: hp('1.5'),
    lineHeight: hp('2.5'),
  },

  lineSeprator: {
    height: hp('0.15'),
    backgroundColor: colors.appColor,
    marginHorizontal: wp('2'),
    marginVertical: hp('0.5'),
  },
  tableMainView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp('7'),
    borderColor: colors.appColor,
    borderWidth: wp('0.15'),
    justifyContent: 'center',
  },
  subViews: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: colors.appColor,
    borderRightWidth: wp('0.1'),
  },

  marksViews: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: colors.appColor,
    borderRightWidth: wp('0.1'),
  },

  tableText: {
    color: colors.appColor,
    fontFamily: fontFamily.regular,
    fontSize: hp('1.5'),
    lineHeight: hp('3.5'),
    paddingHorizontal: wp('1.5'),
  },
});
export default Assessment;
