import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS, config} from '../../../API/Apis';

const initialState = {
  posts: [],
  isLoading: false,
  error: '',
};
// sms_number: "03164025665"
export const contactAction = createAsyncThunk('contact', async values => {
  console.log('valuesApi', values);
  return await axios
    .post(`${APIS.ContactAPI}`, values, {
      headers: {
        api_key: 'X5Ne0km7852Q1ykny9FfcIK5y9kVV5v6',
        api_secret: 'Q1X5NeknkyV5v6Vkm78y9FfcI0K5y952',
      },
    })
    .then(response => response.data);
});

const ContactSlice = createSlice({
  name: 'contact',
  initialState,
  extraReducers: {
    [contactAction.pending]: (state, action) => {
      state.isLoading = true;
    },
    [contactAction.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.error = '';

      console.log('OTPKitPayload', action.payload);
    },
    [contactAction.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export default ContactSlice.reducer;
