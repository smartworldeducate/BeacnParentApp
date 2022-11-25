import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS, config} from '../../../API/Apis';

var initialState = {
  guardian: '',
  isLoading: false,
  error: '',
};
// sms_number: "03164025665"
export const getGuardian = createAsyncThunk('getGuardian', async values => {
  return axios
    .post(
      `${APIS.StudentGuardianAPI}`,
      {system_id: values},
      {
        headers: {
          api_key: 'X5Ne0km7852Q1ykny9FfcIK5y9kVV5v6',
          api_secret: 'Q1X5NeknkyV5v6Vkm78y9FfcI0K5y952',
        },
      },
    )
    .then(response => response.data);
});

const guardianSlice = createSlice({
  name: 'guardian',
  initialState,
  extraReducers: {
    [getGuardian.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getGuardian.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.error = '';
    },
    [getGuardian.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export default guardianSlice.reducer;
