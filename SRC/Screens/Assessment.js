import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, RefreshControl, StatusBar, StyleSheet, View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import FlatListItem from '../Components/FlatList/FlatList';


import colors from '../Styles/colors';
import MainHeader from '../Components/Header/MainHeader';
import fontFamily from '../Styles/fontFamily';
import LineSeprator from '../Components/LineSeprator/LineSeprator';
import Button from '../Components/Button/Button';
import AssessmentReportModal from '../Components/Modal/AssessmentReportModal';
import ViewReportModal from '../Components/Modal/ViewReportModal';
import { getAssessment } from '../Redux/Features/Assessments/assessment';
import { useDispatch, useSelector } from 'react-redux';
import { logProfileData } from 'react-native-calendars/src/Profiler';



const Assessment = () => {

    const dispatch = useDispatch();
    const assessmentHere = useSelector(state => state.assessment);
    const childDatahere = useSelector(state =>state.children)
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


    const handleNavigate = (routeName, clearStack, params) => {
        navigation.navigate(routeName, params);
        if (clearStack) {
            console.log("Clear")
        }
    }

    useEffect(() => {
        dispatch(getAssessment(childDatahere?.posts?.result?.children[0]?.system_id));
        // setPayablesChallans(feeChallanHere);
        // if (feeChallanHere) {
        //     setPaidChallans(feeChallanHere);
        //     setPayablesChallans(feeChallanHere)
        // }
    }, [])

    const [assessmentData, setAssessmentData] = useState([
        {
            id: 1, class: "Class 1", dateFrom: 'Aug, 19', dateTo: 'Jul, - 20', assessment: true,
            assessmentReport: {
                section: "Pink", campus: "Waltion Campus, Lahore",
                schoolHeadRemarks: "You've reached the end of another grading period, and what could be more daunting than the task of composing insightful, original, and unique comments about every child in your class? The following positive statements will help you tailor your comments to specific children and highlight their strengths",
                classTeacherRemarks: "Just about every teacher agrees: report card comments are important to provide insights and next steps to students and families. But there are few who actually look forward to writing them.",
                achievements: "Achieve and achievement often imply the completion of something important or difficult—a lofty goal or a great feat. Graduating high school is an achievement. Learning a new language is an achievement. An award is an achievement.",
                selfAssessment: "Self Assessment is a system HM Revenue and Customs (HMRC) uses to collect Income Tax."
            },


        },
        {
            id: 2, class: "Class 2", dateFrom: 'Aug, 20 ', dateTo: 'Jul, - 21', assessment: true,
            assessmentReport: {
                section: "Green", campus: "Waltion Campus, Lahore",
                schoolHeadRemarks: "Whether you are tweaking statements from this page or creating original ones, check out our Report Card Thesaurus [see bottom of the page] that contains a list of appropriate adjectives and adverbs. There you will find the right words to keep your comments fresh and accurate.",
                classTeacherRemarks: "Because every instructor knows working under tight deadlines to create upwards of 20 unique and detailed reports at the end of the year or term isn’t exactly straightforward (or particularly fun). That's especially true in the era of distance learning.",
                achievements: "Achievement can also refer to the act of achieving, as in We need to focus on the achievement of these goals. This sense of the word doesn’t always imply impressiveness by itself—it often means the same thing as completion.",
                selfAssessment: "Tax is usually deducted automatically from wages, pensions and savings. People and businesses with other income (including COVID-19 grants and support payments) must report it in a tax return."
            }
        },

        { id: 3, class: "Class 3", dateFrom: 'Aug, 21', dateTo: ' Jul, - 22', assessment: false },
    ]);


    const [stdSubjectsResults, setStdSubjectsResults] = useState([
        {
            id: 1, subName: 'English', obtainMarks: 23, totalMarks: 50,
            remarks: "Azaan has improved her participation throughout this year, and now participates with increased frequency and less support. {firstname} participates by locating facts and details, making inferences about texts, and asking relevant questions. Azaan has improved her participation throughout this year, and now participates with increased frequency and less support. {firstname} participates by locating facts and details, making inferences about texts, and asking relevant questions. Azaan has improved her participation throughout this year, and now participates with increased frequency and less support. {firstname} participates by locating facts and details, making inferences about texts, and asking relevant questions. Azaan has improved her participation throughout this year, and now participates with increased frequency and less support. {firstname} participates by locating facts and details, making inferences about texts, and asking relevant questions."
        },
        {
            id: 2, subName: 'General Science', obtainMarks: 26, totalMarks: 50,
            remarks: "Report cards provide parents and guardians with essential information regarding their child's progress in school. Besides a letter grade, parents are given a brief descriptive comment that elaborates the student's strengths or what the student needs to improve upon. Finding the exact words to describe a meaningful comment takes effort. Feedback also may vary by subject. What applies in math does not always apply in science."
        },
        {
            id: 3, subName: 'Islamiyat', obtainMarks: 46, totalMarks: 50,
            remarks: "Hanafi bin Masdi MasyaAllah, Adam got an A for Maths. He exhibits a positive outlook and attitude in the classroom. He is learning tooccupy his time constructively. When he is able to settle down, he does much betterwork. He needs to be more methodical in his approach to the Science subjects and Arabic. May Allah grant him happiness and success! Ameen ."
        },
        { id: 4, subName: 'Mathematics', obtainMarks: 17, totalMarks: 50, remarks: "Need highly improvements" },
        { id: 5, subName: 'Urdu', obtainMarks: 33, totalMarks: 50, remarks: "Not bad but still need some improvements" },
        { id: 6, subName: 'Music', obtainMarks: 46, totalMarks: 50, remarks: "Very good improvements" },
        { id: 7, subName: 'Visual Arts', obtainMarks: 17, totalMarks: 50, remarks: "Need highly improvements" },
    ])

    const onRefresh = () => {
        setRefreshing(true);
        // initialCall();
        console.log("add", 2 + 2);
        setRefreshing(false);
        // console.log("calling again", initialCall());
    }

    const onPressModal = () => {
        setModalVisible(!modalVisible)
    }

    const onPressViewReport = ({ item }) => {
        setDateFrom(assessmentHere.posts?.result?.gradebook?.class_info[0]?.acad_year_title);
        // setDateTo(assessmentHere.posts?.result?.gradebook.class_info[0].acad_year_title);
        setStdSection(assessmentHere?.posts?.result?.gradebook?.class_info[1]?.terms[0]?.section_name);
        setCampus(assessmentHere?.posts?.result?.gradebook?.class_info[1]?.terms[0]?.branch_name);
        setHeadRemarksDetails(assessmentHere.posts?.result?.gradebook?.class_info[1]?.terms[0]?.school_head_remarks);
        setClassRemarksDetails(assessmentHere.posts?.result?.gradebook?.class_info[1]?.terms[0]?.class_teacher_remarks);

        setAchievements(assessmentHere.posts?.result?.gradebook?.class_info[1]?.terms[0]?.achievements);
        setSelfAssessment(assessmentHere.posts?.result?.gradebook?.class_info[1]?.terms[0]?.self_assessment);
        onPressModal();
    }

    const renderSubjectsItem = ({ item, index }) => {
        return (
            <>
                <View style={styles.tableMainView}>
                    <View style={styles.subViews}>
                        <Text style={styles.tableText}>{item.subName} </Text>
                    </View>
                    <View style={styles.subViews}>
                        <Text style={styles.tableText}>{`${item.obtainMarks} / ${item.totalMarks}`}</Text>
                    </View>
                    <TouchableOpacity onPress={() => onPressView({ item })} style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.tableText}><Text style={{ fontFamily: fontFamily.semiBold }}>View</Text></Text>
                    </TouchableOpacity>
                </View>

                <ViewReportModal
                    modalVisible={viewModalVisible}
                    onPressModal={onPressViewModal}
                    modalUpperFlex={0.3}
                    modalCentralFlex={0.4}
                    modalLowerFlex={0.3}

                    text1={`${subName} (${obtainMarks}/${totalMarks})`}
                    text2={subRemaks}
                />
            </>

        );
    }

    const onPressViewModal = () => {
        setViewModalVisible(!viewModalVisible);
        console.log("adder1", 2 + 2);
    }

    const onPressView = ({ item, index }) => {
        console.log("viewModal", item);
        setSubName(item.subName);
        setObtainMarks(item.obtainMarks);
        setTotalMarks(item.totalMarks);
        setSubRemarks(item.remarks);
        onPressViewModal();
        // Alert.alert(`${item.subName} (${item.obtainMarks} / ${item.totalMarks}) \n`, `${item.remarks}`, [
        //     { text: 'OK', style: "default" }
        // ]);
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.renderMainView}>
                <View View style={styles.mainInnerView}>

                    <View style={styles.innerHeaderView}>
                        <Text style={styles.datesText}>{`${item.class} (${item.dateFrom} - ${item.dateTo})`}</Text>
                    </View>

                    {
                        item.assessment &&
                        <TouchableOpacity style={styles.imageView}>
                            <Image
                                source={{ uri: 'arrowdown' }}
                                style={styles.imageStyle}
                                resizeMode={"contain"}
                            />
                        </TouchableOpacity>
                    }

                </View>

                <LineSeprator style={styles.lineSeprator} />

                <View style={styles.bottomRowView}>

                    <View style={{ flex: item.assessment ? 0.65 : 1, justifyContent: 'center', paddingHorizontal: wp('1.5') }}>
                        <Text style={styles.sectionText}>{`${item.assessment ? `Section: ${assessmentHere?.posts?.result?.gradebook?.class_info[1]?.terms[0]?.section_name }` : "No Assessment has been uploaded yet."}`}</Text>
                        <Text style={styles.campusText}>{`${item.assessment ? assessmentHere?.posts?.result?.gradebook?.class_info[0]?.acad_year_title : ''}`}</Text>
                    </View>

                    {
                        item.assessment &&
                        <View style={{ flex: 0.35, justifyContent: 'center', alignItems: 'center' }}>
                            <Button
                                onPress={() => onPressViewReport({ item })}
                                height={hp('3.5')}
                                width={wp('25')}
                                borderRadius={wp('1')}
                                text="View Report"
                                bgColor={colors.appColor}
                                textColor={colors.white}
                                textSize={hp('1.5')}
                            />
                        </View>
                    }

                    <AssessmentReportModal
                        modalVisible={modalVisible}
                        onPressModal={onPressModal}
                        reportQuatar={"Mid Year Report"}
                        assessmentYear={`${dateFrom}`}
                        stdClass={stdSection}
                        campus={campus}
                        termAttendence={`Attendance = ${assessmentHere.posts?.result?.gradebook?.class_info[1]?.terms[0]?.attendance}/${assessmentHere.posts?.result?.gradebook?.class_info[1]?.terms[0]?.days_out_of}`}
                        text1={headRemarksDetails}
                        text2={classRemarksDetails}
                        text3={achievements}
                        text4={selfAssessment}

                        stdSubjectsResults={stdSubjectsResults}
                        renderSubjectsItem={renderSubjectsItem}
                    />



                </View>

            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Platform.OS === "android" ? colors.white : colors.white }}>
            <StatusBar barStyle={'default'} backgroundColor={"#606060"} />

            {childDatahere?.posts?.result?.children.length > 0 && (
        <MainHeader
          onPressRightImg={() => navigation.goBack()}
          topLeftImg={"backarrow"}
          text={'Assessment'}
          data={childDatahere?.posts?.result?.children}
        />
      )}

            <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.white, marginVertical: hp(2) }}
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
                }

            >


                <View style={{ marginHorizontal: wp('8'), marginVertical: hp('2') }}>
                    <FlatListItem
                        data={assessmentData}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        
                    />

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    imageStyle: {
        height: hp('2'),
        width: wp('4')
    },
    renderMainView: {
        flexDirection: 'column',
        borderColor: colors.appColor,
        borderWidth: wp('0.15'),
        borderRadius: wp('4'),
        marginVertical: hp('1'),
        paddingVertical: hp('1.5')
    },
    mainInnerView: {
        flexDirection: 'row',
        marginHorizontal: wp('2')
    },
    innerHeaderView: {
        flex: 0.85,
        justifyContent: 'center'
    },

    datesText: {
        fontFamily: fontFamily.semiBold,
        color: colors.appColor,
        fontSize: hp('1.65')
    },

    imageView: {
        flex: 0.15,
        alignItems: 'center'
    },
    bottomRowView: {
        flexDirection: 'row'
    },
    sectionText: {
        fontFamily: fontFamily.semiBold,
        color: colors.lightBlack,
        fontSize: hp('1.5'),
        lineHeight: hp('2.5')
    },
    campusText: {
        fontFamily: fontFamily.regular,
        color: colors.lightBlack,
        fontSize: hp('1.5'),
        lineHeight: hp('2.5')
    },

    lineSeprator: {
        height: hp('0.15'),
        backgroundColor: colors.appColor,
        marginHorizontal: wp('2'),
        marginVertical: hp('0.5')
    },
    tableMainView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: wp('7'),
        borderColor: colors.appColor,
        borderWidth: wp('0.15'),
        justifyContent: "center",

    },
    subViews: {
        flex: 0.35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: colors.appColor,
        borderRightWidth: wp('0.1')
    },
    tableText: {
        color: colors.appColor,
        fontFamily: fontFamily.regular,
        fontSize: hp('1.5'),
        lineHeight: hp('3.5')
    }
});
export default Assessment;