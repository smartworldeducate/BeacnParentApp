import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS, config} from '../../../API/Apis';

const initialState = {
  uploadImage: null,
  isLoading: false,
  error: '',
};
export const imageUpload = createAsyncThunk('imageUpload', async values => {
  console.log('values', values);
  return axios
    .post(`${APIS.StudentImageUploadAPI}`, values, {
      headers: {
        api_key: 'X5Ne0km7852Q1ykny9FfcIK5y9kVV5v6',
        api_secret: 'Q1X5NeknkyV5v6Vkm78y9FfcI0K5y952',
      },
    })
    .then(response => response.data);
});

const imageUploadSlice = createSlice({
  name: 'uploadImage',
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.uploadImage = null;
      // state.message = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(imageUpload.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(imageUpload.rejected, state => {
      return {isLoading: false, error: 'error'};
    });
    builder.addCase(imageUpload.fulfilled, (state, action) => {
      return {
        isLoading: false,
        uploadImage: action.payload,
        error: '',
        // message: action.payload.message,
        // success: action.payload.success,
      };
    });
  },
});

export const {clearState} = imageUploadSlice.actions;

export default imageUploadSlice.reducer;
