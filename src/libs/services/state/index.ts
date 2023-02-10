import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { accountReducer, AccountState } from './account';
import { hydrationMetaReducer } from './hydration/hydration.reducer';

export * from './account';

export interface RootState {
  account: AccountState;
}

export const reducers: ActionReducerMap<RootState> = {
  account: accountReducer,
};

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
