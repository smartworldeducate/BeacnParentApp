export const BASE_URL =
  'https://wstest.beaconhouse.net/beaconhouse/index.php/api/';
export const api_key = 'X5Ne0km7852Q1ykny9FfcIK5y9kVV5v6';
export const api_secret = 'Q1X5NeknkyV5v6Vkm78y9FfcI0K5y952';

export const config = {
  headers: {
    api_key: 'X5Ne0km7852Q1ykny9FfcIK5y9kVV5v6',
    api_secret: 'Q1X5NeknkyV5v6Vkm78y9FfcI0K5y952',
    'Content-Type': 'application/json',
  },
};

export const APIS = {
  PhoneNumberSignUp: BASE_URL + 'signup',
  OTPCodeSignUpAPI: BASE_URL + 'verify',
  getChildData: BASE_URL + 'children',
  FeeChallan: BASE_URL + 'feechallan',
  Assessment: BASE_URL + 'gradebook',
  CalanderAPI: BASE_URL + 'attendance',
  NotificationsAPI: BASE_URL + 'user_notifications',
  StudentGuardianAPI: BASE_URL + 'student_guardians',
  ParentProfileUpdateAPI: BASE_URL + 'update_emergancy_contacts',
  StudentImageUploadAPI: BASE_URL + 'upload_student_picture',
  WithdrawlReasonAPI: BASE_URL + 'get_ism_withdrawal_reasons_list',
  WithdrawlRequestAPI: BASE_URL + 'save_ism_withdrawal_request',
  ContactAPI: BASE_URL + 'contact_info',
};
