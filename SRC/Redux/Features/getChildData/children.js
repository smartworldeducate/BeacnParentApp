import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIS, config } from "../../../API/Apis";

var initialState = {
    posts: '',
    isLoading: false,
    error: ''
}
export const getChild = createAsyncThunk("getChild", async (values) => {
    return axios
        .post(`${APIS.getChildData}`, { sms_number: values }, {
            headers: {
                'api_key': 'X5Ne0km7852Q1ykny9FfcIK5y9kVV5v6',
                'api_secret': 'Q1X5NeknkyV5v6Vkm78y9FfcI0K5y952',
            }
        })
        .then((response) => response.data)
})


const childSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers: {
        [getChild.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getChild.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.posts = action.payload;
            state.error = '';
        },
        [getChild.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        }
    }
})

export default childSlice.reducer;