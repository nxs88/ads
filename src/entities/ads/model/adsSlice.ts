import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdAccount } from './types';

interface AddState {
  accounts: AdAccount[];
}

const initialState: AddState = {
  accounts: [
    { id: '1', name: 'Google Ads 1', platform: 'Google', connected: true },
    { id: '2', name: 'Meta Ads 1', platform: 'Meta', connected: true },
    { id: '3', name: 'Yandex Ads 1', platform: 'Yandex', connected: false },
  ],
};

const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    connectAccount(state, action: PayloadAction<string>) {
      const account = state.accounts.find((acc) => acc.id === action.payload);
      if (account) {
        account.connected = true;
      }
    },
    disconnectAccount(state, action: PayloadAction<string>) {
      const account = state.accounts.find((acc) => acc.id === action.payload);
      if (account) {
        account.connected = false;
      }
    },
    addAccount(state, action: PayloadAction<AdAccount>) {
      state.accounts.push(action.payload);
    },
  },
});

export const { connectAccount, disconnectAccount, addAccount } =
  adsSlice.actions;
export default adsSlice.reducer;
