import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    isAuth: false,
    user: null,

}
const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout:(state, action) => {
      state = initialState;

      return state;
  },
    setUser: (state, action) => {
      state.isAuth = true;
      console.log('user', action.payload)
      state.user = action.payload;
    },

  },
});

export const {setUser,logout} = authSlice.actions;

export default authSlice.reducer;
