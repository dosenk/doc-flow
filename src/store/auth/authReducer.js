import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { checkAuthAction, signInAction, signOutAction } from './authActions';

const authAdapter = createEntityAdapter();
const initialState = authAdapter.getInitialState({
  // isLoading: false,
  isLogin: false,
  status: 'idle',
  error: null,
  data: {
    login: null,
    id: null,
    status: false,
    role: null
  }
});

// loading: 'idle' | 'pending' | 'succeeded' | 'failed',
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState
  },
  extraReducers(builder) {
    builder
      // sign In
      .addCase(signInAction.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(signInAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLogin = true;
        state.error = '';
        state.data = action.payload;
      })
      .addCase(signInAction.rejected, (state, action) => {
        state.status = 'failed';
        state.isLogin = false;
        state.error = action.error.message;
      })
      // sign Out
      .addCase(signOutAction.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(signOutAction.fulfilled, (state) => {
        state.status = 'succeeded';
        state = initialState;
      })
      .addCase(signOutAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // check
      .addCase(checkAuthAction.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        console.log(action);
        state.status = 'succeeded';
        state.isLogin = true;
        state.error = '';
        state.data = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
