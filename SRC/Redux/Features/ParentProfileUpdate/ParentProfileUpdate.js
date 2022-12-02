import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS, config} from '../../../API/Apis';

var initialState = {
  posts: '',
  isLoading: false,
  error: '',
  message: '',
};
// sms_number: "03164025665"
export const parentProfileUpdate = createAsyncThunk(
  'parentProfileUpdate',
  async values => {
    console.log('valuesPost', values);
    return axios
      .post(`${APIS.ParentProfileUpdateAPI}`, values, {
        headers: {
          api_key: 'X5Ne0km7852Q1ykny9FfcIK5y9kVV5v6',
          api_secret: 'Q1X5NeknkyV5v6Vkm78y9FfcI0K5y952',
        },
      })
      .then(response => response.data);
  },
);

const parentProfileUpdateSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers: {
    [parentProfileUpdate.pending]: (state, action) => {
      state.isLoading = true;
    },
    [parentProfileUpdate.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.error = '';
    },
    [parentProfileUpdate.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.message = action.payload.message;
    },
  },
});

export default parentProfileUpdateSlice.reducer;
