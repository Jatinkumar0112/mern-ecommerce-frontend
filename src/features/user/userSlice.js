import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  fetchLoggedInUserOrders,updateUser ,fetchLoggedInUser} from './userAPI';



const initialState = {
  userOrder:[],
  status: 'idle',
  userInfo: null,
};



export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrder',
  async () => {
    // console.log({userId})
    const response = await fetchLoggedInUserOrders();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async () => {
    // console.log({id})
    const response = await fetchLoggedInUser();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
 
  reducers: {
    increment: (state) => {
    
      state.value += 1;
    },
    
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrder = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // this info can be different or more from logged-in User info
        state.userInfo = action.payload;
      });
  },
});

export const { increment} = userSlice.actions;

export const selectOrders = (state) => state.user.userOrder;
export const selectUserInfo = (state)=>state.user.userInfo;
export const selectUserInfoStatus = (state)=>state.user.status;



export default userSlice.reducer;
