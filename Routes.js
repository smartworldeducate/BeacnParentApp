import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DrawerContent from './SRC/Screens/Drawer/DrawerContent';

import Splash from './SRC/Screens/Splash';
import MobileNumperEnter from './SRC/Screens/MobileNumperEnter';
import OTPEnter from './SRC/Screens/OTPEnter';
import HomeScreen from './SRC/Screens/HomeScreen';

import Attendance from './SRC/Screens/Attendance';
import Assessment from './SRC/Screens/Assessment';
import Challans from './SRC/Screens/Challans';

import ViewAllNotifications from './SRC/Screens/ViewAllNotifications';
import AllPolicies from './SRC/Screens/Policies/AllPolicies';
import ContactUs from './SRC/Screens/ContactUs';

import WithdrawlRequest from './SRC/Screens/WithdrawlRequest/WithdrawlRequest';
import ParentProfile from './SRC/Screens/ParentProfile';
import Testing from './SRC/Screens/Testing';
import BottomTab from './SRC/Components/CustomTab/BottomTab';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function DrawerStack() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerStyle: {width: wp('75')},
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="HomeDrawer" component={TabNavigator} />
      <Drawer.Screen name="AttendanceDrawer" component={Attendance} />
      <Drawer.Screen name="AssessmentDrawer" component={Assessment} />
      <Drawer.Screen name="ChallansDrawer" component={Challans} />
      <Drawer.Screen name="ParentProfileDrawer" component={ParentProfile} />
      <Drawer.Screen
        name="WithdrawlRequestDrawer"
        component={WithdrawlRequest}
      />
      <Drawer.Screen
        name="ViewAllNotificationsDrawer"
        component={ViewAllNotifications}
      />
      <Drawer.Screen name="ContactUsDrawer" component={ContactUs} />
      <Drawer.Screen name="AllPoliciesDrawer" component={AllPolicies} />

      <Drawer.Screen name="Testing" component={Testing} />
    </Drawer.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      // headerMode={"none"}
      initialRouteName={'HomeScreenTab'}
      tabBar={props => <BottomTab {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="ViewAllNotificationsTab" component={HomeScreen} />
      <Tab.Screen name="HomeScreenTab" component={HomeScreen} />
      <Tab.Screen name="ContactUsTab" component={ContactUs} />
    </Tab.Navigator>
  );
}

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName={"HomeScreen"}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="MobileNumperEnter" component={MobileNumperEnter} />
        <Stack.Screen name="OTPEnter" component={OTPEnter} />

        <Stack.Screen name="HomeScreen" component={DrawerStack} />

        {/* <Stack.Screen initialParams={{ signIn: "signIn" }} name="HomeTab" component={TabNavigator} /> */}

        {/* <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}></Drawer.Navigator> */}

        {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
        <Stack.Screen name="Attendance" component={Attendance} />
        <Stack.Screen name="Assessment" component={Assessment} />
        <Stack.Screen name="Challans" component={Challans} />
        <Stack.Screen
          name="ViewAllNotifications"
          component={ViewAllNotifications}
        />

        <Stack.Screen name="Testing" component={Testing} />

        {/* <Stack.Screen name="AllPolicies" component={AllPolicies} />
                <Stack.Screen name="ContactUs" component={ContactUs} />
                <Stack.Screen name="WithdrawlRequest" component={WithdrawlRequest} />
                <Stack.Screen name="ParentProfile" component={ParentProfile} />
                <Stack.Screen name="Testing" component={Testing} /> */}

        {/* </Drawer.Navigator> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
