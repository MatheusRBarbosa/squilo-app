import { createAction, props } from '@ngrx/store';
import { User } from '@squilo/domain';

export const setToken = createAction(
  '[Account Store] setToken',
  props<{ token: string }>()
);

export const setUser = createAction(
  '[Account Store] setUser',
  props<{ user: User }>()
);

export const resetStore = createAction('[Account Store] resetStore');
