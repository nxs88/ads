import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '@shared/api/apiClient';

export interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  accessToken: string;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ user: User; accessToken: string }>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      apiClient.defaults.headers.common.Authorization = `Bearer ${action.payload.accessToken}`;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      delete apiClient.defaults.headers.common.Authorization;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
