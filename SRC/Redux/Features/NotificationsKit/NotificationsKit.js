import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS, config} from '../../../API/Apis';

const initialState = {
  notifications: null,
  isLoading: false,
  error: '',
};
export const getNotifications = createAsyncThunk(
  'getNotifications',
  async values => {
    return axios
      .post(
        `${APIS.NotificationsAPI}`,
        {system_id: values},
        {
          headers: {
            api_key: 'X5Ne0km7852Q1ykny9FfcIK5y9kVV5v6',
            api_secret: 'Q1X5NeknkyV5v6Vkm78y9FfcI0K5y952',
          },
        },
      )
      .then(response => response.data);
  },
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.notifications = null;
      // state.message = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(getNotifications.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getNotifications.rejected, state => {
      return {isLoading: false, error: 'error'};
    });
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      return {
        isLoading: false,
        notifications: action.payload.result,
        error: '',
        // message: action.payload.message,
        // success: action.payload.success,
      };
    });
  },
});

export const {clearState} = notificationsSlice.actions;

export default notificationsSlice.reducer;
