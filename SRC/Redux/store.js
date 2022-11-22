import {configureStore} from '@reduxjs/toolkit';
import phoneNumberReducer from './Features/PhoneNumberSignUp/PhoneNumberSignUp';
import OTPCodeReducer from './Features/PhoneNumberSignUp/EnterOTPSignUpKit';
import challanReducer from './Features/getChallans/challans';
import childrenReducer from './Features/getChildData/children';
import postSlice from './Features/PhoneNumberSignUp/PhoneNumberSignUp';

export const store = configureStore({
  reducer: {
    post: postSlice,
    phoneNumber: phoneNumberReducer,
    OTPCodeStore: OTPCodeReducer,
    children: childrenReducer,
    feeChallan: challanReducer,
  },
});
