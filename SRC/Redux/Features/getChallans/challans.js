import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIS, config } from "../../../API/Apis";

var initialState = {
    challan: '',
    isLoading: false,
    error: ''
}
// sms_number: "03164025665"
export const getChallan = createAsyncThunk("getChallan", async (values) => {
    console.log("values123", values);
    return axios
        .post(`${APIS.FeeChallan}`, { system_id: values }, {
            headers: {
                'api_key': 'X5Ne0km7852Q1ykny9FfcIK5y9kVV5v6',
                'api_secret': 'Q1X5NeknkyV5v6Vkm78y9FfcI0K5y952',
            }
        })
        .then((response) => response.data)
})


const challanSlice = createSlice({
    name: 'challan',
    initialState,
    extraReducers: {
        [getChallan.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getChallan.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.posts = action.payload;
            state.error = '';
        },
        [getChallan.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        }
    }
})

export default challanSlice.reducer;