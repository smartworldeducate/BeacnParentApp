import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS, config} from '../../../API/Apis';

const initialState = {
  reasons: null,
  isLoading: false,
  error: '',
};

export const contactComplaintAction = createAsyncThunk(
  'contactComplaint',
  async values => {
    console.log('values', values);
    return axios
      .post(`${APIS.ContactComplaintAPI}`, values, {
        headers: {
          api_key: 'X5Ne0km7852Q1ykny9FfcIK5y9kVV5v6',
          api_secret: 'Q1X5NeknkyV5v6Vkm78y9FfcI0K5y952',
        },
      })
      .then(response => response.data);
  },
);

const contactComplaintSlice = createSlice({
  name: 'contactComplaint',
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.reasons = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(contactComplaintAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(contactComplaintAction.rejected, (state, action) => {
      return {isLoading: false, error: 'error'};
    });
    builder.addCase(contactComplaintAction.fulfilled, (state, action) => {
      console.log('contactComplaintPayload', action.payload);
      return {
        isLoading: false,
        reasons: action.payload,
        error: '',
      };
    });
  },
});

export const {clearState} = contactComplaintSlice.actions;

export default contactComplaintSlice.reducer;
