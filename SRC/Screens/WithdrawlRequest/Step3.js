import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Button from '../../Components/Button/Button';
import colors from '../../Styles/colors';
import fontFamily from '../../Styles/fontFamily';
import WithDrawlReasonsModal from '../../Components/Modal/WithDrawlReasonsModal';
import TextInputCustom from '../../Components/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';

import { withdrawlReasonAction } from '../../Redux/Features/WithdrawlRequestKit/WithdrawalReasonKit';
import FlatListItem from '../../Components/FlatList/FlatList';

const Step3 = ({ onPressBack, onPressNext }) => {
  const dispatch = useDispatch();
  const childDatahere = useSelector(state => state.children);
  const withdrawalReasonHere = useSelector(state => state.withDrawlReasonStore);

  const navigation = useNavigation();
  const [disableBtn, setDisableBtn] = useState(true);
  const [selectReason, setSelectReason] = useState('');
  const [withdrawReasonModal, setWithdrawReasonModal] = useState(false);

  const [inputFeedback, setInputFeedback] = useState('');
  const [placeholderValue, setPlaceholderValue] = useState('');

  const [wdraw_reason_id, setWdraw_reason_id] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [question1, setQuestion1] = useState(null);
  const [question2, setQuestion2] = useState(null);
  const [question1Id, setQuestion1Id] = useState(null);
  const [question2Id, setQuestion2Id] = useState(null);

  const [sendingFromStep3Obj, setSendingFromStep3Obj] = useState({
    wdrawReasonId: wdraw_reason_id,
    wdrawQuestion1: question1Id,
    wdrawQuestion2: question2Id,
    wdrawRemarks1: question1,
    wdrawRemarks2: question2,
  });

  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
  };

  useEffect(() => {
    dispatch(
      withdrawlReasonAction(
        childDatahere?.posts?.result?.children[0]?.system_id,
      ),
    );
  }, [placeholderValue, question1Id, question2Id, disableBtn]);

  const onPressWithdrawlReasonModal = () => {
    setWithdrawReasonModal(!withdrawReasonModal);
  };

  const onChangeQuestion1 = val => {
    setQuestion1(val);
  };

  const onChangeQuestion2 = val => {
    setQuestion2(val);
  };

  console.log('question1', question1);
  console.log('question2', question2);

  const renderItemWithdrawlReasons = ({ item, index }) => {
    // console.log("item333", item);
    return (
      <TouchableOpacity
        onPress={() => onPressSelectedWithdrawlReasonModal({ item })}
        style={styles.renderMainView}>
        <View style={{ flex: 0.85, justifyContent: 'center' }}>
          <Text
            style={{
              fontSize: hp('1.7'),
              textAlign: 'left',
              fontFamily: fontFamily.helveticaRegular,
              color: colors.lightBlack,
              lineHeight: hp('2.5'),
            }}>
            {item.reason_name}
          </Text>
        </View>

        <View
          style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={{ uri: 'forwardarrow' }}
            style={styles.listRightImg}
            resizeMode={'contain'}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const onPressSelectedWithdrawlReasonModal = ({ item, index }) => {
    // console.log("questions", item?.questions);
    // console.log("itemReason", item?.questions?.map((e) => {
    //     console.log("e", e.question_id);
    // }));
    // console.log("itemReasonId", item.reason_id);
    // setDisableBtn(false);
    setWdraw_reason_id(item.reason_id);
    setSelectReason(item.reason_name);
    setWithdrawReasonModal(!withdrawReasonModal);
    setQuestions(item?.questions);

    setQuestion1Id(item?.questions[0]?.question_id);
    setQuestion2Id(item?.questions[1]?.question_id);
  };

  // console.log("questions", questions);
  // console.log("disableBtn", disableBtn);

  const questionsRenderInput = ({ item, index }) => {
    // console.log("itemQuestionsId's", item);
    // console.log("questionsIndex", index);

    return (
      <View
        style={{
          height: hp('20'),
          marginHorizontal: wp('6'),
          borderColor: colors.grey,
          borderWidth: wp('0.15'),
          borderRadius: wp('3'),
          marginTop: hp('3'),
        }}>
        <Text
          style={{
            padding: hp('2'),
            color: colors.appColor,
            fontFamily: fontFamily.helveticaRegular,
            fontSize: hp('1.7'),
          }}>
          {item.question_name}
        </Text>

        {/* {
                    questions?.length === 0 ?


                        <TextInputCustom
                            value={question1}
                            onChangeText={onChangeQuestion1}
                            keyboardType={"default"}
                            textColor={colors.appColor}
                            multiline={true}
                            returnKeyType={"go"}
                            style={styles.textInputCustomStyle}
                        />
                        :

                        questions?.length > 0 && */}
        <>
          <TextInputCustom
            value={question1}
            onChangeText={onChangeQuestion1}
            keyboardType={'default'}
            textColor={colors.appColor}
            multiline={true}
            returnKeyType={'go'}
            style={styles.textInputCustomStyle}
          />

          <TextInputCustom
            value={question2}
            onChangeText={onChangeQuestion2}
            keyboardType={'default'}
            textColor={colors.appColor}
            multiline={true}
            returnKeyType={'go'}
            style={styles.textInputCustomStyle}
          />
        </>
        {/* } */}
      </View>
    );
  };

  // console.log("question1Id", question1Id);
  // console.log("question2Id", question2Id);

  return (
    <View style={{}}>
      <TouchableOpacity
        onPress={onPressWithdrawlReasonModal}
        style={styles.mainTouchableOpacity}>
        <View style={{ flex: 0.85, justifyContent: 'center' }}>
          <Text
            style={{
              marginLeft: hp('2'),
              fontSize: hp('1.7'),
              fontFamily: fontFamily.regular,
              color: colors.appColor,
            }}>
            {selectReason?.length > 0
              ? selectReason
              : 'Please select reason for withdrawal'}
          </Text>
        </View>

        <WithDrawlReasonsModal
          modalUpperFlex={0.3}
          modalLowerFlex={0.7}
          modalVisible={withdrawReasonModal}
          onPressModal={onPressWithdrawlReasonModal}
          flatlistData={withdrawalReasonHere?.reasons?.result}
          flatlistRenderItem={renderItemWithdrawlReasons}
          keyExtractor={(item, index) => index.toString()}
        />

        <View
          style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={{ uri: 'forwardarrow' }}
            style={{ height: hp('2'), width: wp('4') }}
            resizeMode={'contain'}
          />
        </View>
      </TouchableOpacity>

      {questions?.length > 0 ? (
        <FlatListItem
          data={questions}
          renderItem={questionsRenderInput}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        ''
      )}

      <View
        style={{
          flexDirection: 'row',
          marginVertical: hp('3'),
          marginHorizontal: wp('5'),
        }}>
        <View style={{ flex: 0.47 }}>
          <Button
            onPress={onPressBack}
            height={hp('4.5')}
            borderRadius={wp('1.5')}
            text="Back"
            bgColor={colors.appColor}
            textColor={colors.white}
            textSize={hp('1.75')}
          />
        </View>
        <View style={{ flex: 0.04 }}></View>
        <View style={{ flex: 0.47 }}>
          <Button
            onPress={() =>
              onPressNext(
                wdraw_reason_id,
                question1Id,
                question2Id,
                question1,
                question2,
              )
            }
            height={hp('4.5')}
            borderRadius={wp('1.5')}
            text="Next"
            textColor={colors.white}
            textSize={hp('1.75')}
            disabled={question1?.length || question2?.length > 0 ? false : true}
            bgColor={question1?.length > 0 || question2?.length ? colors.appColor : colors.grey}
          // bgColor={colors.appColor}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainTouchableOpacity: {
    flexDirection: 'row',
    height: hp('6'),
    marginHorizontal: wp('6'),
    borderColor: colors.grey,
    borderWidth: wp('0.15'),
    borderRadius: wp('3'),
    marginTop: hp('0'),
  },

  renderMainView: {
    flexDirection: 'row',
    marginHorizontal: wp('4'),
    marginTop: hp('1'),
    justifyContent: 'center',
    marginBottom: hp('1'),

    borderRadius: wp('2'),
    backgroundColor: 'white',
    padding: hp('2'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  listRightImg: {
    height: hp('2'),
    width: wp('4'),
  },

  textInputCustomStyle: {
    paddingLeft: wp('4'),
    paddingVertical: hp('1'),
    fontSize: hp('1.7'),
    fontFamily: fontFamily.helveticaLight,
    color: colors.appColor,
  },
});
export default Step3;
