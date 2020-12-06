import {createSlice} from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        channelId: null,
        channelName: null,
    },
    reducers: {
        // means any time when we want to call this reducer we dispatch setChannelInfo() action
        setChannelInfo : (state, action) => {
            state.channelId = action.payload.channelId;
            state.channelName = action.payload.channelName;
        },
        // it is useful when we logged out, 
        clearChannelInfo : (state) => {
            state.channelId = null;
            state.channelName = null;
        }
    },
});

export const {setChannelInfo, clearChannelInfo} = appSlice.actions;

export const selectChannelId = (state) => state.app.channelId;
export const selectChannelName = (state) => state.app.channelName;

export default appSlice.reducer;