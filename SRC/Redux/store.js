// import { configureStore } from '@reduxjs/toolkit'

// import postReducer from './Features/AllPost'

// export const store = configureStore({ reducer: postReducer })




import { configureStore } from '@reduxjs/toolkit';
import postReducer from './Features/AllPost';
import phoneNumberReducer from "./Features/PhoneNumberSignUp/PhoneNumberSignUp";
import OTPCodeReducer from "./Features/PhoneNumberSignUp/EnterOTPSignUpKit";
import challanReducer from './Features/getChallans/challans';
import childrenReducer from './Features/getChildData/children';
import assessmentReducer from './Features/Assessments/assessment';

export const store = configureStore({
    reducer: {
        post: postReducer,
        phoneNumber: phoneNumberReducer,
        OTPCodeStore: OTPCodeReducer,
        children: childrenReducer,
        feeChallan: challanReducer,
        assessment: assessmentReducer
    }
})