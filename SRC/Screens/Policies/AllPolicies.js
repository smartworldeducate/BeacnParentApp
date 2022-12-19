import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import LeftImgTextHeader from '../../Components/Header/LeftImgTextHeader';
import colors from '../../Styles/colors';
import FlatListItem from '../../Components/FlatList/FlatList';
import LineSeprator from '../../Components/LineSeprator/LineSeprator';
import PolicyModal from '../../Components/Modal/PolicyModal';
import fontFamily from '../../Styles/fontFamily';

const AllPolicies = () => {
  const navigation = useNavigation();

  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
  };
  const [policyHeader, setPolicyHeader] = useState();
  const [details, setDetails] = useState();
  const [url, setUrl] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const onPressModal = () => {
    setModalVisible(!modalVisible);
  };

  const [allPolicies, setAllPolicies] = useState([
    {
      id: 1,
      policyName: 'Discipline Policy',
      description: 'Comming Soon',
      url: 'https://www.beaconhouse.net/',
    },
    {
      id: 2,
      policyName: 'Assessment Policy',
      description: 'Comming Soon',
      url: 'https://www.beaconhouse.net/',
    },
    {
      id: 3,
      policyName: 'Student Protection Policy',
      description: 'Comming Soon',
      url: 'https://www.beaconhouse.net/',
    },
    {
      id: 4,
      policyName: 'Attendence Policy',
      description: 'Comming Soon',
      url: 'https://www.beaconhouse.net/',
    },
    {
      id: 5,
      policyName: 'Digital Responsibility',
      description: 'Comming Soon',
      url: 'https://www.beaconhouse.net/',
    },
  ]);

  const renderItem = ({ item, index }) => {
    return (
      <>
        <View style={styles.renderItemView}>
          <View style={styles.renderLeftView}>
            <Text style={styles.leftText}>{item.policyName}</Text>
          </View>
          <TouchableOpacity
            onPress={() => onPressPolicy({ item })}
            style={styles.rightTouchable}>
            <Image
              source={{ uri: 'forwardarrow' }}
              style={styles.listRightImg}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>

        <LineSeprator style={styles.listSeprator} />
      </>
    );
  };

  const onPressPolicy = ({ item }) => {
    setPolicyHeader(item.policyName);
    setDetails(item.description);
    setUrl(item.url);
    onPressModal();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#606060' }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.white }}>
        <StatusBar barStyle={'default'} backgroundColor={'#606060'} />

        <LeftImgTextHeader
          onPressLeftImg={() => navigation.goBack()}
          leftImg={'backarrow'}
          text={'Policies'}
        />

        <View style={styles.mainView}>
          <FlatListItem
            data={allPolicies}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />

          <PolicyModal
            modalVisible={modalVisible}
            onPressModal={onPressModal}
            textHeader={policyHeader}
            text={details}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: wp('6'),
    marginVertical: hp('1.5'),
  },

  renderItemView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  renderLeftView: {
    flex: 0.85,
    justifyContent: 'center',
  },
  leftText: {
    paddingVertical: hp('1'),
    fontSize: hp('1.8'),
    color: colors.lightBlack,
    fontFamily: fontFamily.helveticaLight
  },
  rightTouchable: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listRightImg: {
    height: hp('2'),
    width: wp('4'),
  },
  listSeprator: {
    height: hp('0.08'),
    backgroundColor: colors.grey,
    marginVertical: hp('0.75'),
  },
});
export default AllPolicies;
