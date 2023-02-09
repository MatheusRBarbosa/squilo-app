import { Token, User } from '@squilo/domain';

export const ACCOUNT_STORE = 'account';
export interface AccountState {
  token?: Token;
  user?: User;
}
