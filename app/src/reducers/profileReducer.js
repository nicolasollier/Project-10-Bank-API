import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileData: null,
    accounts: [
      {
        "id": "x8349",
        "type": "Checking",
        "balance": 2082.79
      },
      {
        "id": "x6712",
        "type": "Savings",
        "balance": 10928.42
      },
      {
        "id": "x9382",
        "type": "Credit Card",
        "balance": 184.30
      }
    ]
  },
  reducers: {
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
  },
});

export const { setProfileData } = profileSlice.actions;
export default profileSlice.reducer;
