import { toast } from 'react-hot-toast';

import apiRoutes from '@/api/apiRoutes';
import axiosApiInstance from '@/lib/axiosInterceptors';
import { AuthInitialState, LoginValues, RegisterInput } from '@/types/auth';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '@/types/user';

const initialState: AuthInitialState = {
  isRegisterPending: false,
  isLoginPending: false,
  authedUser: JSON.parse(localStorage.getItem('user') as string) || null,
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    {
      input,
      onSuccess,
    }: { input: RegisterInput; onSuccess: (message: string) => void },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.post<{ message: string }>(
        apiRoutes.auth.register,
        {
          ...input,
        }
      );
      onSuccess && onSuccess(response.data.message);
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    { input, onSuccess }: { input: LoginValues; onSuccess: VoidFunction },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.post<{user:User}>(apiRoutes.auth.login, input);
      onSuccess && onSuccess();
      return response.data.user;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isRegisterPending = true;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isRegisterPending = false;
    });
    builder.addCase(registerUser.rejected, (state, action: any) => {
      state.isRegisterPending = false;
      toast.error(action.payload.response.data.message || 'Unknown Error');
    });
    builder.addCase(loginUser.pending,state=>{
      state.isLoginPending=true;
    });
    builder.addCase(loginUser.fulfilled,(state,action)=>{
      state.isLoginPending=false;
      state.authedUser=action.payload;
    })
  },
});

export default authReducer.reducer;
