import { createReducer, on } from '@ngrx/store';
import { setToken, setUser, resetStore } from './account.actions';
import { AccountState } from './account.states';

const initialAccountState: AccountState = {
  token: '',
  user: undefined,
};

export const accountReducer = createReducer(
  initialAccountState,
  on(setToken, (state, action) => ({ ...state, token: action.token })),
  on(setUser, (state, action) => ({ ...state, user: action.user })),
  on(resetStore, () => initialAccountState)
);
