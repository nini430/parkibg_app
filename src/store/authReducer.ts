import apiRoutes from '@/api/apiRoutes';
import axiosApiInstance from '@/lib/axiosInterceptors';
import { AuthInitialState, RegisterInput } from '@/types/auth';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState: AuthInitialState = {
  isRegisterPending: false,
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
      console.log(err);
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
    builder.addCase(registerUser.rejected, (state, action) => {
      console.log(action.payload);
      state.isRegisterPending = false;
    });
  },
});

export default authReducer.reducer;
