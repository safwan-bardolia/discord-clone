import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  // reducers changes the state of our app (means it modify the state data)
  reducers: {
    // means any time when we want to call this reducer we dispatch the login action i.e dispatch(login({this is payload property}))
    login: (state, action) => {
      state.user = action.payload;
    },
    // means any time when we want to call this reducer we dispatch the logout action i.e dispatch(logout()) because it does not require action.payload
    logout: (state) => {
      state.user = null;
    }
  },
});

export const { login, logout} = userSlice.actions;

export const selectUser = (state) => state.user.user;   // 1st user is name of slice(line 4), 2nd user is actual property of state(line 6)

export default userSlice.reducer;
