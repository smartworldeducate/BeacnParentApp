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
import NotificationsReducer from './Features/NotificationsKit/NotificationsKit';
import withDrawlReasonReducer from './Features/WithdrawlRequestKit/WithdrawalReasonKit';
import withDrawlRequestReducer from './Features/WithdrawlRequestKit/WithdrawlRequest';
import imageUploadReducer from './Features/ImageUploadKit/ImageUploadKit';
import contactReducer from './Features/ContactKit/ContactKit';
import contactComplaintReducer from './Features/ContactKit/ContactComplaintKit';

export const store = configureStore({
  reducer: {
    post: postSlice,
    OTP: OTPSlice,
    children: childrenReducer,
    feeChallan: challanReducer,
    calander: CalanderReducer,
    assessment: assessmentReducer,
    guardian: guardianReducer,
    notifications: NotificationsReducer,
    UpdateParentsStore: ParentProfileUpdateReducer,
    imageUpload: imageUploadReducer,
    withDrawlReasonStore: withDrawlReasonReducer,
    withDrawlRequestStore: withDrawlRequestReducer,
    contactStore: contactReducer,
    contactComplaintStore: contactComplaintReducer,
  },
});
