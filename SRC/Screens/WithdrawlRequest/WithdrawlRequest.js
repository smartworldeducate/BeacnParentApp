import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
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
import { useNavigation } from '@react-navigation/native';
import colors from '../../Styles/colors';
import MainHeader from '../../Components/Header/MainHeader';
import WithdrawlCentral from '../../Components/Withdrawl/WithdrawlCentral';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { withdrawlRequestAction } from '../../Redux/Features/WithdrawlRequestKit/WithdrawlRequest';

import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader/Loader';

const WithdrawlRequest = () => {
  const dispatch = useDispatch();
  const childDatahere = useSelector(state => state.children);
  const withdrawalRequestHere = useSelector(
    state => state.withDrawlRequestStore,
  );
  console.log('withdrawalRequestHere', withdrawalRequestHere);

  const navigation = useNavigation();
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);

  const [applicantId, setApplicantId] = useState(null);
  const [propRelation, setPropRelation] = useState(null);
  const [propParentName, setPropParentName] = useState(null);
  const [propCNIC, setPropCNIC] = useState(null);
  const [propEmail, setPropEmail] = useState(null);
  const [propContact, setPropContact] = useState(null);
  const [propBenificiaryId, setPropBenificiaryId] = useState(null);
  const [propParentsListFromStep2, setPropParentsListFromStep2] =
    useState(null);

  const [wdrawReasonId, setwdrawReasonId] = useState(null);
  const [wdrawQuestion1Id, setWdrawQuestion1Id] = useState(null);
  const [wdrawQuestion2Id, setWdrawQuestion2Id] = useState(null);
  const [q1Remarks, setQ1Remarks] = useState(null);
  const [q2Remarks, setQ2Remarks] = useState(null);

  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
  };

  const gettingDataFromStep2 = data => {
    console.log('data', data);
  };

  const onPressStep1Btn = () => {
    setStep2(true);
    setStep1(false);
  };

  const onPressStep2Back = () => {
    setStep2(false);
    setStep1(true);
  };

  const onPressStep2Next = (
    applicant_relation_id,
    selectRelation,
    parentName,
    CNIC,
    email,
    contact,
    parentsList,
  ) => {
    // gettingDataFromStep2();
    setStep3(true);
    setStep1(false);
    setStep2(false);
    console.log('dataFromStep2', applicant_relation_id);
    setApplicantId(applicant_relation_id);
    setPropRelation(selectRelation);
    setPropParentName(parentName);
    setPropCNIC(CNIC);
    setPropEmail(email);
    setPropContact(contact);
    setPropBenificiaryId(applicant_relation_id);
    setPropParentsListFromStep2(parentsList);

    // console.log("parentsListInMainFromStep2", parentsList);
  };
  // console.log("propParentsListFromStep2", propParentsListFromStep2);

  // console.log("applicantId<<<", applicantId);

  const onPressStep3Back = () => {
    setStep3(false);
    setStep1(false);
    setStep2(true);
  };

  const onPressStep3Next = (
    wdraw_reason_id,
    question1Id,
    question2Id,
    question1,
    question2,
  ) => {
    setStep4(true);
    setStep3(false);
    setStep2(false);
    setStep1(false);
    // console.log("dataFromStep3ReasonId", wdraw_reason_id);
    // console.log("dataFromStep3Q1Id", question1Id);
    // console.log("dataFromStep3Q2Id", question2Id);
    // console.log("dataFromStep3Q1Ans", question1);
    // console.log("dataFromStep3Q2Ans", question2);

    setwdrawReasonId(wdraw_reason_id);
    setWdrawQuestion1Id(question1Id);
    setWdrawQuestion2Id(question2Id);
    setQ1Remarks(question1);
    setQ2Remarks(question2);
  };

  // console.log("wdrawReasonId<<<", wdrawReasonId);
  // console.log("wdrawQuestion1Id<<<", wdrawQuestion1Id);
  // console.log("wdrawQuestion2Id<<<", wdrawQuestion2Id);
  // console.log("q1Remarks<<<", q1Remarks);
  // console.log("q2Remarks<<<", q2Remarks);

  const onPressStep4Back = () => {
    setStep3(true);
    setStep4(false);
    setStep2(false);
    setStep1(false);
  };

  const onPressStep4Next = (
    branchId,
    classId,
    withrawDateFromPicker,
    sectionId,
    systemId,
    benificiaryId,
    imgBase64Side1,
    imgBase64Side2,
  ) => {
    // console.log("branchId", branchId);
    // console.log("classId", classId);
    // console.log("withrawDateFromPicker", withrawDateFromPicker);
    // console.log("sectionId", sectionId);
    // console.log("systemId", systemId);
    // console.log("benificiaryId", benificiaryId);
    // console.log("imgBase64Side1", imgBase64Side1);
    // console.log("imgBase64Side2", imgBase64Side2);
    var CNICArray = [];
    CNICArray[0] = imgBase64Side1;
    CNICArray[1] = imgBase64Side2;

    console.log('CNICArray', CNICArray);
    dispatch(
      withdrawlRequestAction({
        branch_id: branchId,
        class_id: classId,
        last_day_in_school: withrawDateFromPicker,
        section_id: sectionId,
        system_id: systemId,
        wdraw_reason_id: wdrawReasonId,
        wdraw_question_1: wdrawQuestion1Id,
        wdraw_question_2: wdrawQuestion2Id,
        wdraw_remarks_1: q1Remarks,
        wdraw_remarks_2: q2Remarks,
        beneficiary_relation_id: benificiaryId,
        applicant_relation_id: applicantId,
        CNICArray,
        // myArray: [
        //     { cnic_images: imgBase64Side1 },
        //     { cnic_images: imgBase64Side2 },
        // ]
        // cnic_images[0]: imgBase64Side1,
        // cnic_images[1]: imgBase64Side2,
      }),
    );
  };

  // console.log("getterHere", childDatahere?.posts?.result?.children);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === 'android' ? colors.white : colors.white,
      }}>
      <StatusBar barStyle={'default'} backgroundColor={'#606060'} />

      {childDatahere?.posts?.result?.children.length > 0 && (
        <MainHeader
          onPressRightImg={() => navigation.goBack()}
          topLeftImg={'backarrow'}
          text={'Withdrawal Request'}
          data={childDatahere?.posts?.result?.children}
        />
      )}

      {withdrawalRequestHere?.isLoading && <Loader></Loader>}

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.white,
          marginVertical: hp(2),
        }}>
        <View style={styles.mainView}>

          {/* {
            childDatahere?.posts?.result?.children ?

              <View>
                <Text>kkkk</Text>
              </View>
              :
              <Text>hhhh</Text>
          } */}


          <View style={styles.mainInnerView}>
            <WithdrawlCentral
              backgroundColor={step1 ? colors.appDarkColor : colors.grey}
              text1={1}
              text1Color={step1 ? colors.grey : colors.black}
              text2={'Step 1'}
              text2Color={step1 ? colors.appColor : colors.lightGrey}
            />
          </View>

          <View style={styles.centralStarightLine}></View>

          <View style={styles.mainInnerView}>
            <WithdrawlCentral
              backgroundColor={step2 ? colors.appDarkColor : colors.grey}
              text1={2}
              text1Color={step2 ? colors.grey : colors.black}
              text2={'Step 2'}
              text2Color={step2 ? colors.appColor : colors.lightGrey}
            />
          </View>

          <View style={styles.centralStarightLine}></View>

          <View style={styles.mainInnerView}>
            <WithdrawlCentral
              backgroundColor={step3 ? colors.appDarkColor : colors.grey}
              text1={3}
              text1Color={step3 ? colors.grey : colors.black}
              text2={'Step 3'}
              text2Color={step3 ? colors.appColor : colors.lightGrey}
            />
          </View>

          <View style={styles.centralStarightLine}></View>

          <View style={styles.mainInnerView}>
            <WithdrawlCentral
              backgroundColor={step4 ? colors.appDarkColor : colors.grey}
              text1={4}
              text1Color={step4 ? colors.grey : colors.black}
              text2={'Step 4'}
              text2Color={step4 ? colors.appColor : colors.lightGrey}
            />
          </View>
        </View>

        {step1 && (
          <Step1
            onPressStep1Btn={onPressStep1Btn}
            step1Text={
              'Click on the Parent Profile Section and review your personal information before proceeding with this withdrawal application. If the information is incorrect, please update it and return to the form for withdrawal processing.'
            }
          />
        )}

        {step2 && (
          <Step2
            onPressBack={onPressStep2Back}
            onPressNext={onPressStep2Next}
          />
        )}

        {step3 && (
          <Step3
            onPressBack={onPressStep3Back}
            onPressNext={onPressStep3Next}
          />
        )}

        {step4 && (
          <Step4
            propRelation={propRelation}
            propParentName={propParentName}
            propCNIC={propCNIC}
            propEmail={propEmail}
            propContact={propContact}
            propBenificiaryId={propBenificiaryId}
            propParentsListFromStep2={propParentsListFromStep2}
            onPressBack={onPressStep4Back}
            // onPressNext={() => navigation.navigate("HomeScreen")}
            onPressNext={onPressStep4Next}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    margin: hp('3'),
  },
  mainInnerView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centralStarightLine: {
    flex: 0.25,
    height: hp('0.25'),
    marginTop: hp('3'),
    justifyContent: 'center',
    backgroundColor: colors.grey,
  },
});
export default WithdrawlRequest;
