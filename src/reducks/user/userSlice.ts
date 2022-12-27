import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  email: string;
  photo: string;
}

interface RootState {
  user: UserState;
}

const initialState: UserState = {
  name: '',
  email: '',
  photo: ''
};

// Sliceとは、reducerとactionを組み合わせたもの
const userSlice: Slice<UserState> = createSlice({
  name: 'user',
  initialState,
  // reducer作成と同時に同名でActionCreaterも生成される
  reducers: {
    setUsersLoginDetails: (state: UserState, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
    },

    setSignOutState: (state: UserState) => {
      state.name = "";
      state.email = "";
      state.photo = "";
    },
  },
});

export const { setUsersLoginDetails, setSignOutState } = userSlice.actions;
export default userSlice.reducer;
export const selectUserName = (state: RootState): string => state.user.name;
export const selectUserEmail = (state: RootState): string => state.user.email;
export const selectUserPhoto = (state: RootState): string => state.user.photo;

