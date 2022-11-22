import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIS, config } from "../../../API/Apis";

const initialState = {
  posts: null,
  isLoading: false,
  error: '',
  message: '',
  success: 0,
}
// sms_number: "03164025665"
export const OTPCodeAction = createAsyncThunk("enterOTP", async (values) => {
  // console.log("valuesApi", values);
  return axios
    .post(`${APIS.OTPCodeSignUpAPI}`, values, {
      headers: {
        'api_key': 'X5Ne0km7852Q1ykny9FfcIK5y9kVV5v6',
        'api_secret': 'Q1X5NeknkyV5v6Vkm78y9FfcI0K5y952',
      }
    })
    .then((response) => response.data)
})
const OTPSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.posts = null;
      state.message = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(OTPCodeAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(OTPCodeAction.rejected, state => {
      return { isLoading: false, error: 'error' };
    });
    builder.addCase(OTPCodeAction.fulfilled, (state, action) => {
      return {
        isLoading: false,
        posts: action.payload.result,
        error: '',
        message: action.payload.message,
        success: action.payload.success,
      };
    });

  },
});

export const { clearState } = OTPSlice.actions;

export default OTPSlice.reducer;