import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIS, config } from "../../../API/Apis";

var initialState = {
    posts: '',
    isLoading: false,
    error: ''
}
// sms_number: "03164025665"
export const getAssessment = createAsyncThunk("getAssessment", async (values) => {
    return axios
        .post(`${APIS.Assessment}`, { system_id: values }, {
            headers: {
                'api_key': 'X5Ne0km7852Q1ykny9FfcIK5y9kVV5v6',
                'api_secret': 'Q1X5NeknkyV5v6Vkm78y9FfcI0K5y952',
            }
        })
        .then((response) => response.data)
})


const assessmentSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers: {
        [getAssessment.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getAssessment.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.posts = action.payload;
            state.error = '';
        },
        [getAssessment.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        }
    }
})

export default assessmentSlice.reducer;