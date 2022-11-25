import {configureStore} from '@reduxjs/toolkit';
// import phoneNumberReducer from './Features/PhoneNumberSignUp/PhoneNumberSignUp';
import challanReducer from './Features/getChallans/challans';
import childrenReducer from './Features/getChildData/children';
import postSlice from './Features/PhoneNumberSignUp/PhoneNumberSignUp';
import CalanderReducer from './Features/CalanderKit/CalanderKit';
import OTPSlice from './Features/PhoneNumberSignUp/EnterOTPSignUpKit';
import assessmentReducer from './Features/Assessments/assessment';
import guardianReducer from './Features/StudentGuardian/StudentGuardian';
import ParentProfileUpdateReducer from './Features/ParentProfileUpdate/ParentProfileUpdate';
export const store = configureStore({
  reducer: {
    post: postSlice,
    OTP: OTPSlice,
    children: childrenReducer,
    feeChallan: challanReducer,
    calander: CalanderReducer,
    assessment: assessmentReducer,
    guardian: guardianReducer,
    UpdateParentsInfo: ParentProfileUpdateReducer,
  },
});
