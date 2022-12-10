import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

interface CounterState {
  name: string | null,
  email: string | null,
  photo: string | null
}

const initialState: CounterState = {
  name: '',
  email: '',
  photo: ''
};

// Sliceとは、
const userSlice: Slice<CounterState> = createSlice({
  name: 'user',
  initialState,
  // reducer + action
  reducers: {
    setUsersLoginDetails: (state: CounterState, action: PayloadAction<CounterState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
    },

    setSignOutState: (state: CounterState) => {
      state.name = null;
      state.email = null;
      state.photo = null;
    },
  },
});

export const { setUsersLoginDetails, setSignOutState } = userSlice.actions;
export default userSlice.reducer;

// 一時的にany
export const selectUserName = (state: any): void => state.user.name;
export const selectUserEmail = (state: any): void => state.user.email;
export const selectUserPhoto = (state: any): void => state.user.photo;

