import { createSelector } from '@ngrx/store';
import { AccountState } from './account.states';

const selectUser = (state: AccountState) => state.user;
const selectToken = (state: AccountState) => state.token;

export const selectAccount = createSelector({
  user: selectUser,
  token: selectToken,
});
