import {configureStore} from '@reduxjs/toolkit';
import phoneNumberReducer from './Features/PhoneNumberSignUp/PhoneNumberSignUp';
import challanReducer from './Features/getChallans/challans';
import childrenReducer from './Features/getChildData/children';
import postSlice from './Features/PhoneNumberSignUp/PhoneNumberSignUp';
import CalanderReducer from './Features/CalanderKit/CalanderKit'
import OTPSlice from './Features/PhoneNumberSignUp/EnterOTPSignUpKit'
import assessmentReducer from './Features/Assessments/assessment';

export const store = configureStore({
  reducer: {
    post: postSlice,
    phoneNumber: phoneNumberReducer,
    OTP: OTPSlice,
    children: childrenReducer,
    feeChallan: challanReducer,
    calander:CalanderReducer,
    assessment:assessmentReducer
  },
});
