import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIS, config } from "../../../API/Apis";

const initialState = {
    posts: [],
    isLoading: false,
    error: ''
}
// sms_number: "03164025665"
export const calanderAction = createAsyncThunk("calander", async (values) => {
    console.log("valuesApi", values);
    return await axios
        .post(`${APIS.CalanderAPI}`, { system_id: values }, {
            headers: {
                'api_key': 'X5Ne0km7852Q1ykny9FfcIK5y9kVV5v6',
                'api_secret': 'Q1X5NeknkyV5v6Vkm78y9FfcI0K5y952',
            }
        })
        .then((response) => response.data)
})


const CalanderSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers: {
        [calanderAction.pending]: (state, action) => {
            state.isLoading = true;
        },
        [calanderAction.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.posts = action.payload;
            state.error = '';

            console.log("OTPKitPayload", action.payload);
        },
        [calanderAction.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        }
    }
})

export default CalanderSlice.reducer;