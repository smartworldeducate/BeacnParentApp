export const BASE_URL = 'https://ws.beaconhouse.net/beaconhouse/index.php/api/';
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
  StudentGuardianAPI: BASE_URL + 'student_guardians',
  ParentProfileUpdateAPI: BASE_URL + 'update_emergancy_contacts',
};
